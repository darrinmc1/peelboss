"use client"

import Link from "next/link"
import { Target } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ExercisesPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
        <Target className="h-8 w-8 text-amber-600" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">🎯 Interactive Exercises</h1>
        <p className="text-muted-foreground">
          Multiple-choice scenarios, drag-and-drop priority sorts, and reflection prompts
          are on the way. Each one awards XP and counts toward your topic badges.
        </p>
      </div>
      <div className="rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
        Coming soon.
      </div>
      <Button asChild variant="outline">
        <Link href="/resources">Back to Resource Hub</Link>
      </Button>
    </div>
  )
}
