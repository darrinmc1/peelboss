import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  TOPIC_BADGES,
  SPECIAL_BADGES,
  TIER_CONFIG,
  type Badge,
  type BadgeTier,
  type SpecialBadge,
  getBadgesForTopic,
} from "@/data/badges"

// ---- Types ----

export type UnlockedBadge = {
  badgeId: string
  unlockedAt: string // ISO date
  seen: boolean // whether the user dismissed the notification
}

export type TopicXP = {
  topicId: string
  xp: number
  lessonsCompleted: number
}

// ---- Activity tracking ----

export type ActivityCompletion = {
  activityId: string
  /** "roleplay" | "exercise" | "reflection" — stringly-typed to avoid circular type imports */
  activityType: string
  topicId: string
  score: number
  maxScore: number
  /** role-play specific, undefined for other types */
  endingType?: "success" | "partial" | "failure"
  xpEarned: number
  completedAt: string
  /** completion count — allows retrying without losing best score */
  attempts: number
}

export type TemplateDownloadRecord = {
  templateId: string
  downloadedAt: string
}

export type ReflectionRecord = {
  activityId: string
  text: string
  wordCount: number
  savedAt: string
}

/** How many free-tier downloads the user gets per calendar month. */
export const FREE_DOWNLOAD_LIMIT = 2

export type BadgeStoreState = {
  // Earned badges (both topic and special)
  unlockedBadges: Record<string, UnlockedBadge>
  // XP per topic
  topicXP: Record<string, TopicXP>
  // Total XP across everything
  totalXP: number
  // Pending notifications (badge IDs the user hasn't seen yet)
  pendingNotifications: string[]
  // Stats for special badge checking
  quizScores: { moduleId: string; score: number; date: string }[]
  panicButtonPresses: number
  sessionStartTime: string | null

  // ---- Activity tracking ----
  /** Keyed by activityId. Stores the BEST attempt. Attempts counter grows on retries. */
  completedActivities: Record<string, ActivityCompletion>
  templateDownloads: TemplateDownloadRecord[]
  /** ISO date (YYYY-MM) for the current download quota window. */
  downloadResetMonth: string
  /** Keyed by activityId — one saved reflection per activity. */
  reflections: Record<string, ReflectionRecord>
  /** Mock premium flag. Replace with session.user.tier when auth is extended. */
  isPremium: boolean

  // ---- Actions ----
  addTopicXP: (topicId: string, xp: number) => void
  completeLesson: (topicId: string) => void
  checkAndUnlockBadges: (topicId: string) => string[] // returns newly unlocked badge IDs
  checkSpecialBadges: (context: SpecialBadgeContext) => string[]
  markBadgeSeen: (badgeId: string) => void
  markAllSeen: () => void
  dismissNotification: (badgeId: string) => void
  recordQuizScore: (moduleId: string, score: number) => void
  recordPanicPress: () => void
  startSession: () => void

  // ---- Activity actions ----
  /**
   * Record an activity completion. Awards XP, stores best attempt, runs badge
   * checks for the topic. Returns newly-unlocked badge IDs.
   */
  completeActivity: (input: {
    activityId: string
    activityType: "roleplay" | "exercise" | "reflection"
    topicId: string
    score: number
    maxScore: number
    endingType?: "success" | "partial" | "failure"
    xpEarned: number
  }) => string[]
  saveReflection: (activityId: string, text: string) => void
  setPremium: (isPremium: boolean) => void
  /**
   * Check whether the user can download a template now.
   * Free users get FREE_DOWNLOAD_LIMIT non-premium downloads per month and
   * cannot download premium templates at all.
   */
  canDownloadTemplate: (isPremiumTemplate: boolean) => {
    allowed: boolean
    reason?: "premium_required" | "monthly_limit"
    remainingThisMonth: number
  }
  recordTemplateDownload: (templateId: string) => void

  // ---- Getters ----
  isBadgeUnlocked: (badgeId: string) => boolean
  getTopicTier: (topicId: string) => BadgeTier | null
  getTopicProgress: (topicId: string) => { currentTier: BadgeTier | null; nextTier: BadgeTier | null; xp: number; xpNeeded: number; lessons: number; lessonsNeeded: number; percent: number }
  getUnlockedCount: () => number
  getTotalBadgeCount: () => number
}

