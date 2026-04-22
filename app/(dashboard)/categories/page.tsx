"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, ChevronRight, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { modulesList } from "@/data/modules"
import { useUserProgress } from "@/lib/user-progress-store"

// Get unique categories and count modules in each
const categories = modulesList.reduce(
  (acc, module) => {
    const category = module.category
    if (!acc[category]) {
      acc[category] = {
        name: category,
        count: 0,
        image: module.image, // Use the first module's image as category image
        description: getCategoryDescription(category),
        humorousTagline: getCategoryHumor(category),
      }
    }
    acc[category].count++
    return acc
  },
  {} as Record<string, { name: string; count: number; image: string; description: string; humorousTagline: string }>,
)

// Convert to array for easier rendering
const categoriesArray = Object.values(categories).sort((a, b) => a.name.localeCompare(b.name))

// Helper function to get category descriptions
function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    leadership: "Develop essential leadership skills to inspire and guide teams effectively.",
    strategy: "Master strategic thinking and planning to drive organizational success.",
    operations: "Optimize processes and resources to improve efficiency and deliver value.",
    hr: "Build effective systems to manage people and enhance workplace performance.",
    finance: "Understand financial aspects of business to make informed decisions.",
    marketing: "Create and execute marketing strategies that drive growth and engagement.",
    productivity: "Boost personal and team productivity using structured techniques.",
    innovation: "Foster innovation and manage the lifecycle of successful products.",
    technology: "Leverage digital technologies to transform business operations.",
  }

  return descriptions[category] || `Explore modules related to ${category}.`
}

// Helper function to get humorous taglines for categories
function getCategoryHumor(category: string): string {
  const humorousTaglines: Record<string, string> = {
    leadership: "Because someone has to pretend they know where we're going!",
    strategy: "Like chess, but with more PowerPoint and less quiet contemplation.",
    operations: "Making things work so smoothly that nobody notices until you take a day off.",
    hr: "We're not just here for the awkward conversations and paperwork... but mostly, yes.",
    finance: "Where 'creative accounting' is frowned upon, but creative explanations of accounting are essential.",
    marketing: "The art of convincing people they need things they didn't know existed.",
    productivity:
      "Accomplishing more in less time, so you can spend the saved time in more meetings about productivity.",
    innovation: "Where 'thinking outside the box' usually means building a slightly different box.",
    technology: "Turning it off and on again since the dawn of computing.",
  }

  return humorousTaglines[category] || "Because learning should be fun, even when the topic isn't!"
}

export default function CategoriesPage() {
  const { modules: userModules } = useUserProgress()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter categories based on search
  const filteredCategories = categoriesArray.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.humorousTagline.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get modules for selected category with user progress
  const categoryModules = selectedCategory
    ? modulesList
        .filter((module) => module.category === selectedCategory)
        .map((module) => ({
          ...module,
          progress: userModules[module.id]?.progress || 0,
          status: userModules[module.id]?.status || "not-started",
        }))
    : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Module Categories</h1>
        <p className="text-muted-foreground">Browse our management training modules by category</p>
        <p className="text-sm italic text-muted-foreground mt-1">
          Learning management skills: because herding cats requires a strategy.
        </p>
      </div>

      {!selectedCategory ? (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No categories found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search criteria. Or maybe the category is taking a coffee break?
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => (
                <Card key={category.name} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={
                        category.image ||
                        `/placeholder.svg?height=400&width=600&query=${category.name || "/placeholder.svg"} management concept`
                      }
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <Badge className="px-2 py-1 capitalize">{category.name}</Badge>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <span className="text-xs font-medium">{category.count}</span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-1 text-xl capitalize">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{category.description}</p>
                    <p className="mt-2 text-xs italic text-muted-foreground">{category.humorousTagline}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full gap-1" onClick={() => setSelectedCategory(category.name)}>
                      Browse {category.count} Modules
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)}>
              All Categories
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Badge className="capitalize">{selectedCategory}</Badge>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold capitalize mb-2">{selectedCategory} Modules</h2>
            <p className="text-muted-foreground">{getCategoryDescription(selectedCategory)}</p>
            <p className="text-sm italic text-muted-foreground mt-1">{getCategoryHumor(selectedCategory)}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ModuleCard({ module }: { module: any }) {
  // Add some humorous module status descriptions
  const getStatusHumor = (status: string, progress: number) => {
    if (status === "completed") return "Nailed it! 🏆"
    if (status === "in-progress" && progress > 50) return "Almost there! Just a few more coffee breaks to go."
    if (status === "in-progress") return "The journey of a thousand miles begins with... this module."
    return "Waiting for you to start. No pressure. (Okay, maybe a little pressure.)"
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={module.image || "/placeholder.svg?height=300&width=600&query=management course"}
          alt={module.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant={module.status === "completed" ? "secondary" : "default"} className="px-2 py-1 capitalize">
            {module.status === "completed" ? (
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Completed
              </span>
            ) : (
              module.category
            )}
          </Badge>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <span className="text-xs font-medium">{module.progress || 0}%</span>
          </div>
        </div>
        <CardTitle className="line-clamp-1 text-xl">{module.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground">{module.description}</p>
        <Progress value={module.progress || 0} className="mt-4 h-1" />
        <p className="mt-2 text-xs italic text-muted-foreground">
          {getStatusHumor(module.status || "not-started", module.progress || 0)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full gap-1">
          <Link href={`/modules/${module.id}/overview`}>
            {(module.progress || 0) > 0 && (module.progress || 0) < 100
              ? "Continue the Adventure"
              : "Start the Journey"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
