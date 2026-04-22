"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentEditor } from "@/components/admin/content-editor"
import { QuizBuilder } from "@/components/admin/quiz-builder"
import { VideoUploader } from "@/components/admin/video-uploader"
import { ExerciseBuilder } from "@/components/admin/exercise-builder"

// Mock data for modules
const modules = [
  {
    id: "leadership-styles",
    title: "Leadership and Management Styles",
  },
  {
    id: "strategic-management",
    title: "Strategic Management",
  },
  {
    id: "project-management",
    title: "Project Management",
  },
  {
    id: "change-management",
    title: "Change Management",
  },
]

export default function NewContent() {
  const router = useRouter()
  const [contentType, setContentType] = useState("chapter")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to content list
    router.push("/admin/content")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Content</h1>
        <p className="text-muted-foreground">Create new learning content for your modules</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Information</CardTitle>
              <CardDescription>Basic information about the content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter content title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select defaultValue={contentType} onValueChange={setContentType}>
                    <SelectTrigger id="content-type">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chapter">Chapter</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="exercise">Exercise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="module">Module</Label>
                  <Select defaultValue="leadership-styles">
                    <SelectTrigger id="module">
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((module) => (
                        <SelectItem key={module.id} value={module.id}>
                          {module.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter a brief description of this content" rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription>Add the specific content based on type</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={contentType} onValueChange={setContentType}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="chapter">Chapter</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="exercise">Exercise</TabsTrigger>
                </TabsList>
                <TabsContent value="chapter" className="mt-6">
                  <ContentEditor />
                </TabsContent>
                <TabsContent value="quiz" className="mt-6">
                  <QuizBuilder />
                </TabsContent>
                <TabsContent value="video" className="mt-6">
                  <VideoUploader />
                </TabsContent>
                <TabsContent value="exercise" className="mt-6">
                  <ExerciseBuilder />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Content"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
