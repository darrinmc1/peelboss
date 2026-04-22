"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { modules } from "@/data/modules"
import { useUserProgress } from "@/lib/user-progress-store"

export default function ChapterPage() {
  const router = useRouter()
  const params = useParams()
  const moduleId = params.moduleId as string
  const chapterId = params.chapterId as string

  const { updateModuleProgress, modules: userModules } = useUserProgress()

  const selectedModule = modules[moduleId]
  const chapterIndex = selectedModule?.chapters.findIndex((c) => c.id === chapterId) || -1
  const chapter = selectedModule?.chapters[chapterIndex]
  const nextChapter = selectedModule?.chapters[chapterIndex + 1]
  const prevChapter = selectedModule?.chapters[chapterIndex - 1]

  const chapterProgress = chapterIndex !== -1 ? ((chapterIndex + 1) / selectedModule.chapters.length) * 100 : 0
  const moduleProgress = userModules[moduleId]?.progress || 0

  useEffect(() => {
    if (chapterIndex !== -1 && moduleProgress < chapterProgress) {
      updateModuleProgress(moduleId, chapterProgress)
    }
  }, [moduleId, chapterProgress, updateModuleProgress, chapterIndex, moduleProgress])

  useEffect(() => {
    if (!selectedModule || chapterIndex === -1) {
      router.push(selectedModule ? `/modules/${moduleId}/overview` : "/modules")
    }
  }, [selectedModule, chapterIndex, moduleId, router])

  if (!selectedModule || chapterIndex === -1) {
    return null
  }

  return (
    <div className="container max-w-4xl py-6 space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href={`/modules/${moduleId}/overview`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Module Overview
          </Link>
          <h1 className="text-2xl font-bold">{chapter.title}</h1>
          <p className="text-muted-foreground">{chapter.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Chapter {chapterIndex + 1} of {selectedModule.chapters.length}
          </span>
          <Progress value={moduleProgress} className="w-24 h-2" />
        </div>
      </div>

      <Card className="p-6">
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <h2>Chapter Content</h2>
          <p>
            This is where the actual content for "{chapter.title}" would be displayed. In a real application, this would
            include text, images, videos, and interactive elements related to the chapter topic.
          </p>

          <h3>Key Concepts</h3>
          <ul>
            <li>Important concept 1 related to {chapter.title}</li>
            <li>Important concept 2 related to {chapter.title}</li>
            <li>Important concept 3 related to {chapter.title}</li>
            <li>Important concept 4 related to {chapter.title}</li>
          </ul>

          <h3>Practical Application</h3>
          <p>Here's how you can apply the concepts from this chapter in real-world scenarios:</p>
          <ol>
            <li>Application example 1</li>
            <li>Application example 2</li>
            <li>Application example 3</li>
          </ol>

          <h3>Summary</h3>
          <p>
            In this chapter, we covered the key aspects of {chapter.title}. Remember that these concepts build upon each
            other throughout the module, so make sure you understand these fundamentals before moving on.
          </p>
        </div>
      </Card>

      <div className="flex justify-between">
        {prevChapter ? (
          <Button variant="outline" asChild>
            <Link href={`/modules/${moduleId}/chapters/${prevChapter.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: {prevChapter.title}
            </Link>
          </Button>
        ) : (
          <div></div>
        )}

        {nextChapter ? (
          <Button asChild>
            <Link href={`/modules/${moduleId}/chapters/${nextChapter.id}`}>
              Next: {nextChapter.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href={`/modules/${moduleId}/complete`}>
              Complete Module
              <CheckCircle className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
