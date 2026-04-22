"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Award, BookOpen, CheckCircle, Clock, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { modulesList } from "@/data/modules"
import { useRouter } from "next/navigation"

// Get a few featured modules for the homepage
const featuredModules = modulesList.slice(0, 3)

// Get unique categories for the category section
const categories = [...new Set(modulesList.map((module) => module.category))].slice(0, 6)

export default function HomePage() {
  const router = useRouter()

  // Create a function to handle navigation with scroll reset
  const handleNavigation = (href: string) => {
    // Navigate to the page
    router.push(href)
    // Scroll to top
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <Badge className="w-fit">Management Education Platform</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Elevate Your <span className="text-primary">Management Skills</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Learn essential management skills with interactive courses designed for modern leaders. From leadership
                fundamentals to advanced strategies, we've got you covered.
              </p>
              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link
                    href="/signup"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/signup")
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("#features")
                    }}
                  >
                    Learn More
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="inline-block h-8 w-8 overflow-hidden rounded-full border-2 border-background"
                    >
                      <img
                        src={`/generic-avatar-icon.png?key=avatar${i}`}
                        alt={`User ${i}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Join <span className="font-medium text-foreground">our community</span> of professionals learning
                  together
                </p>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative h-[350px] w-full overflow-hidden rounded-lg border bg-background shadow-xl sm:h-[400px] md:h-[500px]">
                <img
                  src="/diverse-group-leadership.png"
                  alt="Management training session"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-lg bg-background/90 p-4 backdrop-blur">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Start Learning Today</h3>
                        <p className="text-sm text-muted-foreground">20+ courses designed by industry experts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating stats cards */}
              <div className="absolute -right-4 top-10 hidden w-48 rounded-lg border bg-background p-3 shadow-lg md:block">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Growing Community</p>
                    <p className="text-xs text-muted-foreground">Learning together</p>
                  </div>
                </div>
              </div>
              <div className="absolute -left-4 bottom-10 hidden w-48 rounded-lg border bg-background p-3 shadow-lg md:block">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">20+ Modules</p>
                    <p className="text-xs text-muted-foreground">Comprehensive curriculum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4">Platform Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Become a Better{" "}
              <span className="inline-block relative">
                <RotatingText terms={["Manager", "Leader", "Champion", "Coach", "Mentor", "Innovator", "Strategist"]} />
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our platform combines expert content, interactive learning, and practical tools to help you develop
              essential management skills.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Expert-Led Modules",
                description: "Learn from industry veterans with decades of management experience.",
                icon: BookOpen,
              },
              {
                title: "Interactive Learning",
                description: "Engage with quizzes, case studies, and practical exercises that reinforce concepts.",
                icon: Zap,
              },
              {
                title: "Progress Tracking",
                description: "Monitor your learning journey with detailed progress analytics.",
                icon: Clock,
              },
              {
                title: "Certification",
                description: "Earn certificates upon completion to showcase your new skills.",
                icon: Award,
              },
              {
                title: "Flexible Learning",
                description: "Learn at your own pace, anytime and anywhere that suits your schedule.",
                icon: Users,
              },
              {
                title: "Practical Application",
                description: "Apply what you learn immediately with real-world scenarios and templates.",
                icon: CheckCircle,
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

      {/* Featured Modules Section */}
      <section id="modules" className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4">Featured Modules</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Popular Management Courses</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our most popular modules and start your learning journey today. Each module is designed to provide
              practical skills you can apply immediately.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredModules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={module.image || "/placeholder.svg"}
                    alt={module.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
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
                <CardContent className="p-4 pt-0">
                  <Button className="w-full" variant="outline" asChild>
                    <Link
                      href={`/modules/${module.id}/preview`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation(`/modules/${module.id}/preview`)
                      }}
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="mt-2 text-xs text-center text-muted-foreground">
                    Explore what you'll learn before enrolling
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link
                href="/signup"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/signup")
                }}
              >
                View All Modules
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4">Categories</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Management Topics</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse our comprehensive collection of management topics, from leadership and strategy to operations and
              finance.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((category, index) => {
              // Get a humorous tagline for each category
              const getTagline = (category: string) => {
                const taglines: Record<string, string> = {
                  leadership: "Because someone has to pretend they know where we're going!",
                  strategy: "Like chess, but with more PowerPoint and less quiet contemplation.",
                  operations: "Making things work so smoothly that nobody notices until you take a day off.",
                  hr: "We're not just here for the awkward conversations and paperwork... but mostly, yes.",
                  finance:
                    "Where 'creative accounting' is frowned upon, but creative explanations of accounting are essential.",
                  marketing: "The art of convincing people they need things they didn't know existed.",
                  productivity:
                    "Accomplishing more in less time, so you can spend the saved time in more meetings about productivity.",
                  innovation: "Where 'thinking outside the box' usually means building a slightly different box.",
                  technology: "Turning it off and on again since the dawn of computing.",
                }
                return taglines[category] || "Because learning should be fun, even when the topic isn't!"
              }

              return (
                <Link
                  key={index}
                  href={`/categories/${category}/preview`}
                  className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation(`/categories/${category}/preview`)
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold capitalize">{category}</h3>
                    <p className="text-sm text-muted-foreground">{getTagline(category)}</p>
                  </div>
                  <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4">Pricing</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that's right for you and start your management journey today. All plans include access to
              our core features.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  $0<span className="ml-1 text-xl font-medium text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-4 text-base">
                  Perfect for individuals just starting their management journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Access to 5 basic modules",
                    "Progress tracking",
                    "Basic assessments",
                    "Community forum access",
                    "Email support",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full" variant="outline" asChild>
                  <Link
                    href="/signup"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/signup")
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-none shadow-xl">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  $29<span className="ml-1 text-xl font-medium text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-4 text-base">
                  Ideal for professionals looking to advance their management skills.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Access to all 20+ modules",
                    "Advanced progress analytics",
                    "Interactive assessments",
                    "Community forum access",
                    "Priority email support",
                    "Downloadable resources",
                    "Certificates of completion",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full" asChild>
                  <Link
                    href="/signup"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/signup")
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  $99<span className="ml-1 text-xl font-medium text-muted-foreground">/month</span>
                </div>
                <CardDescription className="mt-4 text-base">
                  For organizations looking to train multiple managers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Everything in Professional",
                    "Team management dashboard",
                    "Custom learning paths",
                    "Team progress reports",
                    "Dedicated account manager",
                    "Phone & email support",
                    "Custom module development",
                    "Bulk user management",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full" variant="outline" asChild>
                  <Link
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/contact")
                    }}
                  >
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Transform Your Management Skills?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Join thousands of professionals who are already enhancing their careers with our comprehensive management
              training platform.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link
                  href="/signup"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("/signup")
                  }}
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("#features")
                  }}
                >
                  Learn More
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/70">
              No credit card required for free plan. Cancel anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function RotatingText({ terms }: { terms: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % terms.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [terms.length])

  return (
    <span className="text-primary">
      {terms.map((term, index) => (
        <span
          key={term}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {term}
        </span>
      ))}
      {/* Invisible text to maintain spacing */}
      <span className="invisible">{terms[0]}</span>
    </span>
  )
}
