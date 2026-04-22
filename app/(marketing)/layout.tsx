import type React from "react"
import Link from "next/link"
import Image from "next/image"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const year = new Date().getFullYear()

  return (
    <div className="flex min-h-screen flex-col">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-40 border-b border-yellow-200/60 bg-white/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 flex-shrink-0">
                <Image
                  src="/images/ceo-banana.png"
                  alt="Peel Boss"
                  fill
                  className="object-contain drop-shadow group-hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>
              <span className="font-extrabold text-xl text-yellow-950 tracking-tight">
                Peel Boss
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              <Link href="/topics" className="text-sm font-semibold text-yellow-900/80 hover:text-yellow-950 transition-colors">
                Modules
              </Link>
              <Link href="/explore" className="text-sm font-semibold text-yellow-900/80 hover:text-yellow-950 transition-colors">
                Explore
              </Link>
              <Link href="/pricing" className="text-sm font-semibold text-yellow-900/80 hover:text-yellow-950 transition-colors">
                Pricing
              </Link>
              <Link href="/about" className="text-sm font-semibold text-yellow-900/80 hover:text-yellow-950 transition-colors">
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-semibold text-yellow-900/80 hover:text-yellow-950 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-yellow-900 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-yellow-950 hover:scale-[1.03] transition-all duration-200"
            >
              Start Peeling
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-yellow-950 border-t-4 border-yellow-500 text-yellow-50">
        <div className="container mx-auto px-4 py-14 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative w-10 h-10 flex-shrink-0 bg-yellow-400 rounded-full p-1 shadow-lg">
                  <Image
                    src="/images/ceo-banana.png"
                    alt="Peel Boss"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-extrabold text-lg text-yellow-50">Peel Boss</span>
              </Link>
              <p className="text-sm text-yellow-100/75 leading-relaxed mb-4">
                Leadership training with a twist. Helping managers look busy since Monday.
              </p>
              <a
                href="mailto:topbanana@peelboss.com"
                className="text-sm font-semibold text-yellow-300 hover:text-yellow-200 underline underline-offset-4 decoration-yellow-500/60"
              >
                topbanana@peelboss.com
              </a>
            </div>

            {/* Learn column */}
            <div>
              <h3 className="text-xs font-extrabold text-yellow-400 uppercase tracking-wider mb-4">
                Learn
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/topics" className="text-sm text-yellow-100/80 hover:text-yellow-50 hover:underline underline-offset-4 transition-colors">
                    All Modules
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="text-sm text-yellow-100/80 hover:text-yellow-50 hover:underline underline-offset-4 transition-colors">
                    Explore Categories
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-yellow-100/80 hover:text-yellow-50 hover:underline underline-offset-4 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-sm text-yellow-100/80 hover:text-yellow-50 hover:underline underline-offset-4 transition-colors">
                    Join the Waitlist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company column */}
            <div>
              <h3 className="text-xs font-extrabold text-yellow-400 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/about" className="text-sm text-yellow-100/80 hover:text-yellow-50 hover:underline underline-offset-4 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <a href="mailto:topbanana@peelboss.com" className="text-sm text-yellow-100/80 hover:text-yellow-50 hover:underline underline-offset-4 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <span className="text-sm text-yellow-100/40 italic">
                    Privacy — coming soon
                  </span>
                </li>
                <li>
                  <span className="text-sm text-yellow-100/40 italic">
                    Terms — coming soon
                  </span>
                </li>
              </ul>
            </div>

            {/* Sister networks column */}
            <div>
              <h3 className="text-xs font-extrabold text-yellow-400 uppercase tracking-wider mb-4">
                Sister Networks
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="https://theintelanalystacademy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-yellow-100/80 hover:text-yellow-50 hover:underline underline-offset-4 transition-colors"
                  >
                    Intel Academy ↗
                  </a>
                </li>
                <li>
                  <span className="text-sm text-yellow-100/40 italic">
                    AI Training Hub — soon
                  </span>
                </li>
                <li>
                  <span className="text-sm text-yellow-100/40 italic">
                    Cyber Academy — soon
                  </span>
                </li>
                <li>
                  <span className="text-sm text-yellow-100/40 italic">
                    OSINT Training — soon
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter callout */}
          <div className="bg-yellow-900/60 backdrop-blur-sm border-2 border-yellow-500/40 rounded-2xl p-6 md:p-8 mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-extrabold text-yellow-50 mb-1 flex items-center gap-2">
                  <span>🍌</span> Get the Banana Briefing
                </h3>
                <p className="text-sm text-yellow-100/80">
                  One email. Zero jargon. Leadership tips that don&apos;t suck.
                </p>
              </div>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-yellow-950 shadow-md hover:bg-yellow-300 hover:scale-[1.03] transition-all duration-200"
              >
                Join the Bunch →
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-yellow-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-yellow-100/60 text-center md:text-left italic">
              &copy; {year} Peel Boss. Some rights reserved, mostly we just want to go home.
            </p>
            <p className="text-xs text-yellow-100/60 italic">
              Please respond to your emails.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
