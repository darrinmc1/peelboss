"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Send, Sparkles, Trophy, AlertCircle, CheckCircle2 } from "lucide-react"

import type {
  RolePlayChoice,
  RolePlayRunState,
  RolePlayScenario,
} from "@/types/activities"
import {
  getCurrentNode,
  initRun,
  restartRun,
  selectChoice,
} from "@/lib/roleplay-engine"
import { finalizeRolePlay } from "@/lib/activity-tracker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type TimelineItem =
  | { kind: "node"; nodeId: string; speaker: "character" | "narrator" | "system"; message: string; avatar?: string; speakerName?: string }
  | { kind: "choice"; choiceId: string; text: string; feedback: string; scoreDelta: number }

type Props = {
  scenario: RolePlayScenario
  /** Optional callback fired after the engine finalizes the run. */
  onComplete?: (result: { xpEarned: number; score: number; maxScore: number; newlyUnlockedBadgeIds: string[] }) => void
}

export function RolePlayScenario({ scenario, onComplete }: Props) {
  const [state, setState] = useState<RolePlayRunState>(() => initRun(scenario))
  const [timeline, setTimeline] = useState<TimelineItem[]>(() => [
    {
      kind: "node",
      nodeId: scenario.startNodeId,
      speaker: scenario.nodes[scenario.startNodeId].speaker,
      message: scenario.nodes[scenario.startNodeId].message,
      avatar: scenario.persona.avatar,
      speakerName: scenario.nodes[scenario.startNodeId].speaker === "character" ? scenario.persona.name : undefined,
    },
  ])
  const [finalized, setFinalized] = useState<{
    xpEarned: number
    score: number
    maxScore: number
    newlyUnlockedBadgeIds: string[]
  } | null>(null)

  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Auto-scroll to bottom on new messages.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [timeline])

  // Finalize once, when the run completes.
  useEffect(() => {
    if (!state.isComplete || finalized) return
    const result = finalizeRolePlay(scenario, state)
    setFinalized(result)
    onComplete?.(result)
  }, [state.isComplete, finalized, scenario, state, onComplete])

  const currentNode = useMemo(() => (state.isComplete ? null : getCurrentNode(scenario, state)), [scenario, state])

  const handleChoice = (choice: RolePlayChoice) => {
    const { nextState, nextNode } = selectChoice(scenario, state, choice.id)
    setTimeline((prev) => [
      ...prev,
      { kind: "choice", choiceId: choice.id, text: choice.text, feedback: choice.feedback, scoreDelta: choice.scoreDelta },
      {
        kind: "node",
        nodeId: nextNode.id,
        speaker: nextNode.speaker,
        message: nextNode.message,
        avatar: scenario.persona.avatar,
        speakerName: nextNode.speaker === "character" ? scenario.persona.name : undefined,
      },
    ])
    setState(nextState)
  }

  const handleRestart = () => {
    setState(restartRun(scenario))
    setTimeline([
      {
        kind: "node",
        nodeId: scenario.startNodeId,
        speaker: scenario.nodes[scenario.startNodeId].speaker,
        message: scenario.nodes[scenario.startNodeId].message,
        avatar: scenario.persona.avatar,
        speakerName: scenario.nodes[scenario.startNodeId].speaker === "character" ? scenario.persona.name : undefined,
      },
    ])
    setFinalized(null)
  }

  return (
    <Card className="border-amber-200 bg-gradient-to-br from-amber-50/50 to-yellow-50/30">
      <CardHeader className="border-b border-amber-100 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl" aria-hidden>
                {scenario.persona.avatar}
              </span>
              {scenario.title}
            </CardTitle>
            <CardDescription>{scenario.description}</CardDescription>
          </div>
          <ScoreBadge score={state.score} max={scenario.maxScore} />
        </div>

        {/* Scene context — always visible at the top, like a stage direction */}
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <span className="font-medium">Scene:</span> {scenario.persona.context}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-5">
        {/* Conversation timeline */}
        <ScrollArea className="h-[420px] pr-2">
          <div ref={scrollRef} className="space-y-3">
            <AnimatePresence initial={false}>
              {timeline.map((item, i) =>
                item.kind === "node" ? (
                  <NodeBubble
                    key={`${item.nodeId}-${i}`}
                    speaker={item.speaker}
                    message={item.message}
                    avatar={item.avatar ?? scenario.persona.avatar}
                    speakerName={item.speakerName}
                  />
                ) : (
                  <ChoiceBubble
                    key={`choice-${i}`}
                    text={item.text}
                    feedback={item.feedback}
                    scoreDelta={item.scoreDelta}
                  />
                ),
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Choices OR completion state */}
        {!state.isComplete && currentNode?.choices && (
          <div className="space-y-2 border-t border-amber-100 pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Your response
            </p>
            <div className="grid gap-2">
              {currentNode.choices.map((choice) => (
                <motion.button
                  key={choice.id}
                  type="button"
                  onClick={() => handleChoice(choice)}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group flex items-start gap-3 rounded-lg border border-amber-200 bg-white p-3 text-left text-sm shadow-sm transition-colors hover:border-amber-400 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <Send className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500 group-hover:text-amber-600" aria-hidden />
                  <span className="leading-relaxed">{choice.text}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {state.isComplete && finalized && (
          <CompletionPanel
            scenario={scenario}
            state={state}
            result={finalized}
            onRestart={handleRestart}
          />
        )}
      </CardContent>
    </Card>
  )
}

// ---- Subcomponents ----

function NodeBubble({
  speaker,
  message,
  avatar,
  speakerName,
}: {
  speaker: "character" | "narrator" | "system"
  message: string
  avatar: string
  speakerName?: string
}) {
  if (speaker === "narrator" || speaker === "system") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-[90%] rounded-md bg-slate-100 px-4 py-2 text-center text-xs italic leading-relaxed text-slate-600"
      >
        {message}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-end gap-2"
    >
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-xl"
        aria-hidden
      >
        {avatar}
      </div>
      <div className="max-w-[80%] space-y-1">
        {speakerName && (
          <p className="pl-1 text-xs font-medium text-muted-foreground">{speakerName}</p>
        )}
        <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm leading-relaxed shadow-sm ring-1 ring-slate-200">
          {message}
        </div>
      </div>
    </motion.div>
  )
}

function ChoiceBubble({
  text,
  feedback,
  scoreDelta,
}: {
  text: string
  feedback: string
  scoreDelta: number
}) {
  const deltaTone =
    scoreDelta > 0 ? "text-emerald-600" : scoreDelta < 0 ? "text-rose-600" : "text-slate-500"
  const feedbackBg =
    scoreDelta > 0
      ? "bg-emerald-50 text-emerald-900 ring-emerald-200"
      : scoreDelta < 0
        ? "bg-rose-50 text-rose-900 ring-rose-200"
        : "bg-slate-50 text-slate-900 ring-slate-200"

  return (
    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-amber-400 px-4 py-2.5 text-sm leading-relaxed text-amber-950 shadow-sm">
          {text}
        </div>
      </div>
      <div className={`ml-auto max-w-[80%] rounded-md px-3 py-2 text-xs ring-1 ${feedbackBg}`}>
        <div className="mb-1 flex items-center gap-1 font-medium">
          <Sparkles className="h-3 w-3" aria-hidden />
          Coach
          <span className={`ml-auto ${deltaTone}`}>
            {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}
          </span>
        </div>
        <p className="leading-relaxed">{feedback}</p>
      </div>
    </motion.div>
  )
}

function ScoreBadge({ score, max }: { score: number; max: number }) {
  const pct = Math.max(0, Math.min(1, score / max))
  return (
    <div className="flex flex-col items-end gap-0.5 text-xs">
      <span className="text-muted-foreground">Score</span>
      <span className="text-lg font-semibold tabular-nums text-amber-700">
        {score}
        <span className="text-sm font-normal text-muted-foreground"> / {max}</span>
      </span>
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-amber-100">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </div>
  )
}

function CompletionPanel({
  scenario,
  state,
  result,
  onRestart,
}: {
  scenario: RolePlayScenario
  state: RolePlayRunState
  result: { xpEarned: number; score: number; maxScore: number; newlyUnlockedBadgeIds: string[] }
  onRestart: () => void
}) {
  const endingNode = scenario.nodes[state.currentNodeId]
  const tone =
    state.endingType === "success"
      ? { Icon: Trophy, label: "Well played", ring: "ring-emerald-200", bg: "bg-emerald-50", text: "text-emerald-900" }
      : state.endingType === "partial"
        ? { Icon: CheckCircle2, label: "Partial credit", ring: "ring-amber-200", bg: "bg-amber-50", text: "text-amber-900" }
        : { Icon: AlertCircle, label: "Tough round", ring: "ring-rose-200", bg: "bg-rose-50", text: "text-rose-900" }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`space-y-4 rounded-lg p-4 ring-1 ${tone.bg} ${tone.ring}`}
    >
      <div className={`flex items-center gap-2 ${tone.text}`}>
        <tone.Icon className="h-5 w-5" aria-hidden />
        <span className="font-semibold">{tone.label}</span>
      </div>

      {endingNode.feedback && (
        <p className={`text-sm leading-relaxed ${tone.text}`}>{endingNode.feedback}</p>
      )}

      {/* XP reward */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        className="flex items-center justify-between rounded-md bg-white/60 p-3 ring-1 ring-white"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-amber-900">
          <Sparkles className="h-4 w-4 text-amber-500" aria-hidden />
          XP earned
        </div>
        <span className="text-xl font-bold tabular-nums text-amber-700">+{result.xpEarned}</span>
      </motion.div>

      {result.newlyUnlockedBadgeIds.length > 0 && (
        <div className="rounded-md bg-white/60 p-3 text-sm ring-1 ring-white">
          <p className="mb-1 flex items-center gap-2 font-medium text-amber-900">
            <Trophy className="h-4 w-4 text-amber-500" aria-hidden /> New badge
            {result.newlyUnlockedBadgeIds.length > 1 ? "s" : ""} unlocked!
          </p>
          <p className="text-xs text-muted-foreground">
            Check your profile to see {result.newlyUnlockedBadgeIds.length} new badge
            {result.newlyUnlockedBadgeIds.length > 1 ? "s" : ""}.
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={onRestart}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>
    </motion.div>
  )
}
