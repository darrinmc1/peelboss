"use client"

import { useState } from "react"
import { CheckCircle2, Circle, PlayCircle, Coffee, Brain, Lightbulb, MessageSquare } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Chapter } from "@/data/modules"

type Module = {
  title: string
  description: string
  chapters: Chapter[]
}

export function LessonView({
  module,
  currentChapter,
}: {
  module: Module
  currentChapter: Chapter
}) {
  const [checklist, setChecklist] = useState([
    { id: 1, label: "Watch the full video (no skipping the boring parts!)", checked: false },
    { id: 2, label: "Complete the practice exercise (yes, it's actually useful)", checked: false },
    { id: 3, label: "Take the quiz (and pretend you didn't Google the answers)", checked: false },
    { id: 4, label: "Refill coffee/tea before continuing to next chapter", checked: false },
    { id: 5, label: "Impress a colleague with your new knowledge (results may vary)", checked: false },
  ])

  const toggleChecklistItem = (id: number) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const completedChapters = module.chapters.filter((chapter) => chapter.completed).length || 0
  const progress = module.chapters.length > 0 ? (completedChapters / module.chapters.length) * 100 : 0

  // Get a motivational message based on progress
  const getMotivationalMessage = (progress: number) => {
    if (progress === 0) return "The journey of a thousand miles begins with a single click."
    if (progress < 25)
      return "You've started! That's often the hardest part. (The rest is also hard, but don't worry about that now.)"
    if (progress < 50) return "Keep going! You're building momentum like a management snowball."
    if (progress < 75)
      return "You're more than halfway there! It's all downhill from here. Except for the uphill parts."
    if (progress < 100) return "So close to the finish line! You can practically taste the certificate."
    return "You did it! Time to add this to your LinkedIn profile and casually mention it in every conversation."
  }

  // Humorous management quotes
  const managementQuotes = [
    "Management is doing things right; leadership is doing the right things. Procrastination is doing neither but having more fun.",
    "The secret to management is to keep the people who hate you away from those who are still undecided.",
    "If you think your boss is stupid, remember: you wouldn't have a job if they were any smarter.",
    "A committee is a group that keeps minutes and loses hours.",
    "Leadership is the art of getting someone else to do something you want done because they want to do it. Or because you bribed them with pizza.",
  ]

  // Random quote
  const randomQuote = managementQuotes[Math.floor(Math.random() * managementQuotes.length)]

  // Real-world examples with humor
  const getExampleForChapter = () => {
    // This would ideally be mapped to specific chapters, but for now we'll use a generic example
    return {
      title: "The Meeting That Could Have Been an Email",
      description:
        "At TechCorp, Manager Dave was famous for his 3-hour Monday meetings. The team would sit through detailed updates on projects they weren't involved in, policy reminders they'd heard 17 times, and Dave's weekend golf stories.\n\nNew Manager Sarah took over and immediately implemented a new approach: a 15-minute stand-up for urgent items, a shared document for updates, and a rule that meetings must have clear agendas and goals.\n\nProductivity increased 30%, employee satisfaction scores doubled, and the company saved approximately 7,428 hours of collective eye-rolling per year.",
      lesson:
        "Respect people's time, communicate efficiently, and save the golf stories for lunch. Your team will be more productive and less likely to hide when they see you coming.",
    }
  }

  const example = getExampleForChapter()

  // Fun facts about management and leadership
  const funFacts = [
    "The average manager spends 35% of their time in meetings. The other 65% is spent wishing they weren't in meetings.",
    "Studies show that employees with a sense of humor are 23% more likely to solve complex problems creatively.",
    "The 'Peter Principle' suggests that people in organizations rise to their 'level of incompetence.' So if you're struggling, congratulations on your recent promotion!",
    "The term 'management' comes from the Italian 'maneggiare' (to handle horses). Some managers still think their teams need to be reined in!",
    "Research shows that 65% of employees would rather have a new boss than a pay raise. The other 35% have never had a truly terrible boss.",
  ]

  // Random fun fact
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <div className="sticky top-20 space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Course Progress</CardTitle>
              <CardDescription>
                {completedChapters} of {module.chapters.length} chapters completed
              </CardDescription>
              <Progress value={progress} className="h-2" />
              <p className="text-xs italic text-muted-foreground mt-2">{getMotivationalMessage(progress)}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Accordion type="single" collapsible defaultValue="chapters" className="w-full">
                <AccordionItem value="chapters" className="border-none">
                  <AccordionTrigger className="py-2 px-0">Chapters</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1">
                      {module.chapters.map((chapter, index) => (
                        <Button
                          key={chapter.id}
                          variant={chapter.id === currentChapter.id ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2 text-sm"
                        >
                          {chapter.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-purple-500" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                          <span className="truncate">
                            {index + 1}. {chapter.title}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                Coffee Break Wisdom
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-muted-foreground italic">"{randomQuote}"</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Management Fun Fact
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-xs text-muted-foreground">{randomFact}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="md:col-span-2 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{currentChapter.title}</h2>
          <p className="text-sm italic text-muted-foreground">
            Chapter difficulty: {Math.floor(Math.random() * 3) + 1} coffee cups (or energy drinks, we don't judge)
          </p>

          <div className="overflow-hidden rounded-lg border bg-muted/40">
            <div className="relative aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <Button size="icon" className="h-16 w-16 rounded-full">
                  <PlayCircle className="h-10 w-10" />
                </Button>
              </div>
              <img src="/video-thumbnail.png" alt="Video thumbnail" className="h-full w-full object-cover opacity-80" />
            </div>
          </div>

          <Alert variant="default" className="bg-blue-50 border-blue-200">
            <MessageSquare className="h-4 w-4" />
            <AlertTitle>Real-World Example: {example.title}</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="mb-2">{example.description}</p>
              <p className="font-medium">The Lesson: {example.lesson}</p>
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Complete these tasks
            </h3>
            <p className="text-sm text-muted-foreground">
              Check these off as you go. We're not monitoring you, but your conscience is. And maybe your manager,
              depending on your privacy settings.
            </p>
            <div className="space-y-2">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`task-${item.id}`}
                    checked={item.checked}
                    onCheckedChange={() => toggleChecklistItem(item.id)}
                  />
                  <label
                    htmlFor={`task-${item.id}`}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      item.checked ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Key Takeaways</CardTitle>
              <CardDescription className="italic">
                The important bits, in case you were checking your phone during the video.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="ml-6 list-disc [&>li]:mt-2">
                <li>{currentChapter.description}</li>
                <li>Apply practical techniques to improve your management skills</li>
                <li>Understand how to implement these concepts in your workplace</li>
                <li>Develop strategies to overcome common challenges in this area</li>
                <li className="italic text-muted-foreground">
                  Impress colleagues with your newfound knowledge (results may vary)
                </li>
                <li className="italic text-muted-foreground">
                  Learn to use management jargon correctly in meetings to sound important
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between">
          <Button variant="outline">Previous Chapter</Button>
          <Button>Next Chapter</Button>
        </div>
      </div>
    </div>
  )
}
