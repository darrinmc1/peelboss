"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react"

type QuizQuestion = {
  id: string
  question: string
  options: {
    id: string
    text: string
    isCorrect: boolean
  }[]
  explanation: string
  points: number
}

export function QuizBuilder() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: "q1",
      question: "",
      options: [
        { id: "o1", text: "", isCorrect: false },
        { id: "o2", text: "", isCorrect: false },
        { id: "o3", text: "", isCorrect: false },
        { id: "o4", text: "", isCorrect: false },
      ],
      explanation: "",
      points: 10,
    },
  ])

  const addQuestion = () => {
    const newId = `q${questions.length + 1}`
    setQuestions([
      ...questions,
      {
        id: newId,
        question: "",
        options: [
          { id: `${newId}-o1`, text: "", isCorrect: false },
          { id: `${newId}-o2`, text: "", isCorrect: false },
          { id: `${newId}-o3`, text: "", isCorrect: false },
          { id: `${newId}-o4`, text: "", isCorrect: false },
        ],
        explanation: "",
        points: 10,
      },
    ])
  }

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId))
  }

  const moveQuestion = (questionId: string, direction: "up" | "down") => {
    const index = questions.findIndex((q) => q.id === questionId)
    if ((direction === "up" && index === 0) || (direction === "down" && index === questions.length - 1)) {
      return
    }

    const newQuestions = [...questions]
    const newIndex = direction === "up" ? index - 1 : index + 1
    const temp = newQuestions[index]
    newQuestions[index] = newQuestions[newIndex]
    newQuestions[newIndex] = temp
    setQuestions(newQuestions)
  }

  const updateQuestion = (questionId: string, field: string, value: any) => {
    setQuestions(questions.map((q) => (q.id === questionId ? { ...q, [field]: value } : q)))
  }

  const updateOption = (questionId: string, optionId: string, field: string, value: any) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) => (o.id === optionId ? { ...o, [field]: value } : o)),
            }
          : q,
      ),
    )
  }

  const setCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) => ({
                ...o,
                isCorrect: o.id === optionId,
              })),
            }
          : q,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <Card key={question.id} className="relative">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Question {index + 1}</CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveQuestion(question.id, "up")}
                  disabled={index === 0}
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveQuestion(question.id, "down")}
                  disabled={index === questions.length - 1}
                >
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(question.id)}
                  disabled={questions.length === 1}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`question-${question.id}`}>Question</Label>
              <Textarea
                id={`question-${question.id}`}
                value={question.question}
                onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
                placeholder="Enter your question here"
              />
            </div>

            <div className="space-y-2">
              <Label>Options</Label>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-start gap-3">
                    <RadioGroup
                      value={question.options.find((o) => o.isCorrect)?.id || ""}
                      onValueChange={(value) => setCorrectOption(question.id, value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                      </div>
                    </RadioGroup>
                    <Input
                      value={option.text}
                      onChange={(e) => updateOption(question.id, option.id, "text", e.target.value)}
                      placeholder="Option text"
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Select the radio button next to the correct answer</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`explanation-${question.id}`}>Explanation</Label>
              <Textarea
                id={`explanation-${question.id}`}
                value={question.explanation}
                onChange={(e) => updateQuestion(question.id, "explanation", e.target.value)}
                placeholder="Explain why the correct answer is right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`points-${question.id}`}>Points</Label>
              <Input
                id={`points-${question.id}`}
                type="number"
                min="1"
                max="100"
                value={question.points}
                onChange={(e) => updateQuestion(question.id, "points", Number.parseInt(e.target.value) || 10)}
                className="w-24"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addQuestion} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Question
      </Button>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="passing-score" />
          <Label htmlFor="passing-score">Set passing score</Label>
        </div>
        <Input type="number" min="1" max="100" defaultValue="70" className="w-24" placeholder="70%" />
        <p className="text-xs text-muted-foreground">Percentage required to pass the quiz</p>
      </div>
    </div>
  )
}
