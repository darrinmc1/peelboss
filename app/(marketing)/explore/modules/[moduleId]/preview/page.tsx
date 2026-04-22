import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  Star,
  Target,
  Users,
  Coffee,
  ArrowRight,
  Lock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { modules } from "@/data/modules"

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

export default async function ModulePreviewPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params
  const selectedModule = modules[moduleId]

  if (!selectedModule) {
    return notFound()
  }

  // Calculate average rating
  const averageRating = 0 // Set to 0 since we removed reviews

  // Get a humorous enrollment message
  const getEnrollmentMessage = () => {
    return "Be the first to enroll in this course!"
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900 to-indigo-800">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={selectedModule.image || "/placeholder.svg"}
            alt={selectedModule.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative grid gap-4 p-6 text-white md:grid-cols-2 md:p-8 lg:p-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <Badge className="bg-white/20 text-white hover:bg-white/30">{selectedModule.category}</Badge>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{selectedModule.title}</h1>
              <p className="text-lg text-white/80">{selectedModule.description}</p>
              <p className="text-sm italic text-white/70">{getCategoryHumor(selectedModule.category)}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{selectedModule.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span>{selectedModule.chapters.length} chapters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" />
                <span>{selectedModule.level}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span title={getEnrollmentMessage()}>{selectedModule.enrollmentCount.toLocaleString()} enrolled</span>
              </div>
              {averageRating > 0 && (
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-white/30"}`}
                      />
                    ))}
                  </div>
                  <span>({selectedModule.reviews?.length || 0})</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start justify-end gap-4 md:items-end">
            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/signup">
                  <BookOpen className="h-4 w-4" />
                  Enroll Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
                Save for Later
              </Button>
            </div>
            <div className="text-sm text-white/70">
              Last updated: {new Date(selectedModule.lastUpdated).toLocaleDateString()} (We keep it fresh!)
            </div>
          </div>
        </div>
      </div>

      {/* Preview Banner */}
      <div className="bg-muted/50 border rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Module Preview</h3>
            <p className="text-sm text-muted-foreground">
              You are viewing a preview of this module. Sign up to access the full content.
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

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">About This Module</h2>
                <p className="text-muted-foreground">{selectedModule.longDescription}</p>
                <p className="text-sm italic text-muted-foreground">
                  Warning: Side effects may include spontaneous use of management jargon in casual conversation.
                </p>
              </div>

              {selectedModule.learningOutcomes && selectedModule.learningOutcomes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Learning Outcomes
                  </h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {selectedModule.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedModule.prerequisites && selectedModule.prerequisites.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Prerequisites
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedModule.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                    <li className="italic text-muted-foreground">
                      A sense of humor (highly recommended but not required)
                    </li>
                    <li className="italic text-muted-foreground">
                      <Coffee className="inline h-4 w-4 mr-1" /> Coffee or tea (quantities vary by module difficulty)
                    </li>
                  </ul>
                </div>
              )}
            </TabsContent>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Module Curriculum</h2>
                <p className="text-muted-foreground">
                  This module contains {selectedModule.chapters.length} chapters with a total duration of {selectedModule.duration}.
                </p>
                <p className="text-sm italic text-muted-foreground">
                  That's approximately {Math.round(Number.parseInt(selectedModule.duration) / 2)} cups of coffee worth of
                  content.
                </p>
              </div>

              <div className="space-y-4">
                {selectedModule.chapters.map((chapter, index) => (
                  <Card key={chapter.id} className={index > 0 ? "opacity-80" : ""}>
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {index + 1}. {chapter.title}
                            {index > 0 && <Lock className="h-4 w-4 text-muted-foreground" />}
                          </CardTitle>
                          <CardDescription>{chapter.description}</CardDescription>
                          {index === 0 && (
                            <p className="text-xs italic text-muted-foreground mt-1">
                              First chapter available as preview. Sign up to unlock all content!
                            </p>
                          )}
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {chapter.duration}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="bg-muted/30 rounded-lg p-4 border border-dashed">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Full Curriculum Locked</h3>
                    <p className="text-sm text-muted-foreground">
                        Sign up to access all {selectedModule.chapters.length} chapters and start learning today.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Instructor Tab */}
            <TabsContent value="instructor" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Meet Your Instructor</h2>
                <p className="text-sm italic text-muted-foreground">
                  Warning: May occasionally use dad jokes to explain complex concepts.
                </p>
              </div>

              {selectedModule.instructor && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={selectedModule.instructor.avatar || "/placeholder.svg"}
                          alt={selectedModule.instructor.name}
                        />
                        <AvatarFallback>
                          {selectedModule.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{selectedModule.instructor.name}</h3>
                        <p className="text-primary">{selectedModule.instructor.role}</p>
                        <p className="text-muted-foreground">{selectedModule.instructor.bio}</p>
                        <p className="text-sm italic text-muted-foreground">
                          Fun fact: {selectedModule.instructor.name.split(" ")[0]} once explained {selectedModule.category} using only
                          emojis. It was confusing but strangely effective.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Student Reviews</h2>
                  {selectedModule.reviews && selectedModule.reviews.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({selectedModule.reviews.length} reviews)</span>
                    </div>
                  )}
                </div>
                <p className="text-sm italic text-muted-foreground">
                  Real reviews from real people who may or may not have been bribed with coffee.
                </p>
              </div>

              {selectedModule.reviews && selectedModule.reviews.length > 0 ? (
                <div className="space-y-4">
                  {selectedModule.reviews.slice(0, 2).map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{review.user[0]}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{review.user}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {selectedModule.reviews.length > 2 && (
                    <div className="bg-muted/30 rounded-lg p-4 border border-dashed text-center">
                      <p className="text-muted-foreground">
                        {selectedModule.reviews.length - 2} more reviews available. Sign up to see them all.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Star className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No reviews yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Be the first to review this module. No pressure, but everyone's waiting.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Module Stats Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Module Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{selectedModule.duration}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Level</p>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="font-medium">{selectedModule.level}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Chapters</p>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="font-medium">{selectedModule.chapters.length}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="font-medium capitalize">{selectedModule.category}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Added</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">{new Date(selectedModule.dateAdded).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Students</p>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium">{selectedModule.enrollmentCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <Button className="w-full gap-2" size="lg" asChild>
                <Link href="/signup">
                  <BookOpen className="h-4 w-4" />
                  Enroll Now
                </Link>
              </Button>

              <p className="text-xs text-center italic text-muted-foreground">
                Click above to embark on your journey to {selectedModule.category} greatness!
              </p>
            </CardContent>
          </Card>

          {/* What You'll Get */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>What You'll Get</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Full access to all chapters and materials",
                  "Practical exercises and case studies",
                  "Downloadable resources and templates",
                  "Self-paced learning experience",
                  "Certificate upon completion",
                  "Access to discussion forums",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Sample Content Preview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Free Preview Content</CardTitle>
              <CardDescription>Sample what you'll learn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border overflow-hidden">
                <div className="bg-muted/50 p-3 flex items-center justify-between border-b">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Introduction</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    5 min
                  </Badge>
                </div>
                <div className="p-3">
                  <p className="text-sm text-muted-foreground">
                    A brief overview of {selectedModule.title} and why it matters for your career development.
                  </p>
                  <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                    <Link href="/signup">
                      Watch preview
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-md border overflow-hidden">
                <div className="bg-muted/50 p-3 flex items-center justify-between border-b">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Key Concepts</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Free PDF
                  </Badge>
                </div>
                <div className="p-3">
                  <p className="text-sm text-muted-foreground">
                    Download a free PDF outlining the core concepts covered in this module.
                  </p>
                  <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                    <Link href="/signup">
                      Download PDF
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Info */}
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Earn a Certificate</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete this module to earn a certificate of completion
                  </p>
                  <p className="text-xs italic text-muted-foreground mt-1">
                    Perfect for impressing colleagues or decorating your digital wall!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
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
