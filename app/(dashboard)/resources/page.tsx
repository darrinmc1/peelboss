"use client"

import Link from "next/link"
import { ArrowRight, FileText, MessagesSquare, BookOpen, Target, Sparkles, Star, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { listTemplates, listRolePlayScenarios } from "@/data/activities"
import { TemplateCard } from "@/components/resources/TemplateCard"
import { RolePlayCard } from "@/components/resources/RolePlayCard"

export default function ResourceHubPage() {
  const templates = listTemplates()
  const rolePlays = listRolePlayScenarios()

  const popular = [...templates].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, 3)
  const staffPicks = templates.filter((t) => t.tags?.includes("staff-pick")).slice(0, 3)

  const categories = [
    {
      id: "templates",
      title: "Templates & Worksheets",
      description: "Ready-to-use documents for your management toolkit",
      count: templates.length,
      emoji: "📄",
      href: "/resources/templates",
      accent: "from-sky-50 to-blue-100 border-sky-200",
    },
    {
      id: "roleplays",
      title: "Role-Play Scenarios",
      description: "Practice difficult conversations in a safe environment",
      count: rolePlays.length,
      emoji: "🎭",
      href: "/resources/roleplays",
      accent: "from-purple-50 to-indigo-100 border-indigo-200",
    },
    {
      id: "guides",
      title: "Guides & Frameworks",
      description: "In-depth strategic guides for complex topics",
      count: 0,
      emoji: "📘",
      href: "/resources/guides",
      accent: "from-emerald-50 to-green-100 border-emerald-200",
    },
    {
      id: "exercises",
      title: "Interactive Exercises",
      description: "Hands-on activities to build your skills",
      count: 0,
      emoji: "🎯",
      href: "/resources/exercises",
      accent: "from-amber-50 to-yellow-100 border-amber-200",
    },
  ]

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-50 p-8 text-center md:p-12">
        <div className="mx-auto max-w-2xl space-y-3">
          <p className="inline-flex items-center gap-1 rounded-full bg-amber-200/70 px-3 py-1 text-xs font-medium text-amber-900">
            <Sparkles className="h-3 w-3" />
            New
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">📚 Resource Hub</h1>
          <p className="text-muted-foreground">
            Templates, role-plays, guides, and tools to level up your leadership — all in one place.
          </p>
        </div>
      </section>

      {/* Category grid */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Browse by type</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group rounded-xl border-2 bg-gradient-to-br p-5 transition-shadow hover:shadow-md ${cat.accent}`}
            >
              <div className="mb-3 flex items-start justify-between">
                <span className="text-4xl" aria-hidden>
                  {cat.emoji}
                </span>
                {cat.count > 0 ? (
                  <Badge variant="outline" className="bg-white/70">
                    {cat.count}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-white/70 text-muted-foreground">
                    Soon
                  </Badge>
                )}
              </div>
              <h3 className="mb-1 font-semibold">{cat.title}</h3>
              <p className="text-sm text-muted-foreground">{cat.description}</p>
              <p className="mt-3 flex items-center gap-1 text-sm font-medium text-slate-700">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured role-plays */}
      {rolePlays.length > 0 && (
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">🎭 Featured role-plays</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/resources/roleplays">
                View all
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rolePlays.slice(0, 3).map((s) => (
              <RolePlayCard key={s.id} scenario={s} />
            ))}
          </div>
        </section>
      )}

      {/* Popular templates */}
      {popular.length > 0 && (
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Download className="h-5 w-5" />
              Most downloaded
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/resources/templates">
                View all templates
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popular.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </section>
      )}

      {/* Staff picks */}
      {staffPicks.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Star className="h-5 w-5 text-amber-500" />
            Staff picks
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {staffPicks.map((t) => (
              <TemplateCard key={t.id} template={t} />
            ))}
          </div>
        </section>
      )}

      {/* Premium upsell */}
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 md:p-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="mb-1 text-xl font-bold">Unlock unlimited downloads 🍌</h3>
            <p className="text-sm text-muted-foreground">
              Premium members get unlimited template downloads, premium role-plays, and priority support.
            </p>
          </div>
          <Button asChild size="lg" className="bg-amber-500 text-amber-950 hover:bg-amber-400">
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
