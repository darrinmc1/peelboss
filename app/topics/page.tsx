import Link from "next/link"
import Image from "next/image"

export default function TopicsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/business-library-management.png"
            alt="Management resources library"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Management Topics</h1>
            <p className="text-xl text-white/90 mb-4 leading-relaxed">
              Explore our comprehensive collection of management topics designed to help you develop the skills needed
              for effective leadership.
            </p>
            <p className="text-lg text-white/80 mb-8">
              Each topic includes in-depth modules, practical exercises, and real-world case studies.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Leadership",
                description:
                  "Because someone has to pretend they know where the team is going while secretly Googling 'how to lead people'.",
                image: "/images/ceo-banana.png",
                modules: 12,
                slug: "leadership",
              },
              {
                title: "Strategic Management",
                description:
                  "Like chess, but with more PowerPoint, fewer rules, and a heavy tactical reliance on a Magic 8-Ball.",
                image: "/images/strategic-planning.png",
                modules: 10,
                slug: "strategic-management",
              },
              {
                title: "Team Building",
                description:
                  "Fostering collaboration by asking everyone to build a tower out of spaghetti and one marshmallow.",
                image: "/images/ikea-team-building.png",
                modules: 8,
                slug: "team-building",
              },
              {
                title: "Communication Skills",
                description:
                  "The art of saying 'No' in 45 different professional ways that all sound like 'I'll look into it later'.",
                image: "/images/communication.png",
                modules: 9,
                slug: "communication-skills",
              },
              {
                title: "Conflict Resolution",
                description:
                  "Perfecting the 'professional smile' while mediating a dispute over who used the last of the almond milk.",
                image: "/images/conflict-resolution.png",
                modules: 7,
                slug: "conflict-resolution",
              },
              {
                title: "Change Management",
                description:
                  "Convincing your team that moving the desks 2 inches to the left will revolutionize the company culture.",
                image: "/images/change-management.png",
                modules: 8,
                slug: "change-management",
              },
              {
                title: "Performance Management",
                description:
                  "Evaluating others while hoping nobody notices that you also have 47 unread emails and a crumb on your tie.",
                image: "/images/ceo-banana.png",
                modules: 9,
                slug: "performance-management",
              },
              {
                title: "Decision Making",
                description:
                  "Learning to flip a coin with enough confidence that people actually think you have a data-driven strategy.",
                image: "/images/decision-making.png",
                modules: 6,
                slug: "decision-making",
              },
              {
                title: "Emotional Intelligence",
                description:
                  "The ability to not scream during a meeting that could have definitely been a three-sentence email.",
                image: "/images/emotional-intelligence.png",
                modules: 7,
                slug: "emotional-intelligence",
              },
              {
                title: "Time Management",
                description:
                  "Scheduling back-to-back meetings so you never actually have to do any of the work discussed in them.",
                image: "/images/time-management.png",
                modules: 6,
                slug: "time-management",
              },
              {
                title: "Delegation Skills",
                description:
                  "The high art of passing your work to someone else while calling it an 'exciting growth opportunity'.",
                image: "/images/delegation.png",
                modules: 5,
                slug: "delegation-skills",
              },
              {
                title: "Coaching & Mentoring",
                description:
                  "Telling people what to do, but in a way that makes them think they came up with the idea themselves.",
                image: "/images/coaching.png",
                modules: 8,
                slug: "coaching-mentoring",
              },
            ].map((topic, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative h-48">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {topic.modules} modules
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <Link
                    href={`/topics/${topic.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    Enroll in Chaos
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Categories */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">
              Explore our management topics organized by different areas of expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Leadership & Management",
                topics: 15,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                ),
                slug: "leadership-management",
              },
              {
                title: "Communication & Interpersonal",
                topics: 12,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                ),
                slug: "communication-interpersonal",
              },
              {
                title: "Strategic Planning",
                topics: 10,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
                slug: "strategic-planning",
              },
              {
                title: "Team Development",
                topics: 8,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                slug: "team-development",
              },
              {
                title: "Performance Management",
                topics: 9,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
                slug: "performance-management",
              },
              {
                title: "Change & Innovation",
                topics: 7,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                slug: "change-innovation",
              },
              {
                title: "Personal Development",
                topics: 11,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
                slug: "personal-development",
              },
              {
                title: "Project Management",
                topics: 8,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                ),
                slug: "project-management",
              },
            ].map((category, index) => (
              <Link
                key={index}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.topics} topics</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Your Learning Journey Today</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Access all our management topics and comprehensive training modules with a free account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Create Free Account
            </Link>
            <Link
              href="/login"
              className="inline-flex justify-center items-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
