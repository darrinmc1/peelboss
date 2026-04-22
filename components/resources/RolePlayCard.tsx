"use client"

import Link from "next/link"
import { Award, Clock, Lock, Play, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { RolePlayDifficulty, RolePlayScenario } from "@/types/activities"
import { useBadgeStore } from "@/lib/badge-store"

const DIFFICULTY_STYLES: Record<RolePlayDifficulty, string> = {
  Beginner: "bg-emerald-500 hover:bg-emerald-500",
  Intermediate: "bg-amber-500 hover:bg-amber-500",
  Advanced: "bg-rose-500 hover:bg-rose-500",
}

type Props = { scenario: RolePlayScenario }

export function RolePlayCard({ scenario }: Props) {
  const hub = scenario.hub ?? {}
  const difficulty: RolePlayDifficulty = hub.difficulty ?? "Intermediate"
  const topic = hub.topicLabel ?? scenario.topicId
  const isPremium = hub.premium ?? false

  // Surface user's best attempt on the card for motivation / returnability.
  const best = useBadgeStore((s) => s.completedActivities[`roleplay:${scenario.id}`])
  const completionPct = best
    ? Math.round((Math.max(0, best.score) / best.maxScore) * 100)
    : undefined

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative h-36 w-full bg-gradient-to-br from-purple-100 via-indigo-100 to-sky-100 flex items-center justify-center">
        {hub.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hub.thumbnail} alt={scenario.title} className="h-full w-full object-cover" />
        ) : (
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-4xl shadow-sm"
            aria-hidden
          >
            {scenario.persona.avatar}
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-10 w-10 text-white" fill="currentColor" aria-hidden />
        </div>

        <Badge className={`absolute right-2 top-2 text-white ${DIFFICULTY_STYLES[difficulty]}`}>
          {difficulty}
        </Badge>

        <Badge className="absolute left-2 top-2 bg-indigo-600 hover:bg-indigo-600">{topic}</Badge>

        {isPremium && (
          <Badge className="absolute bottom-2 right-2 gap-1 bg-amber-500 hover:bg-amber-500">
            <Lock className="h-3 w-3" />
            Premium
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1.5 font-semibold leading-tight">{scenario.title}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{scenario.description}</p>

        <div className="mb-3 mt-auto flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {scenario.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            {scenario.xpReward} XP
          </span>
          {completionPct !== undefined && (
            <span className="flex items-center gap-1 text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              Best {completionPct}%
            </span>
          )}
        </div>

        <Button asChild className="w-full">
          <Link href={`/resources/roleplays/${scenario.id}`}>
            <Play className="mr-2 h-4 w-4" />
            {best ? "Play again" : "Start role-play"}
          </Link>
        </Button>
      </div>
    </Card>
  )
}
