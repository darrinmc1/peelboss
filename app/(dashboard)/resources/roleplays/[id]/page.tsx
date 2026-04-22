"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Award, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RolePlayScenario as RolePlayScenarioPlayer } from "@/components/lessons/RolePlayScenario"
import { getRolePlayScenario } from "@/data/activities"

type PageProps = { params: Promise<{ id: string }> }

export default function RolePlayDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const scenario = getRolePlayScenario(id)
  if (!scenario) notFound()

  const hub = scenario.hub ?? {}

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/resources/roleplays">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to all role-plays
        </Link>
      </Button>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-indigo-600 hover:bg-indigo-600">
            {hub.topicLabel ?? scenario.topicId}
          </Badge>
          {hub.difficulty && <Badge variant="outline">{hub.difficulty}</Badge>}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            ~{scenario.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            Up to {scenario.xpReward} XP
          </span>
        </div>
        <h1 className="text-3xl font-bold">{scenario.title}</h1>
      </div>

      {scenario.learningObjectives.length > 0 && (
        <div className="rounded-lg border bg-card p-4">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            What you'll practice
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {scenario.learningObjectives.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      <RolePlayScenarioPlayer scenario={scenario} />
    </div>
  )
}
