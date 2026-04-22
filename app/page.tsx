import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Floating banana decorations */}
        <div className="absolute top-10 left-[5%] text-6xl md:text-8xl animate-float opacity-60 select-none" aria-hidden="true">
          🍌
        </div>
        <div className="absolute top-32 right-[8%] text-5xl md:text-7xl animate-float-reverse opacity-50 select-none" aria-hidden="true">
          🍌
        </div>
        <div className="absolute bottom-20 left-[15%] text-4xl md:text-6xl animate-float-slow opacity-40 select-none" aria-hidden="true">
          🍌
        </div>
        <div className="absolute bottom-32 right-[20%] text-3xl md:text-5xl animate-float opacity-30 select-none" aria-hidden="true">
          🍌
        </div>
        <div className="absolute top-1/2 left-[45%] text-4xl animate-float-reverse opacity-20 select-none hidden lg:block" aria-hidden="true">
          🍌
        </div>

        {/* Main hero content */}
        <div className="container mx-auto px-4 relative z-10 py-16 md:py-0">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text content */}
            <div className="animate-slide-left">
              <div className="inline-flex items-center gap-2 bg-yellow-900/20 backdrop-blur-sm border border-yellow-600/30 rounded-full px-4 py-2 mb-6">
                <span className="text-lg">🍌</span>
                <span className="text-sm font-semibold text-yellow-900 tracking-wide uppercase">Leadership Training With a Twist</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-950 mb-6 leading-tight">
                Peel Back the Layers of
                <span className="block text-amber-800 mt-1">Great Leadership</span>
              </h1>

              <p className="text-lg md:text-xl text-yellow-900/80 mb-4 leading-relaxed max-w-lg">
                42 bite-sized modules. Banana-themed badges. Zero corporate jargon.
                Go from <strong>Sprout</strong> to <strong>Golden</strong> as you master the skills that actually matter.
              </p>

              {/* Quick benefits */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: "🌱", text: "5-Tier Badge System" },
                  { icon: "🎮", text: "Interactive Scenarios" },
                  { icon: "📜", text: "Certificates" },
                ].map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium text-yellow-900 border border-yellow-300/50">
                    <span>{item.icon}</span>
                    {item.text}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="inline-flex justify-center items-center px-8 py-4 text-base font-bold rounded-xl shadow-lg text-white bg-yellow-900 hover:bg-yellow-950 transition-all duration-300 hover:scale-105 animate-pulse-glow"
                >
                  Start Peeling — It's Free
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/topics"
                  className="inline-flex justify-center items-center px-8 py-4 text-base font-bold rounded-xl text-yellow-900 bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300 border-2 border-yellow-600/30 hover:border-yellow-600/60"
                >
                  Browse 42 Modules
                </Link>
              </div>
            </div>

            {/* Right: Mascot + social proof */}
            <div className="relative flex justify-center animate-slide-right">
              <div className="relative">
                {/* Glow behind mascot */}
                <div className="absolute inset-0 bg-yellow-300/40 rounded-full blur-3xl scale-75" />

                {/* Mascot image */}
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <Image
                    src="/images/ceo-banana.png"
                    alt="Top Banana - Your Chief Potassium Officer"
                    fill
                    className="object-contain drop-shadow-2xl animate-float"
                    priority
                  />
                </div>

                {/* Floating stat cards around mascot */}
                <div className="absolute -top-2 -left-4 md:left-0 bg-white rounded-xl shadow-lg px-4 py-3 animate-float-reverse border-l-4 border-yellow-500">
                  <div className="text-2xl font-extrabold text-yellow-600">42+</div>
                  <div className="text-xs text-gray-600 font-medium">Modules</div>
                </div>

                <div className="absolute top-8 -right-4 md:right-0 bg-white rounded-xl shadow-lg px-4 py-3 animate-float border-l-4 border-amber-500">
                  <div className="text-2xl font-extrabold text-amber-600">65</div>
                  <div className="text-xs text-gray-600 font-medium">Badges to Earn</div>
                </div>

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-5 py-3 animate-float-slow border-l-4 border-yellow-400">
                  <div className="text-2xl font-extrabold text-yellow-500">5</div>
                  <div className="text-xs text-gray-600 font-medium">Tiers: Sprout to Golden</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50L48 45.8C96 41.7 192 33.3 288 35.2C384 37 480 49 576 54.7C672 60.3 768 59.7 864 53.5C960 47.3 1056 35.7 1152 33.5C1248 31.3 1344 38.7 1392 42.3L1440 46V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-4xl mb-4 block">🍌</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why Risk Your Sanity with Peel Boss?</h2>
            <p className="text-xl text-gray-600">
              We provide the tools you need to build a high-performing team without losing your hair (or your mind).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border-2 border-yellow-200/60 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200/30 rounded-bl-[4rem] rounded-tr-2xl" />
              <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Truths from the Trenches</h3>
              <p className="text-gray-600 mb-4">
                Learn from industry veterans who have survived real boardrooms, failed agile transitions, and the
                Great Coffee Machine Breakdown of 2022.
              </p>
              <p className="text-gray-600">
                Our content is updated faster than your company's "return to office" policy.
              </p>
              <div className="mt-6 pt-4 border-t border-yellow-200/60">
                <span className="text-sm font-semibold text-amber-700">42 real-world modules</span>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border-2 border-yellow-200/60 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200/30 rounded-bl-[4rem] rounded-tr-2xl" />
              <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simulations of Chaos</h3>
              <p className="text-gray-600 mb-4">
                Engage with practical exercises that mirror real-world chaos, like "The Unexpected Friday Afternoon
                Deadline" or "The Reply-All Catastrophe."
              </p>
              <p className="text-gray-600">
                Apply what you learn in a safe space where the stakes are simulated but the stress is oddly familiar.
              </p>
              <div className="mt-6 pt-4 border-t border-yellow-200/60">
                <span className="text-sm font-semibold text-amber-700">Interactive role-play scenarios</span>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border-2 border-yellow-200/60 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200/30 rounded-bl-[4rem] rounded-tr-2xl" />
              <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proof You're Trying</h3>
              <p className="text-gray-600 mb-4">
                Track your progress with detailed reports that you can show your boss to prove you were actually
                working on "professional development."
              </p>
              <p className="text-gray-600">
                Receive shiny certificates that look very impressive on LinkedIn and slightly less impressive in person.
              </p>
              <div className="mt-6 pt-4 border-t border-yellow-200/60">
                <span className="text-sm font-semibold text-amber-700">65 badges across 5 tiers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message from CEO Section */}
      <section className="py-20 bg-white border-y border-yellow-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-8 md:p-12 shadow-inner border border-yellow-200/60">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
              <div className="absolute inset-0 bg-yellow-300/40 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <Image
                src="/images/ceo-banana.png"
                alt="CEO Top Banana"
                fill
                className="object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-yellow-900 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                Message from the CEO
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                "Stop Peeling Back the Layers of Stress. Just Be a Banana."
              </h2>
              <p className="text-xl text-gray-700 font-medium italic">
                - Top Banana, Founder & Chief Potassium Officer
              </p>
              <div className="prose text-lg text-gray-600">
                <p>
                  At Peel Boss, we don't believe in 'synergy' or 'pivoting.' We believe in looking yellow,
                  staying firm until Friday, and avoiding being bruised by awkward feedback sessions.
                  Join us, and let's go bananas together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Goodies & Resources Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-4xl mb-4 block">🎁</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Free Goodies to Steal
            </h2>
            <p className="text-xl text-gray-600">
              Templates, cheat sheets, role-plays, and tools you can actually use at work.
              No sign-up required for the free stuff — we're generous like that.
            </p>
          </div>

          {/* Resource Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: "📄",
                title: "Templates",
                count: "10+",
                description: "Ready-to-use worksheets, scorecards, and frameworks. Download, fill in, look competent.",
                items: ["Strategic Planning Worksheet", "Decision Matrix", "1:1 Meeting Agenda", "SMART Goals Worksheet"],
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                textColor: "text-blue-700",
                href: "/resources/templates",
              },
              {
                icon: "📋",
                title: "Cheat Sheets",
                count: "9",
                description: "One-page survival guides for when you need answers fast and your brain is on coffee fumes.",
                items: ["Leadership Styles", "Change Management", "Conflict Resolution", "Time & Productivity"],
                color: "from-emerald-500 to-emerald-600",
                bgColor: "bg-emerald-50",
                borderColor: "border-emerald-200",
                textColor: "text-emerald-700",
                href: "/cheat-sheets",
              },
              {
                icon: "🎭",
                title: "Role-Play Scenarios",
                count: "5+",
                description: "Practice awkward conversations before they happen. Branching stories with scoring.",
                items: ["Difficult Feedback", "Delegation Gone Wrong", "The Reply-All Crisis", "Conflict Mediation"],
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200",
                textColor: "text-purple-700",
                href: "/resources/roleplays",
              },
              {
                icon: "🏆",
                title: "Bonus Extras",
                count: "∞",
                description: "Quizzes, certificates, an excuse generator, and a panic button. Yes, really.",
                items: ["Leadership Quizzes", "Completion Certificates", "Excuse Generator", "The Panic Button"],
                color: "from-amber-500 to-amber-600",
                bgColor: "bg-amber-50",
                borderColor: "border-amber-200",
                textColor: "text-amber-700",
                href: "/resources",
              },
            ].map((category, i) => (
              <Link
                key={i}
                href={category.href}
                className={`group relative ${category.bgColor} rounded-2xl p-6 border-2 ${category.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Decorative corner */}
                <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${category.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{category.icon}</span>
                    <span className={`text-xs font-bold ${category.textColor} bg-white/80 rounded-full px-3 py-1`}>
                      {category.count}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{category.description}</p>

                  <ul className="space-y-1.5 mb-4">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className={`h-3.5 w-3.5 ${category.textColor} flex-shrink-0`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <span className={`inline-flex items-center gap-1 text-sm font-semibold ${category.textColor} group-hover:gap-2 transition-all`}>
                    Browse all
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Popular Downloads Showcase */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-amber-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Most Popular Downloads</h3>
                  <p className="text-gray-600 mt-1">The ones everyone grabs first. Can't blame them.</p>
                </div>
                <Link
                  href="/resources/templates"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors whitespace-nowrap"
                >
                  View all templates
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {[
                {
                  icon: "😅",
                  title: "Excuse Generator for Missed Deadlines",
                  type: "PDF",
                  typeColor: "bg-red-100 text-red-700",
                  downloads: "5,420",
                  rating: "5.0",
                  tag: "Most Downloaded",
                  tagColor: "bg-yellow-100 text-yellow-800",
                  xp: 10,
                  free: true,
                },
                {
                  icon: "🎯",
                  title: "SMART Goals Worksheet",
                  type: "PDF",
                  typeColor: "bg-red-100 text-red-700",
                  downloads: "4,102",
                  rating: "4.8",
                  tag: "Staff Pick",
                  tagColor: "bg-blue-100 text-blue-800",
                  xp: 25,
                  free: true,
                },
                {
                  icon: "💬",
                  title: "1:1 Meeting Agenda Template",
                  type: "DOCX",
                  typeColor: "bg-blue-100 text-blue-700",
                  downloads: "3,201",
                  rating: "4.8",
                  tag: "Popular",
                  tagColor: "bg-green-100 text-green-800",
                  xp: 25,
                  free: true,
                },
              ].map((template, i) => (
                <div key={i} className="p-6 hover:bg-yellow-50/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{template.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${template.tagColor}`}>
                          {template.tag}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${template.typeColor}`}>
                          {template.type}
                        </span>
                        {template.free && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            FREE
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2 leading-snug">{template.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                          </svg>
                          {template.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                          </svg>
                          {template.rating}
                        </span>
                        <span className="flex items-center gap-1 text-amber-600 font-semibold">
                          +{template.xp} XP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Free tier: <strong>2 downloads/month</strong> &middot; Premium: <strong>Unlimited</strong> &middot; Every download earns XP toward your next badge
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Survival Modules</h2>
            <p className="text-xl text-gray-600">
              Pick your poison. All modules come with a 0% guarantee that you'll actually like your job more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Leadership",
                description:
                  "Because someone has to pretend they know where the team is going while secretly Googling 'how to lead people' at 2 AM.",
                image: "/images/ceo-banana.png",
                slug: "leadership",
              },
              {
                title: "Strategic Management",
                description:
                  "Like chess, but with more PowerPoint, fewer rules, and a heavy reliance on a Magic 8-Ball.",
                image: "/images/strategic-planning.png",
                slug: "strategic-management",
              },
              {
                title: "Team Building",
                description:
                  "Fostering collaboration by asking everyone to build a tower out of spaghetti and one marshmallow.",
                image: "/images/ikea-team-building.png",
                slug: "team-building",
              },
              {
                title: "Conflict Resolution",
                description:
                  "Perfecting the 'professional smile' while mediating a dispute over who used the last of the almond milk.",
                image: "/images/conflict-resolution.png",
                slug: "conflict-resolution",
              },
              {
                title: "Communication Skills",
                description:
                  "The art of saying 'No' in 45 different professional ways that all sound like 'I'll look into it later'.",
                image: "/images/communication.png",
                slug: "communication-skills",
              },
              {
                title: "Change Management",
                description:
                  "Convincing your team that moving the desks 2 inches to the left will revolutionize the company culture.",
                image: "/images/change-management.png",
                slug: "change-management",
              },
            ].map((topic, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{topic.title}</h3>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <Link
                    href={`/topics/${topic.slug}`}
                    className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center"
                  >
                    Learn to Survive
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

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 overflow-hidden hero-gradient">
        <div className="absolute top-6 left-[10%] text-5xl animate-float opacity-40 select-none" aria-hidden="true">🍌</div>
        <div className="absolute bottom-8 right-[12%] text-4xl animate-float-reverse opacity-30 select-none" aria-hidden="true">🍌</div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-5xl mb-4 block">👑</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-950 mb-6">Ready to Go From Sprout to Golden?</h2>
          <p className="text-xl text-yellow-900/80 mb-8 max-w-2xl mx-auto">
            Join the bunch. 42 modules, 65 badges, and zero meetings that could've been emails.
          </p>
          <Link
            href="/signup"
            className="inline-flex justify-center items-center px-8 py-4 text-base font-bold rounded-xl shadow-lg text-white bg-yellow-900 hover:bg-yellow-950 transition-all duration-300 hover:scale-105"
          >
            Start Peeling — It's Free
          </Link>
        </div>
      </section>
    </div>
  )
}
