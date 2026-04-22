// Content types for the admin interface

export type ContentBase = {
  id: string
  title: string
  description?: string
  moduleId: string
  status: "draft" | "published" | "archived"
  createdAt: string
  updatedAt: string
  createdBy: string
}

export type ChapterContent = ContentBase & {
  type: "chapter"
  content: string // Markdown content
  keyTakeaways: string[]
  videoUrl?: string
  videoDuration?: number
}

export type QuizContent = ContentBase & {
  type: "quiz"
  questions: {
    id: string
    question: string
    options: {
      id: string
      text: string
      isCorrect: boolean
    }[]
    explanation: string
    points: number
  }[]
  passingScore: number
}

export type VideoContent = ContentBase & {
  type: "video"
  videoUrl: string
  videoDuration: number
  transcript?: string
  thumbnailUrl?: string
}

export type ExerciseContent = ContentBase & {
  type: "exercise"
  objective: string
  estimatedTime: number
  steps: {
    id: string
    title: string
    instructions: string
    type: "text" | "multiple-choice" | "file-upload" | "code"
    options?: string[] // For multiple choice
  }[]
  completionCriteria: string
}

export type Content = ChapterContent | QuizContent | VideoContent | ExerciseContent
