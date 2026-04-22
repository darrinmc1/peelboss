import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, BookOpen, Clock, GraduationCap, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { modulesList } from "@/data/modules"

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params

  // Filter modules by category
  const categoryModules = modulesList.filter((module) => module.category.toLowerCase() === category.toLowerCase())

  if (categoryModules.length === 0) {
    return notFound()
  }

  // Format category name for display
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  // Get a humorous tagline for the category
  const getCategoryTagline = (category: string) => {
    const taglines: Record<string, string> = {
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

    return taglines[category.toLowerCase()] || "Because learning should be fun, even when the topic isn't!"
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900 to-indigo-800 p-8 md:p-10">
        <div className="relative space-y-4 text-white">
          <Badge className="bg-white/20 text-white hover:bg-white/30">Category</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{formattedCategory} Modules</h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Explore our collection of {categoryModules.length} modules on {formattedCategory.toLowerCase()}.
          </p>
          <p className="text-sm italic text-white/70">{getCategoryTagline(category)}</p>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available Modules</h2>
          <p className="text-muted-foreground">Showing {categoryModules.length} modules</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryModules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={module.image || "/placeholder.svg"}
                  alt={module.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <Badge className="px-2 py-1 capitalize">{module.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{module.duration}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-1 text-xl">{module.title}</CardTitle>
                <CardDescription className="line-clamp-2">{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{module.chapters.length} chapters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{module.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{module.enrollmentCount.toLocaleString()} enrolled</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex w-full gap-2">
                  <Button className="flex-1" variant="outline" asChild>
                    <Link href={`/explore/modules/${module.id}`}>View Details</Link>
                  </Button>
                  <Button className="flex-1" variant="default" asChild>
                    <Link href="/signup">Enroll</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Master {formattedCategory}?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Sign up today to access all our {formattedCategory.toLowerCase()} modules and start your learning journey.
        </p>
        <Button size="lg" asChild>
          <Link href="/signup">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
