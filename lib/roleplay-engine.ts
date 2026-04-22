// =============================================================================
// ROLE-PLAY ENGINE
// Pure state-transition logic for branching scenarios.
// Kept framework-agnostic so components stay thin and the engine is testable
// without a DOM.
// =============================================================================

import type {
  RolePlayChoice,
  RolePlayEndingType,
  RolePlayNode,
  RolePlayRunState,
  RolePlayScenario,
} from "@/types/activities"

export function initRun(scenario: RolePlayScenario): RolePlayRunState {
  return {
    scenarioId: scenario.id,
    currentNodeId: scenario.startNodeId,
    score: 0,
    path: [],
    isComplete: false,
  }
}

export function getCurrentNode(
  scenario: RolePlayScenario,
  state: RolePlayRunState,
): RolePlayNode {
  const node = scenario.nodes[state.currentNodeId]
  if (!node) {
    throw new Error(
      `RolePlay engine: node "${state.currentNodeId}" not found in scenario "${scenario.id}"`,
    )
  }
  return node
}

export function selectChoice(
  scenario: RolePlayScenario,
  state: RolePlayRunState,
  choiceId: string,
): { nextState: RolePlayRunState; choice: RolePlayChoice; nextNode: RolePlayNode } {
  const node = getCurrentNode(scenario, state)
  const choice = node.choices?.find((c) => c.id === choiceId)
  if (!choice) {
    throw new Error(
      `RolePlay engine: choice "${choiceId}" not available on node "${node.id}"`,
    )
  }

  const nextNode = scenario.nodes[choice.nextNodeId]
  if (!nextNode) {
    throw new Error(
      `RolePlay engine: next node "${choice.nextNodeId}" not found (from choice "${choiceId}" on node "${node.id}")`,
    )
  }

  const score = state.score + choice.scoreDelta
  const isComplete = !!nextNode.isEnding

  const nextState: RolePlayRunState = {
    ...state,
    currentNodeId: nextNode.id,
    score,
    path: [...state.path, { nodeId: node.id, choiceId: choice.id, scoreDelta: choice.scoreDelta }],
    isComplete,
    endingType: isComplete ? resolveEndingType(scenario, nextNode, score) : undefined,
  }

  return { nextState, choice, nextNode }
}

/**
 * Resolve the final ending type. The author may annotate a node with
 * `endingType`, but the engine also respects `passingScore` so that
 * manipulating the branch structure without updating endings can't lie
 * about success. Rule: if node says "success" but score < passing, demote
 * to "partial"; if node says "failure" but score >= passing, promote to
 * "partial" (not all the way to success — ending metadata is still a signal).
 */
function resolveEndingType(
  scenario: RolePlayScenario,
  node: RolePlayNode,
  score: number,
): RolePlayEndingType {
  const declared = node.endingType ?? "partial"
  const passed = score >= scenario.passingScore

  if (declared === "success" && !passed) return "partial"
  if (declared === "failure" && passed) return "partial"
  return declared
}

/** XP actually awarded. Base XP * scaling by score / maxScore, floored at 25%. */
export function calculateEarnedXP(scenario: RolePlayScenario, state: RolePlayRunState): number {
  if (!state.isComplete) return 0
  const ratio = Math.max(0, state.score) / scenario.maxScore
  const scaled = Math.round(scenario.xpReward * Math.max(0.25, Math.min(1, ratio)))
  return scaled
}

export function restartRun(scenario: RolePlayScenario): RolePlayRunState {
  return initRun(scenario)
}
