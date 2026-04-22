"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useUserProgress } from "@/lib/user-progress-store"
import { modulesList } from "@/data/modules"

export default function ProgressPage() {
  const { modules, streak, updateStreak } = useUserProgress()

  // Update streak when page loads
  useEffect(() => {
    updateStreak()
  }, [updateStreak])

  // Get modules with progress
  const modulesWithProgress = modulesList
    .map((module) => ({
      ...module,
      progress: modules[module.id]?.progress || 0,
      status: modules[module.id]?.status || "not-started",
    }))
    .filter((module) => module.progress > 0)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 4)

  // If no modules have progress, show the first few from the list
  const modulesToShow =
    modulesWithProgress.length > 0
      ? modulesWithProgress
      : modulesList.slice(0, 4).map((module) => ({
          ...module,
          progress: 0,
          status: "not-started" as const,
        }))

  // Get current day of week (0 = Sunday, 6 = Saturday)
  const currentDayOfWeek = new Date().getDay()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and achievements</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your progress across all modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {modulesToShow.map((module) => (
                <div key={module.id}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{module.title}</span>
                    <span className="text-sm text-muted-foreground">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              ))}

              {modulesToShow.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  <p>Start a module to track your progress</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Weekly Streak</CardTitle>
            <CardDescription>Keep your learning momentum</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <span className="text-4xl font-bold text-purple-600 dark:text-purple-300">{streak}</span>
              </div>
              <div className="text-center">
                <p className="font-medium">Current Streak</p>
                <p className="text-sm text-muted-foreground">
                  {streak > 0 ? "Keep it up! You're doing great." : "Start learning today to begin your streak!"}
                </p>
              </div>
              <div className="grid w-full grid-cols-7 gap-1">
                {Array.from({ length: 7 }).map((_, i) => {
                  // Highlight days up to current day of week
                  const isActive = i < currentDayOfWeek && streak > 0
                  return (
                    <div
                      key={i}
                      className={`h-8 rounded ${isActive ? "bg-purple-500 dark:bg-purple-600" : "bg-muted"}`}
                    />
                  )
                })}
              </div>
              <div className="flex w-full justify-between text-xs text-muted-foreground">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Badges you can earn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${modules && Object.keys(modules).length > 0 ? "bg-purple-100 dark:bg-purple-900" : "bg-gray-100 dark:bg-gray-800"} p-2`}
                >
                  <Image
                    src={
                      modules && Object.keys(modules).length > 0
                        ? "/golden-trophy.png"
                        : "/placeholder.svg?height=40&width=40&query=trophy outline"
                    }
                    alt="First Course"
                    width={40}
                    height={40}
                    className={modules && Object.keys(modules).length > 0 ? "" : "opacity-40"}
                  />
                </div>
                <Badge
                  variant="outline"
                  className={`w-full justify-center ${modules && Object.keys(modules).length === 0 ? "text-muted-foreground" : ""}`}
                >
                  First Course
                </Badge>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${streak >= 5 ? "bg-purple-100 dark:bg-purple-900" : "bg-gray-100 dark:bg-gray-800"} p-2`}
                >
                  <Image
                    src={
                      streak >= 5
                        ? "/colorful-paint-streak.png"
                        : "/placeholder.svg?height=40&width=40&query=streak outline"
                    }
                    alt="5 Day Streak"
                    width={40}
                    height={40}
                    className={streak >= 5 ? "" : "opacity-40"}
                  />
                </div>
                <Badge
                  variant="outline"
                  className={`w-full justify-center ${streak < 5 ? "text-muted-foreground" : ""}`}
                >
                  5 Day Streak
                </Badge>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${Object.values(modules).some((m) => m.status === "completed") ? "bg-purple-100 dark:bg-purple-900" : "bg-gray-100 dark:bg-gray-800"} p-2`}
                >
                  <Image
                    src={
                      Object.values(modules).some((m) => m.status === "completed")
                        ? "/formal-certificate.png"
                        : "/placeholder.svg?height=40&width=40&query=certificate outline"
                    }
                    alt="Certified"
                    width={40}
                    height={40}
                    className={Object.values(modules).some((m) => m.status === "completed") ? "" : "opacity-40"}
                  />
                </div>
                <Badge
                  variant="outline"
                  className={`w-full justify-center ${!Object.values(modules).some((m) => m.status === "completed") ? "text-muted-foreground" : ""}`}
                >
                  Certified
                </Badge>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <Image src="/placeholder-8ns6k.png" alt="Locked" width={40} height={40} className="opacity-40" />
                </div>
                <Badge variant="outline" className="w-full justify-center text-muted-foreground">
                  10 Day Streak
                </Badge>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <Image src="/placeholder-at3dz.png" alt="Locked" width={40} height={40} className="opacity-40" />
                </div>
                <Badge variant="outline" className="w-full justify-center text-muted-foreground">
                  All Courses
                </Badge>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <Image src="/placeholder-ik94z.png" alt="Locked" width={40} height={40} className="opacity-40" />
                </div>
                <Badge variant="outline" className="w-full justify-center text-muted-foreground">
                  Expert
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
