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
  "team-building": {
    title: "Team Building",
    description: "Fostering collaboration by asking everyone to build a tower out of spaghetti and one marshmallow.",
    image: "/images/ikea-team-building.png",
    modules: 8,
    lessons: [
      {
        title: "The Trust Fall: Modernized for Skeptical Adults",
        duration: "12 min",
        description: "Why asking colleagues to fall backward is awkward and what to do instead.",
        humorNote: "Pro tip: The ground is still there. It hasn't changed."
      },
      {
        title: "Psychological Safety: The Real Version",
        duration: "18 min",
        description: "Create an environment where people can admit mistakes without immediately updating their LinkedIn.",
        humorNote: "No wellness brochures were harmed in this module."
      },
      {
        title: "The Team Charter: Getting Everyone to Agree on Something",
        duration: "15 min",
        description: "A document that explains how the team will function. And what happens when it doesn't.",
        humorNote: "Includes a section for 'how we communicate about conflict.'"
      },
      {
        title: "Conflict Resolution: The Adult Version",
        duration: "20 min",
        description: "Mediating disputes without turning into a daytime TV drama.",
        humorNote: "We promise no chair throwing."
      },
      {
        title: "Remote Team Building When Nobody Can See Anyone",
        duration: "16 min",
        description: "Virtual trust falls are somehow even more uncomfortable. Learn alternatives.",
        humorNote: "Pro tip: Mute buttons are not just for escaping."
      },
      {
        title: "The Team Dinner: Breaking Bread Without Breaking Budget",
        duration: "10 min",
        description: "How to forge bonds without expense reports that make accounting cry.",
        humorNote: "Hint: It's about the conversation, not the fifteen-dollar appetizers."
      },
      {
        title: "Recognition and Rewards: Motivating Without Money",
        duration: "14 min",
        description: "Praise is free. Learn to use it before your best employees find someone who pays.",
        humorNote: "This module is free. coincidentally."
      },
      {
        title: "Team Rituals: The Predictable Patterns That Actually Help",
        duration: "12 min",
        description: "Why knowing when meetings happen reduces anxiety more than any wellness app.",
        humorNote: "The standing meeting is still standing though. Sorry."
      }
    ]
  },
  "communication-skills": {
    title: "Communication Skills",
    description: "The art of saying 'No' in 45 different professional ways that all sound like 'I'll look into it later'.",
    image: "/images/communication.png",
    modules: 9,
    lessons: [
      {
        title: "The Gentle 'No': A PhD in Delegation",
        duration: "15 min",
        description: "Transform 'I can't' into 'Here's who can' without the guilt.",
        humorNote: "The guilt takes a separate course. Usually conducted at 3 AM."
      },
      {
        title: "Active Listening: Pretending to Care While Actually Caring",
        duration: "16 min",
        description: "Learn eye contact, nodding, and the strategic 'mhmm' that makes people think you're present.",
        humorNote: "The secret: Actually try. Revolutionary concept, we know."
      },
      {
        title: "The Art of the VC (Very Confident) Statement",
        duration: "12 min",
        description: "Say anything with enough authority that people stop asking questions.",
        humorNote: "Includes checklist for 'sounding like you know what you're talking about.'"
      },
      {
        title: "Writing Emails That Don't Get Ignored",
        duration: "18 min",
        description: "The average email gets 3 seconds of attention. Make them count.",
        humorNote: "Pro tip: Lead with the ask. Nobody reads to the third paragraph."
      },
      {
        title: "Presenting Without Panic",
        duration: "20 min",
        description: "Public speaking survival for people who practice in the shower but panic on stage.",
        humorNote: "The shower was also nervous, apparently."
      },
      {
        title: "The Difficult Conversation: Avoiding HR Until Possible",
        duration: "18 min",
        description: "Address issues before they become 'that thing everyone knows about.'",
        humorNote: "The conversation is still terrifying. But earlier is always better."
      },
      {
        title: "Non-Verbal Communication: What Your Body Says When You're Not",
        duration: "14 min",
        description: "Stop accidentally looking disinterested when you're just thinking.",
        humorNote: "The 'thinking face' reads differently to others. Science confirmed this."
      },
      {
        title: "The Art of Appropriate Honesty",
        duration: "15 min",
        description: "Tell truth without making enemies. Mostly.",
        humorNote: "Some enemies are unavoidable. That's just leadership."
      },
      {
        title: "Managing Up: Communication with Your Manager",
        duration: "16 min",
        description: "Keep your boss informed without becoming their inbox.",
        humorNote: "Boundaries are healthy. Use them."
      }
    ]
  },
  "conflict-resolution": {
    title: "Conflict Resolution",
    description: "Perfecting the 'professional smile' while mediating a dispute over who used the last of the almond milk.",
    image: "/images/conflict-resolution.png",
    modules: 7,
    lessons: [
      {
        title: "The Almond Milk Incident: Workplace Conflict 101",
        duration: "12 min",
        description: "Real conflict usually starts small. Learn to spot escalation before someone rage-quits.",
        humorNote: "The passive-aggressive Post-it note is a warning sign."
      },
      {
        title: "De-Escalation: Before It Becomes a HR Incident",
        duration: "16 min",
        description: "How to lower voices without looking weak.",
        humorNote: "Spoiler: Asking questions is more disarming than having answers."
      },
      {
        title: "The Mediator's Toolkit: When You're Not the Problem",
        duration: "18 min",
        description: "Help others resolve conflicts without picking sides or getting punched.",
        humorNote: "Punching is rare but documented. Stay alert."
      },
      {
        title: "Speaking to Anger Without Catching It",
        duration: "14 min",
        description: "Emotional contagion is real. Learn to stay neutral when others aren't.",
        humorNote: "Deep breaths. The other person is probably hangry."
      },
      {
        title: "Conflict as a Team Sport",
        duration: "15 min",
        description: "Healthy conflict leads to better decisions. Sometimes.",
        humorNote: "The 'sometimes' is doing a lot of work in that sentence."
      },
      {
        title: "The Aftermath: Repair and Rebuild",
        duration: "14 min",
        description: "What to do after conflict ends. Spoiler: Not everyone needs to be friends.",
        humorNote: "Functional is the goal. Best friends is optional."
      },
      {
        title: "When to Involve HR (And How Not to Weaponize Them)",
        duration: "16 min",
        description: "HR is a resource, not a weapon. Unless you make it one. Please don't.",
        humorNote: "This module has a quiz. The answer is usually 'communicate directly first.'"
      }
    ]
  },
  "change-management": {
    title: "Change Management",
    description: "Convincing your team that moving the desks 2 inches to the left will revolutionize the company culture.",
    image: "/images/change-management.png",
    modules: 8,
    lessons: [
      {
        title: "The Change Curve: Denial to Adoption (Mostly)",
        duration: "15 min",
        description: "Why people resist change and how to hurry up the curve.",
        humorNote: "The curve is real. Denial is always the first step."
      },
      {
        title: "Kotter's 8-Step Model: Explaining Why We Need Another Framework",
        duration: "18 min",
        description: "A model for change that doesn't require laminated posters.",
        humorNote: "We've made it into a meme. You're welcome."
      },
      {
        title: "The Resistance Is Not Personal (Even When It Feels Personal)",
        duration: "14 min",
        description: "People resist change for reasons. Most of them are logical. Learn to hear them.",
        humorNote: "The person yelling at you is usually scared. Sometimes they're just yelling."
      },
      {
        title: "Communication During Chaos",
        duration: "16 min",
        description: "Tell people what's happening before they imagine something worse.",
        humorNote: "The rumor mill is faster than your update. Facts don't stand a chance."
      },
      {
        title: "Pilot Programs: Testing Without the Commitment",
        duration: "15 min",
        description: "Try it small before you bet the farm. Unless the farm is already small.",
        humorNote: "Scale slowly. Regret scales fast."
      },
      {
        title: "The Change Champion: Recruiting the Influential",
        duration: "14 min",
        description: "Find the person everyone listens to. Make them your co-conspirator.",
        humorNote: "This works better than announcing change from the mountaintop."
      },
      {
        title: "Measuring Change Adoption",
        duration: "12 min",
        description: "How to know if your change actually worked. Spoiler: Surveys help.",
        humorNote: "Yes, more surveys. The irony is not lost on us."
      },
      {
        title: "When Change Fails: The Post-Mortem Without Blame",
        duration: "16 min",
        description: "Learn from failure without making it a witch hunt.",
        humorNote: "Blame is easy. Learning is hard. Choose hard."
      }
    ]
  },
  "performance-management": {
    title: "Performance Management",
    description: "Evaluating others while hoping nobody notices that you also have 47 unread emails and a crumb on your tie.",
    image: "/images/ceo-banana.png",
    modules: 9,
    lessons: [
      {
        title: "The Annual Review: A Time for Legal Fiction",
        duration: "18 min",
        description: "How to write a review that neither surprises nor offends.",
        humorNote: "The phrase 'room for growth' appears 47 times on average."
      },
      {
        title: "Setting Expectations Without Micromanaging",
        duration: "16 min",
        description: "Define success clearly enough to measure, vaguely enough to allow judgment.",
        humorNote: "It's a tightrope. The hammock was a lie."
      },
      {
        title: "The Feedback Sandwich: Is It Dead Yet?",
        duration: "14 min",
        description: "Why positive-negative-positive feels fake and what to do instead.",
        humorNote: "Just be honest. People can smell the bread."
      },
      {
        title: "Performance Improvement Plans: The Corporate Probation",
        duration: "18 min",
        description: "How to document underperformance without immediately causing more of it.",
        humorNote: "The goal is improvement. The paperwork is everyone's enemy."
      },
      {
        title: "Coaching Underperformers (Without the Life Coaching Vocabulary)",
        duration: "16 min",
        description: "Help people improve without becoming their therapist.",
        humorNote: "Boundaries are still important. The person is still human."
      },
      {
        title: "The Calibration Conversation",
        duration: "15 min",
        description: "Align managers on ratings before HR sees them. Chaos prevention.",
        humorNote: "This meeting is dreaded by managers worldwide. You're not alone."
      },
      {
        title: "Recognizing Excellence Without Making Others Feel Bad",
        duration: "14 min",
        description: "Reward top performers without creating a shame competition.",
        humorNote: "Pizza parties are not the answer. The answer is complicated."
      },
      {
        title: "The Promotion Conversation",
        duration: "16 min",
        description: "How to tell someone they're ready (or not ready) without losing them.",
        humorNote: "Honesty now prevents dramatic exits later."
      },
      {
        title: "Managing Your Own Performance When Nobody's Watching",
        duration: "15 min",
        description: "Self-management for people whose manager is also drowning.",
        humorNote: "This is basically just adulting. Good luck."
      }
    ]
  },
  "decision-making": {
    title: "Decision Making",
    description: "Learning to flip a coin with enough confidence that people actually think you have a data-driven strategy.",
    image: "/images/decision-making.png",
    modules: 6,
    lessons: [
      {
        title: "The Deciding Framework:RAPID",
        duration: "16 min",
        description: "Clarify who does what in decisions. Because ambiguity is the enemy of momentum.",
        humorNote: "Without clarity, nothing gets decided. Classic corporate catch-22."
      },
      {
        title: "Data-Driven Decisions: When You Have Data",
        duration: "14 min",
        description: "Use evidence without becoming its bitch.",
        humorNote: "Sometimes the data is inconclusive. That's also data."
      },
      {
        title: "The Decision Tree: Flowchart Your Way to Confidence",
        duration: "15 min",
        description: "Make choices visible so stakeholders stop debating in circles.",
        humorNote: "Circles are the natural state of corporate decisions."
      },
      {
        title: "Group Decision-Making: Avoiding Groupthink",
        duration: "16 min",
        description: "Get input without letting the loudest voice win.",
        humorNote: "The quiet person often has the best idea. Someone needs to ask them."
      },
      {
        title: "The 10-Minute Decision Rule",
        duration: "12 min",
        description: "If you can't decide in 10 minutes, you need more info or less perfectionism.",
        humorNote: "Some decisions are actually reversible. Treat accordingly."
      },
      {
        title: "Decision Documentation: Future-Proofing Your Choices",
        duration: "14 min",
        description: "Write down why you decided what. Future you will want this.",
        humorNote: "Future you is also lazy. Make it easy to understand."
      }
    ]
  },
  "emotional-intelligence": {
    title: "Emotional Intelligence",
    description: "The ability to not scream during a meeting that could have definitely been a three-sentence email.",
    image: "/images/emotional-intelligence.png",
    modules: 7,
    lessons: [
      {
        title: "Self-Awareness: Knowing You're the Problem",
        duration: "16 min",
        description: "The first step is admitting you have reactions. The second is noticing them.",
        humorNote: "Blaming others is faster. But slower in the long run."
      },
      {
        title: "Self-Regulation: The Pause Button That Works",
        duration: "15 min",
        description: "Reacting less, responding more. Like a adult.",
        humorNote: "The strategic pause is not awkward silence. It's 'processing.'"
      },
      {
        title: "Empathy: Pretending to Care About Feelings",
        duration: "14 min",
        description: "Actually care. Or at least fake it better.",
        humorNote: "Real empathy is more effective. But faking it works too."
      },
      {
        title: "Social Skills: Making Friends Without Looking Desperate",
        duration: "16 min",
        description: "Build relationships without joining a cult.",
        humorNote: "The office social committee is not a cult. Probably."
      },
      {
        title: "Reading the Room: Emotional Temperature-Taking",
        duration: "12 min",
        description: "Know when to speak, when to wait, and when to quietly exit.",
        humorNote: "This skill develops with practice. Or avoidance."
      },
      {
        title: "Managing Emotional Contagion",
        duration: "14 min",
        description: "Stop spreading panic like it's contagious. Oh wait, it is.",
        humorNote: "Your anxiety is showing. In multiple directions."
      },
      {
        title: "The EI Leadership Style",
        duration: "15 min",
        description: "Lead with emotional intelligence. Your team will thank you. Eventually.",
        humorNote: "The 'eventually' is doing a lot of work."
      }
    ]
  },
  "time-management": {
    title: "Time Management",
    description: "Scheduling back-to-back meetings so you never actually have to do any of the work discussed in them.",
    image: "/images/time-management.png",
    modules: 6,
    lessons: [
      {
        title: "The Pomodoro Technique: Productivity Through Tomatoes",
        duration: "14 min",
        description: "Work in bursts. Rest intentionally. Don't think about the tomatoes.",
        humorNote: "The technique is named after a kitchen timer. We didn't make this up."
      },
      {
        title: "Time Blocking: Calendaring Your Way to Sanity",
        duration: "16 min",
        description: "Schedule everything, including your breaks. Especially your breaks.",
        humorNote: "Meetings will expand to fill all available time. Guard your calendar."
      },
      {
        title: "The Urgent vs Important Matrix: Eisenhower's Gift",
        duration: "15 min",
        description: "Do important things before they become urgent. Avoid urgent distractions.",
        humorNote: "Pro tip: Most 'urgent' emails are not actually urgent."
      },
      {
        title: "Email Bankruptcy: When to Declare and Start Fresh",
        duration: "12 min",
        description: "Sometimes the only answer is to delete everything and start over.",
        humorNote: "This advice is extreme. We do not recommend it. Try it anyway."
      },
      {
        title: "Meeting Hygiene: Shorten Everything",
        duration: "14 min",
        description: "If it can be 30 minutes, it should not be 60. Books were wrong.",
        humorNote: "Stand-up meetings exist. Sitting is a choice."
      },
      {
        title: "The Two-Minute Rule: If It's Quick, Just Do It",
        duration: "10 min",
        description: "Small tasks pile up. Handle the small ones immediately.",
        humorNote: "This rule has been broken more than it's been followed."
      }
    ]
  },
  "delegation-skills": {
    title: "Delegation Skills",
    description: "The high art of passing your work to someone else while calling it an 'exciting growth opportunity.'",
    image: "/images/delegation.png",
    modules: 5,
    lessons: [
      {
        title: "Why Delegating Feels Like Losing",
        duration: "14 min",
        description: "Letting go of control without letting go of accountability. The eternal struggle.",
        humorNote: "Your way is not always faster. It's just more comfortable."
      },
      {
        title: "The Delegation Framework: What, Who, How, When",
        duration: "16 min",
        description: "Four questions that make delegation less scary.",
        humorNote: "The 'when' question is usually 'immediately, please.'"
      },
      {
        title: "Choosing What to Delegate",
        duration: "15 min",
        description: "Keep strategic work. Delegate the rest. Realize 'the rest' is most of it.",
        humorNote: "The work you hate is often the work someone else loves. Weird."
      },
      {
        title: "The Delegation Conversation",
        duration: "14 min",
        description: "Onboard someone without micromanaging them into quit.",
        humorNote: "Clear expectations prevent 3 AM 'what did they mean by that?' panic."
      },
      {
        title: "Letting Go Without Checking Every Five Minutes",
        duration: "16 min",
        description: "Trust without verification. This module will give you the delusion to try.",
        humorNote: "Most people want to succeed. Give them the space to do so."
      }
    ]
  },
  "coaching-mentoring": {
    title: "Coaching & Mentoring",
    description: "Telling people what to do, but in a way that makes them think they came up with the idea themselves.",
    image: "/images/coaching.png",
    modules: 8,
    lessons: [
      {
        title: "The Socratic Method: Asking Instead of Telling",
        duration: "15 min",
        description: "Help people find answers by asking questions. It's exhausting but effective.",
        humorNote: "Yes, it's faster to just tell them. No, it doesn't work as well."
      },
      {
        title: "The GROW Model: A Coaching Template That Doesn't Judge",
        duration: "16 min",
        description: "Goal, Reality, Options, Will. A structure for conversations that help.",
        humorNote: "The 'Will' step is where people actually commit. Don't skip it."
      },
      {
        title: "Mentoring vs Coaching: Knowing Which One You’re Doing",
        duration: "14 min",
        description: "Mentors share experience. Coaches ask questions. Most people need both.",
        humorNote: "Most managers think they're coaching. They're mostly telling."
      },
      {
        title: "The First Conversation",
        duration: "15 min",
        description: "Start mentoring relationships without the awkwardness.",
        humorNote: "Asking 'what do you want to learn?' is a surprisingly good start."
      },
      {
        title: "Giving Advice Without Creating Dependency",
        duration: "16 min",
        description: "Help people think for themselves. They're going to anyway.",
        humorNote: "The goal is independent thinkers. Not disciples."
      },
      {
        title: "Handling Questions You Don't Have Answers To",
        duration: "14 min",
        description: "'I don't know' is fine. 'I'll find out' is better.",
        humorNote: "Modeling curiosity is underrated. It teaches that learning never stops."
      },
      {
        title: "The Mentoring Stumbling Block: Advice Giving",
        duration: "15 min",
        description: "When to give advice versus when to ask questions.",
        humorNote: "Ask until you can't. Then advise."
      },
      {
        title: "Measuring Mentoring Success",
        duration: "12 min",
        description: "How to know if your mentoring is helping. Spoiler: Just ask.",
        humorNote: "Simple feedback beats elaborate metrics every time."
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6"
              >
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

          {/* Course Completion */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete This Course</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Finish all {topic.modules} modules and earn a certificate that proves you survived leadership training without incident.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Mark All Complete
              </button>
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Download Syllabus
              </button>
            </div>
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
                <Link
                  key={slug}
                  href={`/topics/${slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
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
