import type React from "react"
import Link from "next/link"
import { SignOutButton } from "@/components/sign-out-button"

export default function AdminLayout({
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
              Peel Boss Admin
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/admin" className="text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/admin/content" className="text-sm font-medium">
                Content
              </Link>
              <Link href="/admin/users" className="text-sm font-medium">
                Users
              </Link>
              <Link href="/admin/settings" className="text-sm font-medium">
                Settings
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
    </div>
  )
}
