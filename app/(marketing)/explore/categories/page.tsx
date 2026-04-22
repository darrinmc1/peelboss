import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { modulesList } from "@/data/modules"

export default function CategoriesPage() {
  // Get unique categories and count modules in each
  const categories = modulesList.reduce(
    (acc, module) => {
      const category = module.category.toLowerCase()
      if (!acc[category]) {
        acc[category] = {
          name: module.category,
          count: 0,
          image: module.image || "/placeholder.svg",
        }
      }
      acc[category].count++
      return acc
    },
    {} as Record<string, { name: string; count: number; image: string }>,
  )

  // Convert to array for rendering
  const categoriesArray = Object.values(categories)

  // Get a humorous description for each category
  const getCategoryDescription = (category: string) => {
    const descriptions: Record<string, string> = {
      leadership: "Learn how to lead teams without accidentally starting a rebellion.",
      strategy: "Master the art of planning for success while preparing for chaos.",
      operations: "Discover how to keep the gears turning when everyone else is panicking.",
      hr: "Navigate the delicate balance of being everyone's friend and enforcing company policy.",
      finance: "Understand numbers well enough to explain why the budget needs to be bigger.",
      marketing: "Create campaigns that make people want things they didn't know they needed.",
      productivity: "Work smarter, not harder (but also sometimes harder).",
      innovation: "Think outside the box, then build a better box.",
      technology: "Master the tools that run the world (or at least your office).",
    }

    return (
      descriptions[category.toLowerCase()] || "Expand your knowledge and skills in this essential area of management."
    )
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <Badge className="mx-auto">Explore</Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Management Categories</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse our comprehensive collection of management topics, organized by category.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoriesArray.map((category) => (
          <Card key={category.name} className="overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <Badge className="bg-white/90 text-black hover:bg-white">{category.name}</Badge>
              </div>
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-xl capitalize">{category.name}</CardTitle>
              <CardDescription>{getCategoryDescription(category.name)}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{category.count} modules</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{Math.floor(Math.random() * 5000) + 1000} students</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" asChild>
                <Link href={`/explore/categories/${category.name.toLowerCase()}`}>
                  Browse {category.name} Modules
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Sign up today to access all our modules across every management category.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/signup">
            Create Your Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
