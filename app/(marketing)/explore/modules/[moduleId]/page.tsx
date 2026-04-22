import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, BookOpen, Clock, Star, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { modulesList } from "@/data/modules"

export default async function ModuleDetailPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params
  const selectedModule = modulesList.find((m) => m.id === moduleId)

  if (!selectedModule) {
    notFound()
  }

  // Mock data for the module detail page
  const chapters = [
    { id: "1", title: "Introduction to the Topic", duration: "15 min" },
    { id: "2", title: "Core Concepts and Principles", duration: "25 min" },
    { id: "3", title: "Practical Applications", duration: "30 min" },
    { id: "4", title: "Case Studies and Examples", duration: "20 min" },
    { id: "5", title: "Advanced Techniques", duration: "35 min" },
    { id: "6", title: "Summary and Next Steps", duration: "15 min" },
  ]

  const instructors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Management Expert",
      bio: "15+ years of experience in corporate leadership and management consulting.",
      avatar: "/generic-avatar-icon.png",
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      role: "Business Strategist",
      bio: "Author of 'Strategic Management in the Modern Era' and former CEO.",
      avatar: "/generic-avatar-icon.png",
    },
  ]

  const reviews = [
    {
      id: "1",
      name: "Thomas R.",
      rating: 5,
      comment: "This module transformed my approach to management. Highly recommended!",
      date: "2 months ago",
    },
    {
      id: "2",
      name: "Jennifer K.",
      rating: 4,
      comment: "Practical and insightful content that I could apply immediately in my role.",
      date: "3 months ago",
    },
    {
      id: "3",
      name: "Robert M.",
      rating: 5,
      comment: "The case studies were particularly valuable. Great learning experience.",
      date: "1 month ago",
    },
  ]

  return (
    <div className="container py-10">
      <Link
        href="/explore/categories"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Categories
      </Link>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <Badge className="mb-2 capitalize">{selectedModule.category}</Badge>
            <h1 className="text-3xl font-bold tracking-tight">{selectedModule.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{selectedModule.description}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{selectedModule.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{chapters.length} Chapters</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">500+ Enrolled</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-sm">4.8 (120 reviews)</span>
            </div>
          </div>

          <div className="aspect-video overflow-hidden rounded-lg border">
            <Image
              src={selectedModule.image || "/placeholder.svg"}
              alt={selectedModule.title}
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructors">Instructors</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div>
                <h3 className="text-xl font-semibold">About This Module</h3>
                <p className="mt-2">
                  This comprehensive module covers all aspects of {selectedModule.title.toLowerCase()}. You will learn practical
                  skills and theoretical knowledge that you can apply immediately in your professional role.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">What You'll Learn</h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {[
                    "Understand core principles and frameworks",
                    "Apply best practices in real-world scenarios",
                    "Develop strategic thinking and problem-solving skills",
                    "Implement effective management techniques",
                    "Analyze case studies and extract key insights",
                    "Create action plans for your organization",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Prerequisites</h3>
                <p className="mt-2">
                  No specific prerequisites are required for this module. Basic understanding of business concepts is
                  helpful but not mandatory.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">Module Curriculum</h3>
              <div className="space-y-3">
                {chapters.map((chapter, index) => (
                  <div key={chapter.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                          {index + 1}
                        </div>
                        <h4 className="font-medium">{chapter.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{chapter.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="instructors" className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">Meet Your Instructors</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {instructors.map((instructor) => (
                  <Card key={instructor.id}>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <Image
                        src={instructor.avatar || "/placeholder.svg"}
                        alt={instructor.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg">{instructor.name}</CardTitle>
                        <CardDescription>{instructor.role}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{instructor.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Student Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="font-medium">4.8 out of 5</span>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{review.name}</CardTitle>
                        <CardDescription>{review.date}</CardDescription>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Enroll in This Module</CardTitle>
              <CardDescription>Gain access to all content and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-medium">This module includes:</h4>
                <ul className="space-y-2">
                  {[
                    { icon: BookOpen, text: "6 comprehensive chapters" },
                    { icon: Clock, text: "2+ hours of content" },
                    { icon: Users, text: "Access to community discussions" },
                    { icon: Star, text: "Certificate upon completion" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/signup">
                  Enroll Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                By enrolling, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
