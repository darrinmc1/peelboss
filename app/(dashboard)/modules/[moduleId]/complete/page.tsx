"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Award, CheckCircle, Download, Home, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { modules } from "@/data/modules"
import { useUserProgress } from "@/lib/user-progress-store"

export default function ModuleCompletePage() {
  const router = useRouter()
  const params = useParams()
  const moduleId = params.moduleId as string

  const { completeModule, modules: userModules } = useUserProgress()

  const selectedModule = modules[moduleId]
  const completionDate = userModules[moduleId]?.lastAccessed
    ? new Date(userModules[moduleId].lastAccessed).toLocaleDateString()
    : new Date().toLocaleDateString()

  useEffect(() => {
    if (selectedModule) {
      completeModule(moduleId)
    } else {
      router.push("/modules")
    }
  }, [moduleId, completeModule, selectedModule, router])

  if (!selectedModule) {
    return null
  }

  return (
    <div className="container max-w-3xl py-12">
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Award className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Congratulations!</h1>
        <p className="text-xl text-muted-foreground">
          You've successfully completed the <span className="font-medium">{selectedModule.title}</span> module
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle>Certificate of Completion</CardTitle>
          <CardDescription>Your achievement has been recorded</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="w-full max-w-md aspect-[1.4/1] border rounded-lg flex flex-col items-center justify-center p-6 bg-muted/30">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Award className="h-16 w-16 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Certificate of Completion</h2>
              <p className="text-muted-foreground">This certifies that</p>
              <p className="text-xl font-medium">Your Name</p>
              <p className="text-muted-foreground">has successfully completed</p>
              <p className="text-lg font-medium">{selectedModule.title}</p>
              <p className="text-sm text-muted-foreground">Completed on {completionDate}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Certificate
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share Achievement
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
          <CardDescription>Continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {selectedModule.relatedModules &&
              selectedModule.relatedModules.slice(0, 2).map((relatedId) => {
                const relatedModule = modules[relatedId]
                if (!relatedModule) return null

                return (
                  <Card key={relatedId} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={relatedModule.image || "/placeholder.svg?height=200&width=400&query=management course"}
                        alt={relatedModule.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{relatedModule.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">{relatedModule.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button asChild className="w-full">
                        <Link href={`/modules/${relatedModule.id}/overview`}>Start Module</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href={`/modules/${moduleId}/overview`}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Review Module
            </Link>
          </Button>
          <Button asChild>
            <Link href="/modules">
              <Home className="mr-2 h-4 w-4" />
              Browse All Modules
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
