"use client"

import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <BookOpen className="h-8 w-8 text-emerald-600" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">📘 Guides & Frameworks</h1>
        <p className="text-muted-foreground">
          In-depth strategic guides for complex management topics are on the way — think
          long-form walkthroughs of OKRs, compensation bands, org design, and more.
        </p>
      </div>
      <div className="rounded-lg border-2 border-dashed p-8 text-sm text-muted-foreground">
        Coming soon.
      </div>
      <Button asChild variant="outline">
        <Link href="/resources">Back to Resource Hub</Link>
      </Button>
    </div>
  )
}