export type SpecialBadgeContext = {
  modulesCompleted?: number
  totalModules?: number
  categoriesCompleted?: number
  streak?: number
  isFirstLesson?: boolean
  isFirstModule?: boolean
  isEarlyMorning?: boolean
  isLateNight?: boolean
  completedModuleId?: string
  bookmarkCount?: number
  modulesInProgress?: number
  moduleHops?: number
  sessionDurationMinutes?: number
  returnAfterDays?: number
}

// ---- Helpers ----

/** "2026-04" — used to bucket monthly download quotas. */
function currentMonthKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

// ---- Store ----

export const useBadgeStore = create<BadgeStoreState>()(
  persist(
    (set, get) => ({
      unlockedBadges: {},
      topicXP: {},
      totalXP: 0,
      pendingNotifications: [],
      quizScores: [],
      panicButtonPresses: 0,
      sessionStartTime: null,

      // Activity tracking
      completedActivities: {},
      templateDownloads: [],
      downloadResetMonth: currentMonthKey(),
      reflections: {},
      isPremium: false,

      addTopicXP: (topicId, xp) =>
        set((state) => {
          const current = state.topicXP[topicId] || { topicId, xp: 0, lessonsCompleted: 0 }
          return {
            topicXP: {
              ...state.topicXP,
              [topicId]: { ...current, xp: current.xp + xp },
            },
            totalXP: state.totalXP + xp,
          }
        }),

      completeLesson: (topicId) =>
        set((state) => {
          const current = state.topicXP[topicId] || { topicId, xp: 0, lessonsCompleted: 0 }
          const xpGain = 50 // base XP per lesson
          return {
            topicXP: {
              ...state.topicXP,
              [topicId]: {
                ...current,
                xp: current.xp + xpGain,
                lessonsCompleted: current.lessonsCompleted + 1,
              },
            },
            totalXP: state.totalXP + xpGain,
          }
        }),

      checkAndUnlockBadges: (topicId) => {
        const state = get()
        const topicData = state.topicXP[topicId]
        if (!topicData) return []

        const topicBadges = getBadgesForTopic(topicId)
        const newlyUnlocked: string[] = []

        for (const badge of topicBadges) {
          if (state.unlockedBadges[badge.id]) continue
          if (topicData.xp >= badge.xpRequired && topicData.lessonsCompleted >= badge.lessonsRequired) {
            newlyUnlocked.push(badge.id)
          }
        }

        if (newlyUnlocked.length > 0) {
          set((state) => {
            const updated = { ...state.unlockedBadges }
            for (const id of newlyUnlocked) {
              updated[id] = { badgeId: id, unlockedAt: new Date().toISOString(), seen: false }
            }
            return {
              unlockedBadges: updated,
              pendingNotifications: [...state.pendingNotifications, ...newlyUnlocked],
            }
          })
        }

        return newlyUnlocked
      },

      checkSpecialBadges: (context) => {
        const state = get()
        const newlyUnlocked: string[] = []

        const check = (badge: SpecialBadge): boolean => {
          if (state.unlockedBadges[badge.id]) return false

          switch (badge.condition) {
            case "first_lesson":
              return context.isFirstLesson === true
            case "first_module":
              return context.isFirstModule === true
            case "modules_completed_10":
              return (context.modulesCompleted ?? 0) >= 10
            case "categories_3":
              return (context.categoriesCompleted ?? 0) >= 3
            case "total_xp_1000":
              return state.totalXP >= 1000
            case "total_xp_5000":
              return state.totalXP >= 5000
            case "total_xp_10000":
              return state.totalXP >= 10000
            case "half_modules":
              return (context.totalModules ?? 0) > 0 && (context.modulesCompleted ?? 0) >= Math.ceil((context.totalModules ?? 0) / 2)
            case "all_modules_completed":
              return (context.totalModules ?? 0) > 0 && (context.modulesCompleted ?? 0) >= (context.totalModules ?? 0)
            case "streak_7":
              return (context.streak ?? 0) >= 7
            case "streak_30":
              return (context.streak ?? 0) >= 30
            case "streak_100":
              return (context.streak ?? 0) >= 100
            case "streak_365":
              return (context.streak ?? 0) >= 365
            case "early_morning":
              return context.isEarlyMorning === true
            case "late_night":
              return context.isLateNight === true
            case "complete_conflict-resolution":
              return context.completedModuleId === "conflict-resolution"
            case "bookmarks_20":
              return (context.bookmarkCount ?? 0) >= 20
            case "juggling_5":
              return (context.modulesInProgress ?? 0) >= 5
            case "module_hopping":
              return (context.moduleHops ?? 0) >= 3
            case "marathon_session":
              return (context.sessionDurationMinutes ?? 0) >= 120
            case "panic_3":
              return state.panicButtonPresses >= 3
            case "procrastination_return":
              return (context.returnAfterDays ?? 0) >= 7
            case "quiz_redemption": {
              // Check if user failed then aced same module quiz
              const scores = state.quizScores
              const modules = new Set(scores.filter((s) => s.score < 70).map((s) => s.moduleId))
              return Array.from(modules).some((mId) => scores.some((s) => s.moduleId === mId && s.score === 100))
            }
            case "perfect_quizzes_5": {
              const perfectCount = state.quizScores.filter((s) => s.score === 100).length
              return perfectCount >= 5
            }
            case "perfect_quizzes_10": {
              const perfectCount = state.quizScores.filter((s) => s.score === 100).length
              return perfectCount >= 10
            }
            case "fast_completion":
              return false // needs timing data from module completion
            default:
              return false
          }
        }

        for (const badge of SPECIAL_BADGES) {
          if (check(badge)) {
            newlyUnlocked.push(badge.id)
          }
        }

        if (newlyUnlocked.length > 0) {
          set((state) => {
            const updated = { ...state.unlockedBadges }
            for (const id of newlyUnlocked) {
              updated[id] = { badgeId: id, unlockedAt: new Date().toISOString(), seen: false }
            }
            return {
              unlockedBadges: updated,
              pendingNotifications: [...state.pendingNotifications, ...newlyUnlocked],
            }
          })
        }

        return newlyUnlocked
      },

      markBadgeSeen: (badgeId) =>
        set((state) => ({
          unlockedBadges: {
            ...state.unlockedBadges,
            [badgeId]: { ...state.unlockedBadges[badgeId], seen: true },
          },
        })),

      markAllSeen: () =>
        set((state) => {
          const updated = { ...state.unlockedBadges }
          for (const key of Object.keys(updated)) {
            updated[key] = { ...updated[key], seen: true }
          }
          return { unlockedBadges: updated, pendingNotifications: [] }
        }),

      dismissNotification: (badgeId) =>
        set((state) => ({
          pendingNotifications: state.pendingNotifications.filter((id) => id !== badgeId),
          unlockedBadges: {
            ...state.unlockedBadges,
            [badgeId]: { ...state.unlockedBadges[badgeId], seen: true },
          },
        })),

      recordQuizScore: (moduleId, score) =>
        set((state) => ({
          quizScores: [...state.quizScores, { moduleId, score, date: new Date().toISOString() }],
        })),

      recordPanicPress: () =>
        set((state) => ({ panicButtonPresses: state.panicButtonPresses + 1 })),

      startSession: () =>
        set({ sessionStartTime: new Date().toISOString() }),

      // ---- Activity actions ----

      completeActivity: ({ activityId, activityType, topicId, score, maxScore, endingType, xpEarned }) => {
        // 1. Store best attempt; keep a running attempts counter.
        set((state) => {
          const prev = state.completedActivities[activityId]
          const isBetter = !prev || xpEarned > prev.xpEarned
          const nextRecord: ActivityCompletion = isBetter
            ? {
                activityId,
                activityType,
                topicId,
                score,
                maxScore,
                endingType,
                xpEarned,
                completedAt: new Date().toISOString(),
                attempts: (prev?.attempts ?? 0) + 1,
              }
            : { ...prev, attempts: prev.attempts + 1 }

          // XP is only awarded for the DELTA above the previous best — retries
          // can improve XP but can't farm it infinitely.
          const xpDelta = isBetter ? xpEarned - (prev?.xpEarned ?? 0) : 0
          const topicData = state.topicXP[topicId] || { topicId, xp: 0, lessonsCompleted: 0 }

          return {
            completedActivities: { ...state.completedActivities, [activityId]: nextRecord },
            topicXP: xpDelta > 0
              ? { ...state.topicXP, [topicId]: { ...topicData, xp: topicData.xp + xpDelta } }
              : state.topicXP,
            totalXP: state.totalXP + xpDelta,
          }
        })

        // 2. Run the badge check for that topic and surface new unlocks.
        return get().checkAndUnlockBadges(topicId)
      },

      saveReflection: (activityId, text) => {
        const wordCount = text.trim().split(/\s+/).filter(Boolean).length
        set((state) => ({
          reflections: {
            ...state.reflections,
            [activityId]: {
              activityId,
              text,
              wordCount,
              savedAt: new Date().toISOString(),
            },
          },
        }))
      },

      setPremium: (isPremium) => set({ isPremium }),

      canDownloadTemplate: (isPremiumTemplate) => {
        const state = get()
        // Roll over the monthly quota if we've crossed into a new month.
        const thisMonth = currentMonthKey()
        const downloadsThisMonth = state.downloadResetMonth === thisMonth
          ? state.templateDownloads.filter((d) => d.downloadedAt.startsWith(thisMonth)).length
          : 0
        const remaining = Math.max(0, FREE_DOWNLOAD_LIMIT - downloadsThisMonth)

        if (state.isPremium) {
          return { allowed: true, remainingThisMonth: Number.POSITIVE_INFINITY }
        }
        if (isPremiumTemplate) {
          return { allowed: false, reason: "premium_required", remainingThisMonth: remaining }
        }
        if (remaining <= 0) {
          return { allowed: false, reason: "monthly_limit", remainingThisMonth: 0 }
        }
        return { allowed: true, remainingThisMonth: remaining }
      },

      recordTemplateDownload: (templateId) => {
        set((state) => {
          const thisMonth = currentMonthKey()
          // Start fresh quota bucket if the month rolled over since last download.
          const rolled = state.downloadResetMonth !== thisMonth
          return {
            templateDownloads: [
              ...(rolled ? [] : state.templateDownloads),
              { templateId, downloadedAt: new Date().toISOString() },
            ],
            downloadResetMonth: thisMonth,
          }
        })
      },

      // ---- Getters ----

      isBadgeUnlocked: (badgeId) => !!get().unlockedBadges[badgeId],

      getTopicTier: (topicId) => {
        const state = get()
        const topicData = state.topicXP[topicId]
        if (!topicData) return null

        const tiers: BadgeTier[] = ["golden", "perfect", "ripe", "green", "sprout"]
        const topicBadges = getBadgesForTopic(topicId)

        for (const tier of tiers) {
          const badge = topicBadges.find((b) => b.tier === tier)
          if (badge && state.unlockedBadges[badge.id]) return tier
        }
        return null
      },

      getTopicProgress: (topicId) => {
        const state = get()
        const topicData = state.topicXP[topicId] || { xp: 0, lessonsCompleted: 0 }
        const currentTier = state.getTopicTier(topicId)

        const tierOrder: BadgeTier[] = ["sprout", "green", "ripe", "perfect", "golden"]
        const currentIndex = currentTier ? tierOrder.indexOf(currentTier) : -1
        const nextTier = currentIndex < tierOrder.length - 1 ? tierOrder[currentIndex + 1] : null

        const topicBadges = getBadgesForTopic(topicId)
        const nextBadge = nextTier ? topicBadges.find((b) => b.tier === nextTier) : null

        const xpNeeded = nextBadge ? nextBadge.xpRequired : 0
        const lessonsNeeded = nextBadge ? nextBadge.lessonsRequired : 0
        const percent = nextBadge
          ? Math.min(100, Math.round(((topicData.xp / nextBadge.xpRequired) * 50) + ((topicData.lessonsCompleted / nextBadge.lessonsRequired) * 50)))
          : 100

        return {
          currentTier,
          nextTier,
          xp: topicData.xp,
          xpNeeded,
          lessons: topicData.lessonsCompleted,
          lessonsNeeded,
          percent,
        }
      },

      getUnlockedCount: () => Object.keys(get().unlockedBadges).length,

      getTotalBadgeCount: () => TOPIC_BADGES.length + SPECIAL_BADGES.length,
    }),
    {
      name: "badge-storage",
    },
  ),
)
