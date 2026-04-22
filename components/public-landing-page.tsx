"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, CheckCircle, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { modulesList } from "@/data/modules"

// Group modules by category
const modulesByCategory = modulesList.reduce(
  (acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = []
    }
    acc[module.category].push(module)
    return acc
  },
  {} as Record<string, typeof modulesList>,
)

// Get categories
const categories = Object.keys(modulesByCategory)

export function PublicLandingPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
              <Badge className="w-fit">Management Education Platform</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Master Management Skills with <span className="text-primary">Peel Boss</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive courses designed for modern professionals. Learn at your own pace and advance your career.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#explore">Explore Courses</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>20+ Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Expert Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Certificates</span>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative h-[350px] w-full overflow-hidden rounded-lg border bg-background shadow-xl sm:h-[400px]">
                <Image
                  src="/diverse-group-leadership.png"
                  alt="Management training session"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-lg bg-background/90 p-4 backdrop-blur">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Star className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Trusted by 10,000+ Professionals</h3>
                        <p className="text-sm text-muted-foreground">Join our community of learners today</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories Section */}
      <section id="explore" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-4">Our Curriculum</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Management Topics</h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              Browse our comprehensive collection of management topics, from leadership and strategy to operations and
              finance.
            </p>
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link href="/explore/categories">
                  View All Categories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="mb-8 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {modulesByCategory[category].slice(0, 6).map((module) => (
                    <Card key={module.id} className="overflow-hidden">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={module.image || "/placeholder.svg"}
                          alt={module.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <Badge className="px-2 py-1 capitalize">{module.category}</Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <BookOpen className="h-3 w-3" />
                            <span>{module.duration}</span>
                          </div>
                        </div>
                        <CardTitle className="line-clamp-1 text-xl">{module.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                      </CardHeader>
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
                {modulesByCategory[category].length > 6 && (
                  <div className="mt-8 text-center">
                    <Button variant="outline" asChild>
                      <Link href={`/explore/categories/${category}`}>
                        View All {category.charAt(0).toUpperCase() + category.slice(1)} Modules
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Badge className="mb-4">Platform Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Peel Boss</h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              Our platform combines expert content, interactive learning, and practical tools to help you develop
              essential management skills.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Expert-Led Content",
                description: "Learn from industry veterans with decades of management experience.",
                icon: BookOpen,
              },
              {
                title: "Interactive Learning",
                description: "Engage with quizzes, case studies, and practical exercises that reinforce concepts.",
                icon: CheckCircle,
              },
              {
                title: "Certification",
                description: "Earn certificates upon completion to showcase your new skills.",
                icon: Shield,
              },
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Management Skills?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Join thousands of professionals who are already enhancing their careers with our comprehensive management
              training platform.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Access Section (only visible to admins) */}
      <section className="py-8 bg-yellow-50 border-t border-yellow-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-600" />
              <p className="text-yellow-800 font-medium">Admin Preview Mode</p>
            </div>
            <Button
              variant="outline"
              className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
              asChild
            >
              <Link href="/admin">
                Access Admin Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
