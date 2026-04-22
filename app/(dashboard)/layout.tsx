"use client"

import type React from "react"
import Link from "next/link"
import { SignOutButton } from "@/components/sign-out-button"
import { BadgeNotification } from "@/components/badges/BadgeNotification"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold">
              Peel Boss
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/modules" className="text-sm font-medium">
                Modules
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-1 text-sm font-medium"
              >
                📚 Resources
                <span className="rounded-full bg-amber-400/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-950">
                  New
                </span>
              </Link>
              <Link href="/progress" className="text-sm font-medium">
                Progress
              </Link>
              <Link href="/bookmarks" className="text-sm font-medium">
                Bookmarks
              </Link>
              <Link href="/cheat-sheets" className="text-sm font-medium">
                Cheat Sheets
              </Link>
              <Link href="/badges" className="text-sm font-medium">
                🍌 Badges
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 md:py-10">
        <div className="container px-4 md:px-6">
          {children}
        </div>
      </main>
      <BadgeNotification />
    </div>
  )
}
