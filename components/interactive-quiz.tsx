"use client"

import { useState } from "react"
import { CheckCircle, XCircle, HelpCircle, ArrowRight, RotateCcw, Trophy, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { CertificateModal } from "@/components/certificate-modal"

export type QuizQuestion = {
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

export type QuizProps = {
  title: string
  description: string
  questions: QuizQuestion[]
  moduleName: string
  chapterName?: string
  onComplete?: (score: number, totalPossible: number) => void
}

type QuestionState = {
  selectedOption: string | null
  isSubmitted: boolean
  isCorrect: boolean
}

export function InteractiveQuiz({ title, description, questions, moduleName, chapterName, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questionStates, setQuestionStates] = useState<QuestionState[]>(
    questions.map(() => ({
      selectedOption: null,
      isSubmitted: false,
      isCorrect: false,
    })),
  )
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const currentState = questionStates[currentQuestionIndex]

  const totalPossiblePoints = questions.reduce((total, question) => total + question.points, 0)
  const earnedPoints = questionStates.reduce(
    (total, state, index) => (state.isCorrect ? total + questions[index].points : total),
    0,
  )
  const scorePercentage = Math.round((earnedPoints / totalPossiblePoints) * 100)
  const passingScore = 70 // 70% is passing

  const handleOptionSelect = (optionId: string) => {
    if (currentState.isSubmitted) return

    setQuestionStates((prev) => {
      const newStates = [...prev]
      newStates[currentQuestionIndex] = {
        ...newStates[currentQuestionIndex],
        selectedOption: optionId,
      }
      return newStates
    })
  }

  const handleSubmitAnswer = () => {
    if (!currentState.selectedOption || currentState.isSubmitted) return

    const selectedOption = currentQuestion.options.find((option) => option.id === currentState.selectedOption)
    const isCorrect = selectedOption?.isCorrect || false

    setQuestionStates((prev) => {
      const newStates = [...prev]
      newStates[currentQuestionIndex] = {
        ...newStates[currentQuestionIndex],
        isSubmitted: true,
        isCorrect,
      }
      return newStates
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setQuizCompleted(true)
      onComplete?.(earnedPoints, totalPossiblePoints)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setQuestionStates(
      questions.map(() => ({
        selectedOption: null,
        isSubmitted: false,
        isCorrect: false,
      })),
    )
    setQuizCompleted(false)
  }

  const handleViewCertificate = () => {
    setShowCertificate(true)
  }

  const getFeedbackMessage = (score: number) => {
    if (score >= 90) return "Outstanding! You've mastered these leadership concepts!"
    if (score >= 80) return "Great job! You have a solid understanding of leadership styles."
    if (score >= 70) return "Good work! You're on the right track with your leadership knowledge."
    if (score >= 60) return "Not bad! With a bit more study, you'll be a leadership expert."
    return "Keep learning! Leadership is a journey, and you're just getting started."
  }

  const getEmojiForScore = (score: number) => {
    if (score >= 90) return "🏆"
    if (score >= 80) return "🌟"
    if (score >= 70) return "👍"
    if (score >= 60) return "🙂"
    return "📚"
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 70) return "bg-blue-500"
    if (score >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {!quizCompleted && (
            <div className="mt-2">
              <div className="flex justify-between text-sm">
                <span>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span>
                  {earnedPoints} / {totalPossiblePoints} points
                </span>
              </div>
              <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2 mt-2" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          {!quizCompleted ? (
            <div className="space-y-4">
              <div className="text-lg font-medium">{currentQuestion.question}</div>
              <div className="space-y-2">
                <RadioGroup
                  value={currentState.selectedOption || ""}
                  onValueChange={handleOptionSelect}
                  disabled={currentState.isSubmitted}
                >
                  {currentQuestion.options.map((option) => {
                    const isSelected = currentState.selectedOption === option.id
                    const showCorrect = currentState.isSubmitted && option.isCorrect
                    const showIncorrect = currentState.isSubmitted && isSelected && !option.isCorrect

                    return (
                      <div
                        key={option.id}
                        className={cn(
                          "flex items-center space-x-2 rounded-md border p-3 transition-colors",
                          isSelected && !currentState.isSubmitted && "border-primary bg-primary/5",
                          showCorrect && "border-green-500 bg-green-50",
                          showIncorrect && "border-red-500 bg-red-50",
                        )}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className={cn(
                            showCorrect && "text-green-500 border-green-500",
                            showIncorrect && "text-red-500 border-red-500",
                          )}
                        />
                        <Label
                          htmlFor={option.id}
                          className={cn(
                            "flex-1 cursor-pointer",
                            showCorrect && "text-green-700",
                            showIncorrect && "text-red-700",
                          )}
                        >
                          {option.text}
                        </Label>
                        {currentState.isSubmitted && (
                          <div className="ml-2">
                            {option.isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : isSelected ? (
                              <XCircle className="h-5 w-5 text-red-500" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              {currentState.isSubmitted && (
                <div
                  className={cn(
                    "mt-4 rounded-md p-4",
                    currentState.isCorrect ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700",
                  )}
                >
                  <div className="flex items-start gap-2">
                    {currentState.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <HelpCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">
                        {currentState.isCorrect
                          ? `Correct! +${currentQuestion.points} points`
                          : "Not quite right. Let's learn why:"}
                      </p>
                      <p className="mt-1">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-4">{getEmojiForScore(scorePercentage)}</div>
                <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                <p className="text-muted-foreground">
                  You scored {earnedPoints} out of {totalPossiblePoints} points ({scorePercentage}%)
                </p>
                <div className="w-full mt-4">
                  <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(scorePercentage)}`}
                      style={{ width: `${scorePercentage}%` }}
                    ></div>
                  </div>
                </div>
                <p className="mt-6 text-lg">{getFeedbackMessage(scorePercentage)}</p>

                {scorePercentage >= passingScore && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
                    <Award className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <h4 className="font-medium text-blue-700">Congratulations! You've earned a certificate!</h4>
                      <p className="text-blue-600 mt-1">
                        You've passed the quiz with a score of {scorePercentage}%. Click below to view and download your
                        personalized certificate.
                      </p>
                      <Button onClick={handleViewCertificate} className="mt-3" size="sm">
                        View Certificate
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Question Summary:</h4>
                {questions.map((question, index) => {
                  const state = questionStates[index]
                  return (
                    <div
                      key={question.id}
                      className={cn(
                        "p-3 rounded-md border",
                        state.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50",
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {state.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">
                            Question {index + 1}: {question.question}
                          </p>
                          <p className="text-sm mt-1">
                            {state.isCorrect
                              ? `Correct answer: ${question.options.find((option) => option.isCorrect)?.text}`
                              : `Your answer: ${
                                  question.options.find((option) => option.id === state.selectedOption)?.text
                                }`}
                          </p>
                          {!state.isCorrect && (
                            <p className="text-sm mt-1">
                              Correct answer: {question.options.find((option) => option.isCorrect)?.text}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!quizCompleted ? (
            <>
              {!currentState.isSubmitted ? (
                <Button onClick={handleSubmitAnswer} disabled={!currentState.selectedOption} className="ml-auto">
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="ml-auto">
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next Question <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Complete Quiz <Trophy className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </>
          ) : (
            <Button onClick={handleRestartQuiz} className="mx-auto">
              <RotateCcw className="mr-2 h-4 w-4" /> Restart Quiz
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        userName="John Doe" // This would come from user profile in a real app
        moduleName={moduleName}
        chapterName={chapterName}
        completionDate={new Date()}
        score={earnedPoints}
        totalPossible={totalPossiblePoints}
      />
    </>
  )
}
