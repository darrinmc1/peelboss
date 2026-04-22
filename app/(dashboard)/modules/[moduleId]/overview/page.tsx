import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  Info,
  ListChecks,
  Target,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { modules } from "@/data/modules"
import { BookmarkButton } from "@/components/bookmark-button"

export default async function ModuleOverviewPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params
  const selectedModule = modules[moduleId]

  if (!selectedModule) {
    return notFound()
  }

  const learningTip =
    "Pro tip: Coffee consumption and learning retention have a direct correlation. Science!"

  // Get a humorous module difficulty description
  const getDifficultyHumor = (level: string) => {
    const humor = {
      Beginner: "Perfect for those who think 'KPI' is a type of coffee.",
      Intermediate: "You should know what ROI means (not just 'Return On Ignoring' emails).",
      Advanced: "Caution: May cause spontaneous use of business jargon in casual conversation.",
    }
    return humor[level as keyof typeof humor] || "Difficulty level: Requires a functioning brain."
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="capitalize">{selectedModule.category}</Badge>
            <Badge variant="outline">{selectedModule.level}</Badge>
            <BookmarkButton itemId={selectedModule.id} itemType="module" />
          </div>
          <h1 className="mt-2 text-3xl font-bold">{selectedModule.title}</h1>
          <p className="mt-1 text-muted-foreground">{selectedModule.description}</p>
          <p className="mt-1 text-sm italic text-muted-foreground">{selectedModule.humorousDescription}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
          <Button asChild>
            <Link href={`/modules/${moduleId}/chapters/${selectedModule.chapters[0].id}`}>
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline">Save for Later</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">About This Module</h2>
                <p className="text-muted-foreground">{selectedModule.longDescription}</p>
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Learning Tip</h3>
                      <p className="text-sm text-muted-foreground">{learningTip}</p>
                    </div>
                  </div>
                </div>
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
                    <li className="flex items-start gap-2 text-muted-foreground italic">
                      <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-200" />
                      <span>Ability to use management jargon convincingly at dinner parties</span>
                    </li>
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
                    <li className="italic text-muted-foreground">A sense of humor (highly recommended)</li>
                    <li className="italic text-muted-foreground">
                      Coffee or tea (quantities vary by module difficulty)
                    </li>
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="curriculum" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Module Curriculum</h2>
                <p className="text-muted-foreground">
                  This module contains {selectedModule.chapters.length} chapters with a total duration of {selectedModule.duration}.
                </p>
                <p className="text-sm italic text-muted-foreground">
                  That's approximately {Math.round(selectedModule.durationMinutes / 15)} coffee breaks worth of content.
                </p>
              </div>

              <div className="space-y-4">
                {selectedModule.chapters.map((chapter, index) => (
                  <Card key={chapter.id}>
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">
                            {index + 1}. {chapter.title}
                          </CardTitle>
                          <CardDescription>{chapter.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {chapter.duration}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0">
                      <Button asChild>
                        <Link href={`/modules/${moduleId}/chapters/${chapter.id}`}>
                          {index === 0 ? "Start Chapter" : "View Chapter"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Additional Resources</h2>
                <p className="text-muted-foreground">
                  Enhance your learning with these supplementary materials and tools.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Downloadable Templates</CardTitle>
                    <CardDescription>Practical tools to apply what you have learned</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Strategic Planning Worksheet</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Team Assessment Tool</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>Decision Matrix Template</span>
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground italic">
                        <FileText className="h-4 w-4 text-primary/50" />
                        <span>Excuse Generator for Missed Deadlines</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Recommended Reading</CardTitle>
                    <CardDescription>Deepen your knowledge with these resources</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span>"The Art of Leadership" by John Smith</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span>"Strategic Management in Practice" by Jane Doe</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span>"Team Dynamics and Performance" by David Johnson</span>
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground italic">
                        <BookOpen className="h-4 w-4 text-primary/50" />
                        <span>"How to Look Busy While Doing Nothing" by A. Manager</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Module Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
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
                  <p className="text-sm text-muted-foreground">Updated</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">{new Date(selectedModule.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4 text-primary" />
                        <span className="font-medium">{selectedModule.level}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs italic text-muted-foreground">{getDifficultyHumor(selectedModule.level)}</div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Your Progress</span>
                  <span className="text-sm font-medium">0%</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-xs text-muted-foreground">You have not started this module yet. Ready to begin?</p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" asChild>
                <Link href={`/modules/${moduleId}/chapters/${selectedModule.chapters[0].id}`}>Start Learning</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Certificate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Complete this module to earn a certificate of completion that you can share with your network.
              </p>
              <p className="mt-2 text-xs italic text-muted-foreground">
                Perfect for impressing colleagues or decorating your digital wall of achievements!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-primary" />
                What You'll Learn
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Practical skills you can apply immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Frameworks for effective decision-making</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Strategies to enhance team performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>Tools to navigate complex management challenges</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground italic">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-200" />
                  <span>How to look thoughtful while staring at spreadsheets</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
