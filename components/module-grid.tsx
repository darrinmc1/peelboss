import { ModuleCard } from "@/components/module-card"
import { modulesList } from "@/data/modules"
import { useUserProgress } from "@/lib/user-progress-store"

export function ModuleGrid() {
  const { modules } = useUserProgress()

  // Get a subset of modules for the dashboard
  const featuredModules = modulesList.slice(0, 6).map((module) => ({
    ...module,
    progress: modules[module.id]?.progress || 0,
    status: modules[module.id]?.status || "not-started",
  }))

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredModules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  )
}
