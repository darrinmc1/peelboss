"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RolePlayCard } from "@/components/resources/RolePlayCard"
import { listRolePlayScenarios } from "@/data/activities"
import type { RolePlayDifficulty } from "@/types/activities"

const DIFFICULTIES: (RolePlayDifficulty | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"]

export default function RolePlaysPage() {
  const all = useMemo(() => listRolePlayScenarios(), [])
  const [query, setQuery] = useState("")
  const [difficulty, setDifficulty] = useState<RolePlayDifficulty | "All">("All")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all.filter((s) => {
      if (difficulty !== "All" && (s.hub?.difficulty ?? "Intermediate") !== difficulty) return false
      if (q) {
        const hay = `${s.title} ${s.description} ${s.hub?.topicLabel ?? s.topicId}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [all, query, difficulty])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">🎭 Role-Play Scenarios</h1>
        <p className="mt-1 text-muted-foreground">
          Practice difficult management conversations in a safe, judgment-free environment.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search scenarios…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-1 rounded-lg border bg-card p-1">
          {DIFFICULTIES.map((d) => (
            <Button
              key={d}
              variant={difficulty === d ? "default" : "ghost"}
              size="sm"
              onClick={() => setDifficulty(d)}
              className="text-xs"
            >
              {d}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {all.length} scenario{all.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center">
          <p className="text-lg font-medium">No scenarios match</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different difficulty or search term.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <RolePlayCard key={s.id} scenario={s} />
          ))}
        </div>
      )}
    </div>
  )
}
