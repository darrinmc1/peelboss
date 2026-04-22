"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

type ExerciseStep = {
  id: string
  title: string
  instructions: string
  type: "text" | "multiple-choice" | "file-upload" | "code"
}

export function ExerciseBuilder() {
  const [steps, setSteps] = useState<ExerciseStep[]>([
    {
      id: "step1",
      title: "",
      instructions: "",
      type: "text",
    },
  ])

  const addStep = () => {
    const newId = `step${steps.length + 1}`
    setSteps([
      ...steps,
      {
        id: newId,
        title: "",
        instructions: "",
        type: "text",
      },
    ])
  }

  const removeStep = (stepId: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter((step) => step.id !== stepId))
    }
  }

  const updateStep = (stepId: string, field: keyof ExerciseStep, value: any) => {
    setSteps(steps.map((step) => (step.id === stepId ? { ...step, [field]: value } : step)))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="exercise-objective">Exercise Objective</Label>
        <Textarea id="exercise-objective" placeholder="What will learners accomplish in this exercise?" rows={2} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="estimated-time">Estimated Completion Time (minutes)</Label>
        <Input id="estimated-time" type="number" min="1" placeholder="15" className="w-32" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Exercise Steps</h3>
        </div>

        {steps.map((step, index) => (
          <Card key={step.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Step {index + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStep(step.id)}
                  disabled={steps.length === 1}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`step-title-${step.id}`}>Step Title</Label>
                <Input
                  id={`step-title-${step.id}`}
                  value={step.title}
                  onChange={(e) => updateStep(step.id, "title", e.target.value)}
                  placeholder="Enter a title for this step"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`step-type-${step.id}`}>Response Type</Label>
                <Select
                  value={step.type}
                  onValueChange={(value) => updateStep(step.id, "type", value as ExerciseStep["type"])}
                >
                  <SelectTrigger id={`step-type-${step.id}`}>
                    <SelectValue placeholder="Select response type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text Response</SelectItem>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="file-upload">File Upload</SelectItem>
                    <SelectItem value="code">Code Snippet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`step-instructions-${step.id}`}>Instructions</Label>
                <Textarea
                  id={`step-instructions-${step.id}`}
                  value={step.instructions}
                  onChange={(e) => updateStep(step.id, "instructions", e.target.value)}
                  placeholder="Provide detailed instructions for this step"
                  rows={3}
                />
              </div>

              {step.type === "multiple-choice" && (
                <div className="space-y-2 border-t pt-4">
                  <Label>Multiple Choice Options</Label>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((optionNum) => (
                      <div key={optionNum} className="flex gap-2">
                        <Input placeholder={`Option ${optionNum}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addStep} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Step
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="completion-criteria">Completion Criteria</Label>
        <Textarea
          id="completion-criteria"
          placeholder="What criteria will be used to determine if the exercise is completed successfully?"
          rows={2}
        />
      </div>
    </div>
  )
}
