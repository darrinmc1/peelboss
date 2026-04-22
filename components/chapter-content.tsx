"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  BookOpen,
  Video,
  PenTool,
  HelpCircle,
  ListChecks,
  Coffee,
  LightbulbIcon,
  Quote,
  ArrowLeft,
  ArrowRight,
  MessagesSquare,
} from "lucide-react"
import type { Chapter, Module } from "@/data/modules"
import { InteractiveQuiz } from "@/components/interactive-quiz"
import {
  transformationalVsTransactionalQuiz,
  servantSituationalQuiz,
  autocraticDemocraticQuiz,
  matchingStylesQuiz,
} from "@/data/leadership-quizzes"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BookmarkableSection } from "@/components/bookmarkable-section"
import { RolePlayScenario } from "@/components/lessons/RolePlayScenario"
import { getRolePlayForChapter } from "@/data/activities"

interface ChapterContentProps {
  chapter: Chapter
  prevChapter: Chapter | null
  nextChapter: Chapter | null
  moduleId: string
  moduleName: string
}

export function ChapterContent({
  chapter,
  prevChapter,
  nextChapter,
  moduleId,
  moduleName,
}: ChapterContentProps) {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})

  const markTaskComplete = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: true,
    }))
  }

  const getQuizForChapter = () => {
    switch (chapter.id) {
      case "transformational-vs-transactional":
        return transformationalVsTransactionalQuiz
      case "servant-situational":
        return servantSituationalQuiz
      case "autocratic-democratic":
        return autocraticDemocraticQuiz
      case "matching-styles":
        return matchingStylesQuiz
      default:
        return transformationalVsTransactionalQuiz
    }
  }

  const handleQuizComplete = () => {
    markTaskComplete("quiz")
  }

  const rolePlayScenario = getRolePlayForChapter(chapter.id)
  const hasRolePlay = !!rolePlayScenario

  // Humor quotes related to the topic
  const humorousQuotes = [
    "Management is doing things right; leadership is doing the right things... and humor is knowing when to do neither.",
    "The key to being a good manager is keeping the people who hate you away from those who are still undecided.",
    "I always arrive late at the office, but I make up for it by leaving early.",
    "A committee is a group that keeps minutes and loses hours.",
    "The best way to appreciate your job is to imagine yourself without one.",
  ]

  // Random quote selection
  const randomQuote = humorousQuotes[Math.floor(Math.random() * humorousQuotes.length)]

  // Fun facts related to management
  const funFacts = [
    "The average manager spends 50% of their time in meetings. The other 50% is spent complaining about meetings.",
    "Studies show that employees with a sense of humor are 23% more likely to solve complex problems creatively.",
    "The 'Peter Principle' suggests that people in organizations rise to their 'level of incompetence.' So if you're struggling, congratulations on your recent promotion!",
    "The term 'management' comes from the Italian 'maneggiare' (to handle horses). Some managers still think their teams need to be reined in!",
    "The average office worker spends 2.5 hours a day reading emails. That's 625 hours a year pretending to be busy.",
  ]

  // Random fun fact
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)]

  // Real-world examples with a touch of humor
  const getExamplesForChapter = () => {
    switch (chapter.id) {
      case "transformational-vs-transactional":
        return [
          {
            title: "The Startup Visionary vs. The Corporate Taskmaster",
            description:
              "Meet Sarah, a transformational leader who inspired her team to create an app that revolutionized dog walking. Her vision? 'Let's connect lonely dogs with bored humans!' Her team was so inspired they worked weekends (voluntarily!).\n\nMeanwhile, Bob at MegaCorp uses transactional leadership: 'Complete these 37 TPS reports by Friday and I'll let you have pizza at your desk.' His team completes everything on time, but mysteriously all request transfers on the same day every year.",
            lesson:
              "Transformational leadership inspires innovation and passion, while transactional leadership ensures consistent output. Both have their place, but only one will get you enthusiastic weekend work without complaints.",
          },
          {
            title: "The School Principal Experiment",
            description:
              "Principal Rodriguez (transformational) turned around a struggling school by painting a vision of 'education that changes lives.' She shared stories of student success, involved teachers in decision-making, and celebrated small wins. Attendance improved 40%.\n\nAcross town, Principal Smith (transactional) implemented a strict 'attendance = rewards' system. Students showed up to collect points for prizes. When the budget for prizes was cut, attendance plummeted faster than grades during spring break.",
            lesson:
              "Transformational leadership creates intrinsic motivation that outlasts incentives. Transactional leadership works until the transaction loses value.",
          },
        ]
      case "servant-situational":
        return [
          {
            title: "The Restaurant Manager Who Rolled Up His Sleeves",
            description:
              "During the dinner rush at 'Fancy Plates Restaurant,' Manager Miguel noticed his team struggling. Instead of barking orders from his office, he jumped in to wash dishes, seat customers, and even helped the chefs plate meals. The staff was shocked—previous managers just yelled louder when things got busy.\n\nBy the end of the night, not only had they served a record number of customers, but three employees who had been planning to quit decided to stay. Miguel's servant leadership approach turned 'just a job' into 'a place I want to work.' His secret? 'I can't expect them to care if I don't show I care first.'",
            lesson:
              "Servant leadership builds loyalty that money can't buy. Plus, Miguel got a free workout without paying for a gym membership.",
          },
          {
            title: "The Tech Lead Who Adapted to Everyone",
            description:
              "Priya managed a software development team with wildly different experience levels. With junior developer Raj, she provided detailed guidance and frequent check-ins. For mid-level developer Lisa, she offered general direction but let her figure out the implementation. With senior developer Marcus, she simply discussed outcomes and deadlines.\n\nWhen a new project came in, Priya adjusted her approach for each team member. The result? Everyone delivered quality work on time, and nobody felt either micromanaged or abandoned. Meanwhile, in the next department over, a manager who used the same approach with everyone had three resignations and a project that was six months behind schedule.",
            lesson:
              "Situational leadership recognizes that one size fits none. It's like having different coffee orders for different team members—some need an extra shot of guidance, others just a light touch of direction.",
          },
        ]
      case "autocratic-democratic":
        return [
          {
            title: "The Tale of Two Crisis Managers",
            description:
              "When a major product defect was discovered at TechGizmo Inc., Manager Alex (autocratic) took immediate control: 'I've decided we're recalling all units. Marketing will issue this statement I've drafted. Production will work overtime until fixed. No questions, we need to move now.'\n\nAt rival company GadgetWorld, Manager Jordan (democratic) faced the same issue but called an emergency team meeting: 'We have a serious defect. I need your expertise to determine our best response.' After 30 minutes of discussion, the team developed a targeted recall plan, a customer communication strategy, and a production fix that was actually faster than TechGizmo's solution.\n\nThe punchline? GadgetWorld's stock recovered in a week. TechGizmo's took a month—and three key team members quit, citing 'leadership issues.'",
            lesson:
              "Autocratic leadership can be necessary in true emergencies, but democratic leadership often produces better solutions because two heads are better than one (unless you're shopping for hats).",
          },
          {
            title: "The Laissez-Faire Experiment That Almost Worked",
            description:
              "Creative agency Wildthink tried an experiment: for one month, their design team would operate with completely laissez-faire leadership. 'Total creative freedom!' announced the director. 'No approvals needed, no mandatory meetings, just deliver amazing work!'\n\nWeek 1: The team was energized and produced some innovative concepts.\nWeek 2: Coordination issues emerged as designers created conflicting elements.\nWeek 3: Two designers were working on the same project unknowingly.\nWeek 4: A major client presentation featured three completely different design directions, leaving the client confused.\n\nThe experiment ended with a hybrid approach: creative freedom within a structured framework. As one designer put it, 'Turns out, I don't actually want to decide everything. I just want to be heard when I have something to say.'",
            lesson:
              "Laissez-faire leadership can unleash creativity but may create chaos without some structure. It's like letting kids decorate their own rooms—exciting until someone paints the dog.",
          },
        ]
      case "matching-styles":
        return [
          {
            title: "The Startup That Switched Styles to Survive",
            description:
              "CloudBoost began as a scrappy startup with founder Ellie using democratic leadership—everyone had input on product features, marketing, even office snack selection. This worked brilliantly during innovation phases, with team members feeling ownership and contributing creative ideas.\n\nAs they grew to 50 employees and faced increasing competition, decision-making became painfully slow. Important launches were delayed by endless discussions. Ellie adapted, implementing a more directive approach for time-sensitive decisions while maintaining democratic processes for innovation and strategy.\n\nAt their company retreat, she joked, 'We vote on where to go for lunch and I dictate quarterly targets. I tried it the other way around once and we ended up with pizza every day and 17 different target markets.'",
            lesson:
              "Different business phases require different leadership styles. The best leaders adapt their approach to the situation, not force the situation to fit their preferred style.",
          },
          {
            title: "The Department Store Transformation",
            description:
              "Riverside Department Store was struggling with declining sales when new manager Carlos took over. He assessed the situation and realized different departments needed different leadership approaches:\n\n- For the understaffed, demoralized customer service team, he used transformational leadership, painting a vision of 'customer experience excellence' and investing in their development.\n- With the high-performing, experienced sales team, he applied laissez-faire leadership, giving them autonomy and focusing on removing obstacles.\n- For the inventory team dealing with a new system implementation, he employed transactional leadership with clear expectations and incentives for accuracy.\n\nSix months later, store performance had improved dramatically. When asked his secret, Carlos replied, 'I just matched my leadership style to what each team needed, not what was easiest for me. It's like parenting—you don't treat your toddler and teenager exactly the same way, unless you enjoy chaos and therapy bills.'",
            lesson:
              "Effective leaders adapt their style to the team's needs, development level, and the specific situation. One-size-fits-all leadership is like one-size-fits-all clothing—it rarely fits anyone well.",
          },
        ]
      default:
        return [
          {
            title: "The Accidental Leadership Genius",
            description:
              "Mark never intended to become a manager. He was perfectly happy coding in his corner, talking primarily to his rubber duck debugging companion. When suddenly promoted to team lead, he panicked.\n\nHis approach? 'I'll just treat everyone how I'd want to be treated.' He gave clear expectations but trusted people to work their way. He asked questions instead of giving orders. He brought donuts on Fridays (the good kind, not the cheap ones).\n\nTo everyone's surprise, especially Mark's, his team became the highest performing in the company. When asked about his leadership philosophy, he shrugged and said, 'I just try not to be the kind of boss that people complain about at happy hour.'",
            lesson:
              "Sometimes the best leadership comes from authenticity and basic human decency rather than complex theories. And never underestimate the motivational power of good donuts.",
          },
        ]
    }
  }

  const examples = getExamplesForChapter()

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 space-y-4">
          <h1 className="text-3xl font-bold">{chapter.title}</h1>
          <p className="text-muted-foreground">{chapter.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Video className="h-4 w-4" />
            <span>{chapter.duration}</span>
          </div>

          <Alert variant="default" className="bg-amber-50 border-amber-200">
            <Coffee className="h-4 w-4" />
            <AlertTitle>Coffee Break Wisdom</AlertTitle>
            <AlertDescription className="italic text-sm">{randomQuote}</AlertDescription>
          </Alert>
        </div>
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-green-100">
                  {completedTasks["video"] ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Video className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <span className={completedTasks["video"] ? "line-through text-muted-foreground" : ""}>
                  Watch the video (no multitasking, we can tell!)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-blue-100">
                  {completedTasks["reading"] ? (
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  ) : (
                    <BookOpen className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <span className={completedTasks["reading"] ? "line-through text-muted-foreground" : ""}>
                  Complete the reading (yes, all of it)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-amber-100">
                  {completedTasks["exercise"] ? (
                    <CheckCircle className="h-4 w-4 text-amber-600" />
                  ) : (
                    <PenTool className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <span className={completedTasks["exercise"] ? "line-through text-muted-foreground" : ""}>
                  Complete the exercise (no, your boss doing it doesn't count)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-purple-100">
                  {completedTasks["quiz"] ? (
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                  ) : (
                    <HelpCircle className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <span className={completedTasks["quiz"] ? "line-through text-muted-foreground" : ""}>
                  Pass the quiz (Google is watching you)
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="video">
        <TabsList className={`grid ${hasRolePlay ? "grid-cols-5" : "grid-cols-4"} mb-8`}>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="reading">Reading</TabsTrigger>
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          {hasRolePlay && (
            <TabsTrigger value="roleplay" className="gap-1.5">
              <MessagesSquare className="h-3.5 w-3.5" />
              Role-Play
            </TabsTrigger>
          )}
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="video" className="space-y-6">
          <BookmarkableSection
            id="video-section"
            title="Video: Introduction to Leadership Styles"
            moduleId={moduleId}
            chapterId={chapter.id}
          >
            <div className="w-full">
              <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                <Image
                  src="/video-thumbnail.png"
                  alt={`${chapter.title} video thumbnail`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="gap-2">
                    <Video className="h-5 w-5" />
                    Play Video
                  </Button>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  This video contains 42% fewer buzzwords than the industry average and a 100% guarantee of at least one
                  dad joke.
                </p>
                <Button onClick={() => markTaskComplete("video")}>Mark Video as Watched</Button>
              </div>
            </div>
          </BookmarkableSection>
        </TabsContent>

        <TabsContent value="reading" className="space-y-6">
          <div className="prose prose-blue max-w-none">
            <BookmarkableSection
              id="reading-intro"
              title="Introduction to the Topic"
              moduleId={moduleId}
              chapterId={chapter.id}
            >
              <h2>Understanding {chapter.title}</h2>
            </BookmarkableSection>
            <p>
              Welcome to the chapter on {chapter.title}! Don't worry, we've worked hard to make this more engaging than
              your average corporate handbook. No falling asleep allowed!
            </p>

            <Alert className="my-4 bg-blue-50 border-blue-200">
              <LightbulbIcon className="h-4 w-4" />
              <AlertTitle>Fun Fact</AlertTitle>
              <AlertDescription>{randomFact}</AlertDescription>
            </Alert>

            <BookmarkableSection
              id="real-world-examples"
              title="Real-World Examples"
              moduleId={moduleId}
              chapterId={chapter.id}
            >
              <h3>Real-World Examples</h3>
            </BookmarkableSection>

            {examples.map((example, index) => (
              <div key={index} className="mb-6">
                <BookmarkableSection
                  id={`example-${index}`}
                  title={example.title}
                  moduleId={moduleId}
                  chapterId={chapter.id}
                >
                  <h4>{example.title}</h4>
                </BookmarkableSection>
                <p>{example.description}</p>
                <div className="bg-purple-50 p-4 rounded-md border border-purple-100 mt-2">
                  <p className="font-medium text-purple-800">The Lesson:</p>
                  <p className="text-purple-700">{example.lesson}</p>
                </div>
              </div>
            ))}

            <BookmarkableSection
              id="why-this-matters"
              title="Why This Matters"
              moduleId={moduleId}
              chapterId={chapter.id}
            >
              <h3>Why This Matters</h3>
            </BookmarkableSection>
            <p>
              You might be thinking, "Great, another management theory I'll never use." But unlike that bread maker you
              got for your wedding, you'll actually use these concepts regularly in your professional life.
            </p>

            <div className="bg-gray-100 p-4 rounded-md border border-gray-200 my-4">
              <h4 className="flex items-center gap-2">
                <Quote className="h-4 w-4" /> From The Field
              </h4>
              <p className="italic">
                "I used to think leadership theories were just for business books and LinkedIn posts. Then I actually
                tried applying them and suddenly my team stopped 'accidentally' forgetting to invite me to lunch."
              </p>
              <p className="text-right text-sm text-gray-600">— A Manager Who Learned The Hard Way</p>
            </div>
          </div>
          <div className="text-center">
            <Button onClick={() => markTaskComplete("reading")}>Mark Reading as Complete</Button>
          </div>
        </TabsContent>

        <TabsContent value="exercise" className="space-y-6">
          <Card>
            <CardHeader>
              <BookmarkableSection
                id="exercise-intro"
                title="Interactive Exercise: Leadership Style Scenarios"
                moduleId={moduleId}
                chapterId={chapter.id}
              >
                <CardTitle>Interactive Exercise: Leadership Style Scenarios</CardTitle>
              </BookmarkableSection>
              <CardDescription>
                Apply what you've learned to these real-world scenarios. No pressure, just pretend these are
                million-dollar decisions that could make or break your career. (Just kidding... mostly.)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <BookmarkableSection
                  id="scenario-1"
                  title="Scenario 1: The Deadline Disaster"
                  moduleId={moduleId}
                  chapterId={chapter.id}
                >
                  <h3 className="font-medium">Scenario 1: The Deadline Disaster</h3>
                </BookmarkableSection>
                <p>
                  Your team is behind on an important project due in 48 hours. Two team members are in disagreement
                  about the approach, another is overwhelmed, and your boss is increasingly anxious. What leadership
                  style would you apply and why?
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-sm text-gray-600 mb-2">Think about:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Is this a time for democratic discussion or more directive leadership?</li>
                    <li>How might different team members respond to different approaches?</li>
                    <li>What are the risks of choosing the wrong style in this situation?</li>
                  </ul>
                </div>

                <BookmarkableSection
                  id="scenario-2"
                  title="Scenario 2: The Innovation Challenge"
                  moduleId={moduleId}
                  chapterId={chapter.id}
                >
                  <h3 className="font-medium mt-6">Scenario 2: The Innovation Challenge</h3>
                </BookmarkableSection>
                <p>
                  Your company needs fresh ideas to stay competitive. Your team is experienced and skilled but has
                  fallen into comfortable routines. How would you lead them to more innovative thinking?
                </p>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-sm text-gray-600 mb-2">Consider:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Which leadership style(s) best foster creativity and innovation?</li>
                    <li>How might you need to adapt your approach for different team members?</li>
                    <li>What barriers might you encounter and how would you address them?</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-md border border-amber-100 mt-6">
                  <p className="text-amber-800 text-sm">
                    <span className="font-medium">Pro Tip:</span> There are no perfect answers here, just like in real
                    life. The best leaders adapt their style to the situation while staying authentic. And when all else
                    fails, bring donuts. Seriously, never underestimate the power of pastries in management.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-center">
            <Button onClick={() => markTaskComplete("exercise")}>Mark Exercise as Complete</Button>
          </div>
        </TabsContent>

        {hasRolePlay && rolePlayScenario && (
          <TabsContent value="roleplay" className="space-y-6">
            <BookmarkableSection
              id="roleplay-section"
              title={`Role-Play: ${rolePlayScenario.title}`}
              moduleId={moduleId}
              chapterId={chapter.id}
            >
              <div className="space-y-3">
                <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                  <MessagesSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Practice the conversation.</p>
                    <p className="text-xs text-amber-800 mt-0.5">
                      No right answers — just real trade-offs. Your choices shape the outcome. You can retry anytime.
                    </p>
                  </div>
                </div>
                <RolePlayScenario
                  scenario={rolePlayScenario}
                  onComplete={() => markTaskComplete("roleplay")}
                />
              </div>
            </BookmarkableSection>
          </TabsContent>
        )}

        <TabsContent value="quiz" className="space-y-6">
          <BookmarkableSection
            id="quiz-section"
            title={`Quiz: ${chapter.title}`}
            moduleId={moduleId}
            chapterId={chapter.id}
          >
            <div className="w-full">
              <InteractiveQuiz
                title={`Quiz: ${chapter.title}`}
                description="Test your knowledge of the concepts covered in this chapter. Don't worry, we won't tell anyone if you need a few attempts. We've all been there."
                questions={getQuizForChapter()}
                moduleName={moduleName}
                chapterName={chapter.title}
                onComplete={handleQuizComplete}
              />
            </div>
          </BookmarkableSection>
        </TabsContent>
      </Tabs>

      <BookmarkableSection id="key-takeaways" title="Key Takeaways" moduleId={moduleId} chapterId={chapter.id}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" />
              Key Takeaways
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>After completing this chapter, you should understand:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The main concepts related to {chapter.title}</li>
              <li>How to apply these leadership styles in different contexts</li>
              <li>The strengths and limitations of each approach</li>
              <li>When to use different leadership techniques for optimal results</li>
              <li className="text-muted-foreground italic">
                How to sound smart at meetings by casually dropping these concepts into conversation
              </li>
            </ul>
          </CardContent>
        </Card>
      </BookmarkableSection>

      <div className="flex justify-between mt-8">
        {prevChapter ? (
          <Button variant="outline" asChild>
            <Link href={`/modules/${moduleId}/chapters/${prevChapter.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: {prevChapter.title}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link href={`/modules/${moduleId}/overview`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Module Overview
            </Link>
          </Button>
        )}

        {nextChapter ? (
          <Button variant="default" asChild>
            <Link href={`/modules/${moduleId}/chapters/${nextChapter.id}`}>
              Next: {nextChapter.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="default" asChild>
            <Link href={`/modules/${moduleId}/complete`}>
              Complete Module
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
