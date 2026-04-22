"use client"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

const topicsData = {
  leadership: {
    title: "Leadership",
    description: "Because someone has to pretend they know where the team is going while secretly Googling 'how to lead people' at 2 AM.",
    image: "/images/ceo-banana.png",
    modules: 12,
    lessons: [
      {
        title: "The Art of Confident Uncertainty",
        duration: "15 min",
        description: "Learn to say 'let's circle back on that' with the conviction of someone who definitely has a plan.",
        humorNote: "Essential for surviving Q&A sessions you didn't prepare for."
      },
      {
        title: "Managing People Who Are Smarter Than You",
        duration: "20 min",
        description: "The trick is to look like you're delegating strategically, not because you literally cannot do their job.",
        humorNote: "Formerly known as 'distributed leadership.' Now just called 'admitting defeat gracefully.'"
      },
      {
        title: "The Strategic Look",
        duration: "10 min",
        description: "Master the thousand-yard stare that makes everyone think you're processing deep strategic implications.",
        humorNote: "Actual content: Active listening. But the look helps."
      },
      {
        title: "Email Bankruptcy: A Strategic Reset",
        duration: "12 min",
        description: "When inbox zero feels like climbing Everest in flip-flops, this module teaches the 'strategic ignore' approach.",
        humorNote: "Also known as 'selective vision' or 'professional denial.'"
      },
      {
        title: "Meetings: The Necessary Evil Survival Guide",
        duration: "18 min",
        description: "How to look engaged while mentally rehearsing your grocery list.",
        humorNote: "Contains real tips. The grocery list tip is also real."
      },
      {
        title: "The Delegation Flip",
        duration: "14 min",
        description: "Turn 'I'm too busy' into 'I'm empowering my team' without changing any of your actual behavior.",
        humorNote: "Science shows this actually works. Mostly."
      },
      {
        title: "Feedback: The Corporate Horror Movie",
        duration: "20 min",
        description: "Transform the words 'let's chat' from threat to opportunity using evidence-based panic reduction.",
        humorNote: "Warning: May still cause mild sweating."
      },
      {
        title: "The Decision Matrix (When You Have No Idea)",
        duration: "15 min",
        description: "Learn to present random choices as strategic frameworks.",
        humorNote: "Includes a flowchart for flip-a-coin decisions."
      },
      {
        title: "Managing Up Without Looking Like You're Managing Up",
        duration: "16 min",
        description: "Make your manager think your ideas were their ideas. Essential political survival skill.",
        humorNote: "Formerly titled 'Executive Presence.' Renamed for honesty."
      },
      {
        title: "The Leadership Voice",
        duration: "12 min",
        description: "Practice lowering your voice three octaves and saying 'let's align on deliverables.'",
        humorNote: "Results may vary. Some people just sound like they have allergies."
      },
      {
        title: "Strategic Patience",
        duration: "11 min",
        description: "Waiting for approval, sign-offs, and budgets without visibly vibrating.",
        humorNote: "Includes breathing techniques from yoga, rebranded as 'stakeholder management.'"
      },
      {
        title: "The Vision Thing",
        duration: "18 min",
        description: "How to describe the future in terms vague enough to be safe but exciting enough to inspire.",
        humorNote: "Example: 'Let's leverage our core competencies to optimize value propositions.'"
      }
    ]
  },
  "strategic-management": {
    title: "Strategic Management",
    description: "Like chess, but with more PowerPoint, fewer rules, and a heavy tactical reliance on a Magic 8-Ball.",
    image: "/images/strategic-planning.png",
    modules: 10,
    lessons: [
      {
        title: "SWOT Analysis: Now with 50% More Obvious",
        duration: "14 min",
        description: "Learn to identify Strengths, Weaknesses, Opportunities, and Threats without putting anyone to sleep.",
        humorNote: "We've added pictures."
      },
      {
        title: "The Quarterly Roadmap: A Fiction Writing Exercise",
        duration: "16 min",
        description: "How to plan twelve weeks with the accuracy of a weather forecast three months out.",
        humorNote: "Spoiler: Nobody will remember Q1 goals by Q4 anyway."
      },
      {
        title: "Competitive Analysis Without the Espionage",
        duration: "18 min",
        description: "What you can legally learn about competitors without hiring a trenchcoat wearer.",
        humorNote: "Former spy here. The trenchcoat really isn't necessary."
      },
      {
        title: "The Strategy Cascade: Making Corporate Speak Cascade",
        duration: "12 min",
        description: "Translate 'become #1' into department goals that actually mean something.",
        humorNote: "Hint: It involves more bullets and fewer dreams."
      },
      {
        title: "OKRs: Objectives Without the RSI",
        duration: "20 min",
        description: "How to set Key Results that can actually be measured by humans with limited patience.",
        humorNote: "Warning: May cause spreadsheet addiction."
      },
      {
        title: "Strategic Alignment: Herding Cats Successfully",
        duration: "15 min",
        description: "Get everyone pulling in the same direction without the existential dread.",
        humorNote: "The cats may still judge you."
      },
      {
        title: "The Five-Year Plan: A Comedy of Optimism",
        duration: "14 min",
        description: "Learn why predicting anything beyond six months is basically hubris with a deadline.",
        humorNote: "Includes template for 'revisions we will definitely make.'"
      },
      {
        title: "Resource Allocation: The Hunger Games, Business Edition",
        duration: "18 min",
        description: "How to fight for budget without making enemies. Mostly.",
        humorNote: "May occasionally make enemies. That's just business."
      },
      {
        title: "Strategic Pivot: Saying 'We Were Wrong' Professionally",
        duration: "16 min",
        description: "The corporate version of 'my bad' without damaging your career.",
        humorNote: "Key phrase: 'In light of new data...'"
      },
      {
        title: "Strategic Reviews: The Performance Review for Plans",
        duration: "14 min",
        description: "How to judge your own plan's performance without getting defensive.",
        humorNote: "Spoiler: The plan was always flawed. That's normal."
      }
    ]
  },
  "remote-leadership": {
    title: "Remote Leadership",
    description: "Managing people you cannot physically see, touch, or passive-aggressively passive-aggressively ignore at the water cooler.",
    image: "/images/remote-leadership.png",
    modules: 8,
    lessons: [
      {
        title: "The Zoom Call: Managing Without the Handshakes",
        duration: "15 min",
        description: "How to establish authority, rapport, and cultural cohesion through a screen that makes everyone look slightly like a wanted poster.",
        humorNote: "Bonus: How to tell if someone's actually paying attention or just muted and eating lunch."
      },
      {
        title: "Async Communication: Writing Clearly When People Can't See Your Face",
        duration: "18 min",
        description: "The art of conveying tone, urgency, and existential dread through text that people will definitely misinterpret.",
        humorNote: "Spoiler: Nobody reads the 47-paragraph email. They skim the first line and hope for the best."
      },
      {
        title: "Trust Building: Proving You're Not Watching Their Screen",
        duration: "16 min",
        description: "How to demonstrate trust in remote employees without becoming the manager who gets pranked by a picture of a face on a webcam.",
        humorNote: "It happened to someone. It could happen to you. That's why we have this module."
      },
      {
        title: "Remote Onboarding: Making New Hires Feel Welcome From 3,000 Miles Away",
        duration: "17 min",
        description: "Creating connection without the awkwardness of 'let's all stand up and introduce ourselves' on day one.",
        humorNote: "Real talk: Remote onboarding is genuinely hard. This module helps."
      },
      {
        title: "The Invisible Promotion: Recognizing Achievement Without a Trophy",
        duration: "14 min",
        description: "How to celebrate wins, acknowledge effort, and make people feel valued when your high-five is just an emoji you'll regret later.",
        humorNote: "Includes a breakdown of which emojis convey genuine appreciation versus 'I'm forced to acknowledge this.'"
      },
      {
        title: "Time Zone Management: Making 'Working Hours' Mean Something",
        duration: "16 min",
        description: "Coordinating across time zones without sending messages at 3 AM or waiting four days for a response that could've been an email.",
        humorNote: "The answer is documentation. I know you don't want to hear it."
      },
      {
        title: "Zoom Fatigue: Recognizing It Without Admitting You Have It",
        duration: "12 min",
        description: "Understanding why video calls exhaust us and how to run meetings that don't feel like a hostage negotiation.",
        humorNote: "The answer involves cameras. Possibly off. I'm as tired as you are."
      },
      {
        title: "The Virtual Water Cooler: Creating Culture Without the Cooler",
        duration: "15 min",
        description: "Building team culture, trust, and human connection when your team is scattered across various time zones and laundry situations.",
        humorNote: "Optional: This module includes non-awkward virtual social event ideas. Results may vary."
      }
    ]
  },
  "project-management": {
    title: "Project Management",
    description: "The discipline of convincing stakeholders that chaos is actually a process, while secretly hoping nothing catches fire.",
    image: "/images/project-management.png",
    modules: 10,
    lessons: [
      {
        title: "The Art of the Project Plan: Writing Fiction That Inspires",
        duration: "18 min",
        description: "How to create timelines that management loves and reality will gently ignore.",
        humorNote: "Includes template for 'realistic' timeline that accounts for 'unexpected complications' which are just Tuesday."
      },
      {
        title: "Stakeholder Management: Herding Cats Who Have Opinions",
        duration: "16 min",
        description: "Keeping everyone informed, aligned, and vaguely satisfied without becoming a full-time meeting scheduler.",
        humorNote: "The secret is status updates that nobody reads but everyone pretends to appreciate."
      },
      {
        title: "Scope Creep: Identifying It Before It Identifies Your Budget",
        duration: "15 min",
        description: "Recognizing when 'small additions' become 'significant undertaking' and saying no without crying.",
        humorNote: "Spoiler: You will still say yes sometimes. That's just project management."
      },
      {
        title: "Risk Management: Planning for Disasters You Secretly Expect",
        duration: "17 min",
        description: "Documenting all the ways projects fail so that when they do, you can say 'I warned you' with documentation.",
        humorNote: "Risk register template included. Your future self will send you a fruit basket."
      },
      {
        title: "The Daily Standup: Meetings That Actually Respect Time",
        duration: "12 min",
        description: "Running standups that are brief, useful, and don't devolve into problem-solving sessions that should be emails.",
        humorNote: "The secret is follow-up. Nobody wants to do follow-up."
      },
      {
        title: "Sprint Planning: Promising Things You Know You Can't Deliver",
        duration: "16 min",
        description: "How to estimate work, manage expectations, and maintain enough credibility to keep your job.",
        humorNote: "Historical accuracy: Things will still take twice as long. At least estimate for it."
      },
      {
        title: "Retrospectives: Finding Lessons Without Assigning Blame",
        duration: "14 min",
        description: "Running reviews that actually improve things without turning into confessionals or therapy sessions.",
        humorNote: "The goal is actionable improvement, not emotional release. Though both are valid."
      },
      {
        title: "Project Documentation: Writing Things Down Before You Forget",
        duration: "15 min",
        description: "Creating docs that future maintainers will appreciate instead of the alternative: guessing.",
        humorNote: "Future you will discover you cannot remember what past you was thinking. Document everything."
      },
      {
        title: "Managing Up During a Crisis: Communication When Everything Is Fine (It's Not Fine)",
        duration: "18 min",
        description: "How to communicate status, risks, and reality to leadership without causing panic or looking incompetent.",
        humorNote: "The secret is metrics. Not feelings. Always have metrics."
      },
      {
        title: "The Project Post-Mortem: Learning Without the Blame",
        duration: "14 min",
        description: "Reviewing what happened, what went wrong, and how to prevent future disasters without making enemies.",
        humorNote: "This module will save your career at least once. Read it before you need it."
      }
    ]
  }
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = topicsData[params.slug as keyof typeof topicsData]

  if (!topic) {
    notFound()
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={topic.image}
            alt={topic.title}
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/topics"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Topics
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{topic.title}</h1>
            <p className="text-xl text-white/90 mb-4 leading-relaxed">{topic.description}</p>
            <p className="text-lg text-white/80">
              {topic.modules} modules available • All self-paced • Certificate included
            </p>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Your Progress</p>
              <div className="flex items-center gap-3">
                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-0"></div>
                </div>
                <span className="text-sm font-medium text-gray-700">0% Complete</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                <strong>0</strong> of {topic.lessons.length} lessons completed
              </span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Start Course
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {topic.lessons.map((lesson, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{lesson.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full md:self-start">
                        {lesson.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{lesson.description}</p>
                    <p className="text-sm text-blue-600 italic">{lesson.humorNote}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Not started</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Start Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Topics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Continue Exploring</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(topicsData)
              .filter((slug) => slug !== params.slug)
              .slice(0, 3)
              .map((slug) => (
                <Link key={slug} href={`/topics/${slug}`} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {topicsData[slug as keyof typeof topicsData].title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {topicsData[slug as keyof typeof topicsData].modules} modules
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
