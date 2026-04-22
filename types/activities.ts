// =============================================================================
// ACTIVITY SYSTEM TYPES
// Role-play scenarios, interactive exercises, reflections, templates
// =============================================================================

// ---- Role-play ----

export type RolePlayEndingType = "success" | "partial" | "failure"

export type RolePlayChoice = {
  /** stable id within the node */
  id: string
  /** what the player says */
  text: string
  /** score delta applied when this choice is picked */
  scoreDelta: number
  /** coach-style feedback shown immediately after selection */
  feedback: string
  /** next node to navigate to */
  nextNodeId: string
  /** optional semantic tag for analytics / author hinting */
  tone?: "supportive" | "direct" | "defensive" | "coaching" | "avoidant"
}

export type RolePlayNode = {
  id: string
  /** who is speaking — character is the AI counterpart, narrator is scene text */
  speaker: "character" | "narrator" | "system"
  /** the message body */
  message: string
  /** player's options. If absent, this is a terminal node (ending). */
  choices?: RolePlayChoice[]
  /** true if this node ends the scenario */
  isEnding?: boolean
  endingType?: RolePlayEndingType
  /** summary feedback shown at the end screen */
  feedback?: string
}

export type RolePlayDifficulty = "Beginner" | "Intermediate" | "Advanced"

/** Hub-surface metadata — optional; absent fields fall back to sensible defaults. */
export type RolePlayHubMeta = {
  difficulty?: RolePlayDifficulty
  /** Display-friendly topic label (e.g. "1:1 Meetings"). Falls back to topicId. */
  topicLabel?: string
  /** /public asset path. Card falls back to a themed gradient if absent. */
  thumbnail?: string
  /** true = paywalled */
  premium?: boolean
}

export type RolePlayScenario = {
  id: string
  title: string
  description: string
  /** used to route XP into the right topic bucket */
  topicId: string
  /** badge ID to attempt-unlock when completed successfully */
  completionBadgeId?: string
  persona: {
    name: string
    role: string
    /** emoji or /public asset path */
    avatar: string
    /** opening scene-setter shown before the first node */
    context: string
  }
  learningObjectives: string[]
  /** max possible points achievable on a perfect run */
  maxScore: number
  /** threshold for a "success" ending regardless of endingType metadata */
  passingScore: number
  /** first node to render */
  startNodeId: string
  nodes: Record<string, RolePlayNode>
  /** base XP awarded on completion; bonus scales with score */
  xpReward: number
  /** rough time to complete in minutes (for lesson time estimate) */
  estimatedMinutes: number
  /** Hub-surface metadata. Optional so authors can defer writing it. */
  hub?: RolePlayHubMeta
}

// ---- Role-play runtime state ----

export type RolePlayRunState = {
  scenarioId: string
  currentNodeId: string
  score: number
  /** ordered list of node->choice transitions for replay + analytics */
  path: { nodeId: string; choiceId: string; scoreDelta: number }[]
  isComplete: boolean
  endingType?: RolePlayEndingType
}

// ---- Interactive exercises (stub for follow-up pass) ----

export type ExerciseType =
  | "multiple-choice"
  | "drag-drop-priority"
  | "reflection"

export type MultipleChoiceQuestion = {
  id: string
  question: string
  options: { id: string; text: string; isCorrect: boolean; explanation: string }[]
}

export type DragDropItem = {
  id: string
  text: string
  correctCategoryId: string
}

export type DragDropCategory = {
  id: string
  label: string
  description?: string
}

export type InteractiveExercise =
  | {
      id: string
      type: "multiple-choice"
      title: string
      description: string
      topicId: string
      questions: MultipleChoiceQuestion[]
      xpReward: number
      estimatedMinutes: number
    }
  | {
      id: string
      type: "drag-drop-priority"
      title: string
      description: string
      topicId: string
      items: DragDropItem[]
      categories: DragDropCategory[]
      resultsExplanation: string
      xpReward: number
      estimatedMinutes: number
    }
  | {
      id: string
      type: "reflection"
      title: string
      description: string
      topicId: string
      prompt: string
      minWords: number
      xpReward: number
      estimatedMinutes: number
    }

// ---- Templates ----

export type TemplateFileType = "docx" | "pdf" | "xlsx" | "pptx"

export type TemplateDefinition = {
  id: string
  /** Display name (catalog JSON uses `name` too — both accepted in loaders) */
  title: string
  description: string
  /** Display-friendly topic (e.g. "1:1 Meetings"). */
  topic: string
  /** Internal topicId for XP routing; optional — not all templates belong to a training topic. */
  topicId?: string
  fileType: TemplateFileType
  /** path under /public, e.g. /templates/1on1-agenda.docx */
  filePath: string
  /** preview image under /public. null/undefined → card uses a themed fallback. */
  previewImage?: string | null
  /** true = premium-only (paywalled) */
  premium: boolean
  /** XP awarded once per template per user on first download. 0 to disable. */
  xpReward: number
  /** Seeded counter for social proof; incremented locally per download. */
  downloadCount: number
  /** 1–5 star display-only rating. */
  rating: number
  /** Whether the actual file has been uploaded to /public/templates/. */
  fileAvailable: boolean
  /** Optional tags — e.g. "humor", "staff-pick", "popular". */
  tags?: string[]
  lastUpdated?: string
}

// ---- Guides (long-form content, deferred) ----

export type GuideDefinition = {
  id: string
  title: string
  description: string
  topic: string
  /** estimated reading time in minutes */
  readingMinutes: number
  /** route under /resources/guides/[id] */
  slug: string
  premium: boolean
}

// ---- Reflections (user-authored text, saved per activity) ----

export type ReflectionEntry = {
  activityId: string
  text: string
  wordCount: number
  savedAt: string
}

// ---- Activity wrapper (for lesson embedding — follow-up pass) ----

export type ActivityPosition = "before_content" | "after_content" | "inline"

export type LessonActivityRef = {
  type: "roleplay" | "exercise" | "reflection"
  id: string
  position: ActivityPosition
  required: boolean
  xpReward: number
}
