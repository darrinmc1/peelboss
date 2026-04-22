"use client"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { TIER_CONFIG, type BadgeTier, getBadgesForTopic } from "@/data/badges"
import { useBadgeStore } from "@/lib/badge-store"

interface BadgeProgressProps {
  topicId: string
  topicName?: string
  compact?: boolean
  className?: string
}

const TIER_ORDER: BadgeTier[] = ["sprout", "green", "ripe", "perfect", "golden"]

export function BadgeProgress({ topicId, topicName, compact = false, className }: BadgeProgressProps) {
  const { getTopicProgress, isBadgeUnlocked } = useBadgeStore()
  const progress = getTopicProgress(topicId)
  const topicBadges = getBadgesForTopic(topicId)

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {/* Mini tier dots */}
        <div className="flex gap-1">
          {TIER_ORDER.map((tier) => {
            const badge = topicBadges.find((b) => b.tier === tier)
            const unlocked = badge ? isBadgeUnlocked(badge.id) : false
            return (
              <div
                key={tier}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  unlocked
                    ? `bg-[${TIER_CONFIG[tier].color}] ring-1 ring-offset-1`
                    : "bg-muted"
                )}
                style={unlocked ? { backgroundColor: TIER_CONFIG[tier].color } : {}}
                title={`${TIER_CONFIG[tier].label}: ${unlocked ? "Earned" : "Locked"}`}
              />
            )
          })}
        </div>
        {progress.nextTier && (
          <Progress value={progress.percent} className="h-1.5 flex-1 max-w-[80px]" />
        )}
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {topicName && (
        <h4 className="font-semibold text-sm">{topicName}</h4>
      )}

      {/* Tier progression visualization */}
      <div className="flex items-center gap-1">
        {TIER_ORDER.map((tier, index) => {
          const badge = topicBadges.find((b) => b.tier === tier)
          const unlocked = badge ? isBadgeUnlocked(badge.id) : false
          const isNext = tier === progress.nextTier
          const config = TIER_CONFIG[tier]

          return (
            <div key={tier} className="flex items-center flex-1">
              {/* Tier node */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300",
                    unlocked
                      ? "shadow-md scale-100"
                      : isNext
                        ? "ring-2 ring-dashed ring-muted-foreground/30 animate-pulse"
                        : "bg-muted opacity-40"
                  )}
                  style={unlocked ? { backgroundColor: config.color + "40", boxShadow: `0 0 12px ${config.color}40` } : {}}
                >
                  {config.emoji}
                </div>
                <span className={cn(
                  "text-[9px] font-medium uppercase tracking-wider text-center",
                  unlocked ? "text-foreground" : "text-muted-foreground/60"
                )}>
                  {config.label}
                </span>
              </div>

              {/* Connector line */}
              {index < TIER_ORDER.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-1",
                  unlocked ? "bg-gradient-to-r from-yellow-300 to-yellow-400" : "bg-muted"
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* Progress toward next tier */}
      {progress.nextTier ? (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              Next: {TIER_CONFIG[progress.nextTier].emoji} {TIER_CONFIG[progress.nextTier].label}
            </span>
            <span>{progress.percent}%</span>
          </div>
          <Progress value={progress.percent} className="h-2" />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{progress.xp} / {progress.xpNeeded} XP</span>
            <span>{progress.lessons} / {progress.lessonsNeeded} lessons</span>
          </div>
        </div>
      ) : progress.currentTier === "golden" ? (
        <div className="text-center py-2">
          <span className="text-sm font-medium text-yellow-600">
            👑 Maximum tier reached! You&apos;re a Golden Banana!
          </span>
        </div>
      ) : (
        <div className="text-center py-2">
          <span className="text-xs text-muted-foreground">
            Complete lessons to start earning badges
          </span>
        </div>
      )}
    </div>
  )
}
