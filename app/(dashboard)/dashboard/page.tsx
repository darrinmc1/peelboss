"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, Clock, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserGreeting } from "@/components/user-greeting"
import { ModuleGrid } from "@/components/module-grid"
import { ModuleCard } from "@/components/module-card"
import { useUserProgress } from "@/lib/user-progress-store"
import { modulesList } from "@/data/modules"

export default function DashboardPage() {
  const { modules, updateStreak } = useUserProgress()

  // Update streak when page loads
  useEffect(() => {
    updateStreak()
  }, [updateStreak])

  // Get in-progress modules
  const inProgressModules = Object.entries(modules)
    .filter(([, data]) => data.status === "in-progress")
    .map(([id, data]) => {
      const moduleData = modulesList.find((m) => m.id === id)
      return moduleData ? { ...moduleData, progress: data.progress, status: "in-progress" } : null
    })
    .filter(Boolean)
    .slice(0, 3)

  // Get recently completed modules
  const completedModules = Object.entries(modules)
    .filter(([, data]) => data.status === "completed")
    .sort((a, b) => new Date(b[1].lastAccessed).getTime() - new Date(a[1].lastAccessed).getTime())
    .map(([id]) => {
      const moduleData = modulesList.find((m) => m.id === id)
      return moduleData ? { ...moduleData, progress: 100, status: "completed" } : null
    })
    .filter(Boolean)
    .slice(0, 3)

  return (
    <div className="space-y-6">
      <UserGreeting />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(modules).length * 2} hrs</div>
            <p className="text-xs text-muted-foreground">Based on your module progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules In Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(modules).filter((m) => m.status === "in-progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Continue where you left off</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Modules</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(modules).filter((m) => m.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Out of {modulesList.length} total modules</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Featured Modules</h2>
          <Button variant="ghost" asChild>
            <Link href="/modules" className="flex items-center gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ModuleGrid />
      </div>

      {inProgressModules.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Continue Learning</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inProgressModules.map((module) => (
              <ModuleCard key={module?.id} module={module} />
            ))}
          </div>
        </div>
      )}

      {completedModules.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Recently Completed</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {completedModules.map((module) => (
              <ModuleCard key={module?.id} module={module} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
