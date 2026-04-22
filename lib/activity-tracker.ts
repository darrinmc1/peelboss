// =============================================================================
// ACTIVITY TRACKER
// Thin orchestration layer that glues the pure engines (roleplay, exercise)
// to the Zustand badge-store. Keeps components free of store-wiring logic
// and gives us one place to evolve the XP / badge awarding policy.
// =============================================================================

import type { RolePlayRunState, RolePlayScenario } from "@/types/activities"
import { calculateEarnedXP } from "@/lib/roleplay-engine"
import { useBadgeStore } from "@/lib/badge-store"

export type ActivityCompletionResult = {
  xpEarned: number
  /** Newly unlocked badges as a result of this completion. */
  newlyUnlockedBadgeIds: string[]
  /** The score computed by the engine (passed through for UI). */
  score: number
  maxScore: number
}

/**
 * Finalize a role-play run. Awards XP, stores the completion on the store,
 * and triggers badge checks. Safe to call exactly once per completion.
 */
export function finalizeRolePlay(
  scenario: RolePlayScenario,
  state: RolePlayRunState,
): ActivityCompletionResult {
  if (!state.isComplete) {
    throw new Error("finalizeRolePlay called on an incomplete run")
  }

  const xpEarned = calculateEarnedXP(scenario, state)
  const newlyUnlockedBadgeIds = useBadgeStore.getState().completeActivity({
    activityId: `roleplay:${scenario.id}`,
    activityType: "roleplay",
    topicId: scenario.topicId,
    score: state.score,
    maxScore: scenario.maxScore,
    endingType: state.endingType,
    xpEarned,
  })

  return {
    xpEarned,
    newlyUnlockedBadgeIds,
    score: state.score,
    maxScore: scenario.maxScore,
  }
}

/** Read the stored best-attempt record for a scenario (for UI badges). */
export function getRolePlayBest(scenarioId: string) {
  return useBadgeStore.getState().completedActivities[`roleplay:${scenarioId}`]
}
