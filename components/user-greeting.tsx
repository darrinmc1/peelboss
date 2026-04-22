"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { useUserProgress } from "@/lib/user-progress-store"

export function UserGreeting() {
  const [greeting, setGreeting] = useState("Hello")
  const { getOverallProgress, updateStreak } = useUserProgress()

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    // Update streak when component mounts
    updateStreak()
  }, [updateStreak])

  // Get overall progress
  const progress = getOverallProgress()

  return (
    <div className="flex items-center justify-between w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div>
        <h2 className="text-2xl font-bold">{greeting}</h2>
        <p className="text-muted-foreground">Continue your learning journey</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1 w-48">
          <Progress value={progress} className="h-2" />
          <span className="text-xs text-right text-muted-foreground">{progress}% Complete</span>
        </div>
      </div>
    </div>
  )
}
