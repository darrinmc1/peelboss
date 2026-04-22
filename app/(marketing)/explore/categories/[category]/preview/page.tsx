import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, BookOpen, ChevronRight, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { modulesList } from "@/data/modules"

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

export default async function CategoryPreviewPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params

  // Get modules for this category
  const categoryModules = modulesList.filter((module) => module.category === category)

  if (categoryModules.length === 0) {
    return notFound()
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Category Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link href="/#categories" className="text-sm text-muted-foreground hover:text-foreground">
            Categories
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium capitalize">{category}</span>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg">
          <Badge className="mb-2 capitalize">{category}</Badge>
          <h1 className="text-3xl font-bold mb-2 capitalize">{category} Modules</h1>
          <p className="text-muted-foreground max-w-3xl">{getCategoryDescription(category)}</p>
          <p className="text-sm italic text-muted-foreground mt-2">{getCategoryHumor(category)}</p>
        </div>
      </div>

      {/* Preview Banner */}
      <div className="bg-muted/50 border rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Category Preview</h3>
            <p className="text-sm text-muted-foreground">
              You're viewing a preview of our {category} modules. Sign up to access the full content.
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/signup">
            Sign Up
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Category Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{categoryModules.length}</div>
              <p className="text-sm text-muted-foreground">Total Modules</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold">
                {Math.round(categoryModules.reduce((acc, module) => acc + module.durationMinutes, 0) / 60)}
              </div>
              <p className="text-sm text-muted-foreground">Hours of Content</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-4xl font-bold">
                {categoryModules.reduce((acc, module) => acc + module.enrollmentCount, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Enrollments</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Available Modules</h2>

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
                  <Badge className="px-2 py-1 capitalize">{module.level}</Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{module.duration}</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-1 text-xl">{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-2 text-sm text-muted-foreground">{module.description}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{module.chapters.length} chapters</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" variant="outline" asChild>
                  <Link href={`/modules/${module.id}/preview`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Learn This Category */}
      <Card>
        <CardHeader>
          <CardTitle>Why Learn {category.charAt(0).toUpperCase() + category.slice(1)}?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {getCategoryDescription(category)} Our expert-led modules provide practical skills you can apply immediately
            in your workplace.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Career Benefits</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500/10 p-1 mt-0.5">
                    <svg className="h-2 w-2 fill-green-500" viewBox="0 0 6 6">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                  </div>
                  <span>Enhanced promotion opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500/10 p-1 mt-0.5">
                    <svg className="h-2 w-2 fill-green-500" viewBox="0 0 6 6">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                  </div>
                  <span>Increased confidence in your role</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500/10 p-1 mt-0.5">
                    <svg className="h-2 w-2 fill-green-500" viewBox="0 0 6 6">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                  </div>
                  <span>Valuable skills that transfer across industries</span>
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Learning Approach</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500/10 p-1 mt-0.5">
                    <svg className="h-2 w-2 fill-green-500" viewBox="0 0 6 6">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                  </div>
                  <span>Practical, real-world examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500/10 p-1 mt-0.5">
                    <svg className="h-2 w-2 fill-green-500" viewBox="0 0 6 6">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                  </div>
                  <span>Interactive exercises and assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-green-500/10 p-1 mt-0.5">
                    <svg className="h-2 w-2 fill-green-500" viewBox="0 0 6 6">
                      <circle cx="3" cy="3" r="3" />
                    </svg>
                  </div>
                  <span>Expert instructors with industry experience</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="mt-12 bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Master {category.charAt(0).toUpperCase() + category.slice(1)}?
        </h2>
        <p className="max-w-2xl mx-auto mb-6">
          Join thousands of professionals who are already enhancing their careers with our comprehensive management
          training platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Sign Up Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <Link href="/#features">Learn More About Platform</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
