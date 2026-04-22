"use client"

import Link from "next/link"
import { ExternalLink, FileText, MessagesSquare, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getRolePlayScenario, getTemplate } from "@/data/activities"
import { TemplateDownloadButton } from "@/components/resources/TemplateDownloadButton"

type Props = {
  /** Template IDs from templates-catalog.json */
  templates?: string[]
  /** Role-play scenario IDs */
  rolePlays?: string[]
  /** Exercise IDs (deferred — not yet built) */
  exercises?: string[]
  ctaText?: string
  ctaLink?: string
}

export function LessonResources({
  templates = [],
  rolePlays = [],
  exercises = [],
  ctaText = "Browse all resources in the Resource Hub",
  ctaLink = "/resources",
}: Props) {
  const hasAnything = templates.length + rolePlays.length + exercises.length > 0
  if (!hasAnything) return null

  return (
    <section className="mt-8 rounded-lg border-2 border-amber-200 bg-amber-50/60 p-6">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-bold">📚 Additional Resources</h3>
        <span className="hidden sm:inline text-sm text-muted-foreground">
          Keep learning with these tools
        </span>
      </div>

      {templates.length > 0 && (
        <div className="mb-5">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900">
            <FileText className="h-4 w-4" />
            Downloadable templates
          </h4>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {templates.map((id) => {
              const t = getTemplate(id)
              if (!t) return null
              return (
                <TemplateDownloadButton
                  key={id}
                  template={t}
                  variant="compact"
                  className="justify-start"
                />
              )
            })}
          </div>
        </div>
      )}

      {rolePlays.length > 0 && (
        <div className="mb-5">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900">
            <MessagesSquare className="h-4 w-4" />
            Practice scenarios
          </h4>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {rolePlays.map((id) => {
              const s = getRolePlayScenario(id)
              if (!s) return null
              return (
                <Button key={id} asChild variant="outline" size="sm" className="justify-start">
                  <Link href={`/resources/roleplays/${id}`}>
                    <span className="mr-2" aria-hidden>
                      {s.persona.avatar}
                    </span>
                    {s.title}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {exercises.length > 0 && (
        <div className="mb-5">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900">
            <Target className="h-4 w-4" />
            Interactive exercises
          </h4>
          <p className="text-xs text-muted-foreground">Coming soon.</p>
        </div>
      )}

      <div className="border-t border-amber-200 pt-4">
        <Button asChild variant="outline" className="w-full">
          <Link href={ctaLink}>
            {ctaText}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
