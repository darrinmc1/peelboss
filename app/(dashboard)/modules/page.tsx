"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDownAZ,
  BookOpen,
  CheckCircle2,
  Filter,
  Search,
  SortAsc,
  FolderKanban,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModuleCard } from "@/components/module-card"
import { modulesList } from "@/data/modules"
import { useUserProgress } from "@/lib/user-progress-store"

export default function ModulesPage() {
  const { modules } = useUserProgress()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortOption, setSortOption] = useState("newest")

  // Enhance modules with user progress data
  const enhancedModules = modulesList.map((module) => ({
    ...module,
    progress: modules[module.id]?.progress || 0,
    status: modules[module.id]?.status || "not-started",
  }))

  // Filter modules based on search query, category, and level
  const filteredModules = enhancedModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || module.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || module.level.toLowerCase() === selectedLevel.toLowerCase()

    return matchesSearch && matchesCategory && matchesLevel
  })

  // Sort modules based on selected sort option
  const sortedModules = [...filteredModules].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      case "popularity":
        return (b.enrollmentCount || 0) - (a.enrollmentCount || 0)
      case "duration":
        return a.durationMinutes - b.durationMinutes
      default:
        return 0
    }
  })

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(modulesList.map((module) => module.category))]
  const levels = ["all", "beginner", "intermediate", "advanced"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Modules</h1>
        <p className="text-muted-foreground">Explore our comprehensive management training modules</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search modules..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1" asChild>
            <Link href="/categories">
              <FolderKanban className="h-4 w-4" />
              Browse by Category
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)} className="capitalize">
                    {category === selectedCategory && <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />}
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <SortAsc className="h-4 w-4" />
                Level
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Level</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {levels.map((level) => (
                  <DropdownMenuItem key={level} onClick={() => setSelectedLevel(level)} className="capitalize">
                    {level === selectedLevel && <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />}
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <ArrowDownAZ className="h-4 w-4" />
                Sort: {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setSortOption("newest")}>
                  {sortOption === "newest" && <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />}
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("popularity")}>
                  {sortOption === "popularity" && <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />}
                  Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("duration")}>
                  {sortOption === "duration" && <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />}
                  Shortest Duration
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="all">All Modules</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="not-started">Not Started</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {sortedModules.length === 0 ? (
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No modules found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedModules
              .filter((module) => module.status === "in-progress")
              .map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}

            {sortedModules.filter((module) => module.status === "in-progress").length === 0 && (
              <div className="col-span-3 flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No modules in progress</h3>
                <p className="mt-2 text-sm text-muted-foreground">Start a module to see it here</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedModules
              .filter((module) => module.status === "completed")
              .map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}

            {sortedModules.filter((module) => module.status === "completed").length === 0 && (
              <div className="col-span-3 flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No completed modules</h3>
                <p className="mt-2 text-sm text-muted-foreground">Complete a module to see it here</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="not-started" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedModules
              .filter((module) => module.status === "not-started")
              .map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}

            {sortedModules.filter((module) => module.status === "not-started").length === 0 && (
              <div className="col-span-3 flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No modules available</h3>
                <p className="mt-2 text-sm text-muted-foreground">All modules have been started or completed</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
