"use client"

import { useState } from "react"
import { Download, Lock, FileWarning } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBadgeStore } from "@/lib/badge-store"
import { getTemplate } from "@/data/activities"
import { Paywall, type PaywallTrigger } from "./Paywall"
import type { TemplateDefinition } from "@/types/activities"

type Props = {
  /** Provide either a templateId (looked up from the catalog) or a full template object. */
  templateId?: string
  template?: TemplateDefinition
  /** Compact variant for embedding in lesson pages. */
  variant?: "default" | "compact"
  className?: string
}

/**
 * Single source of truth for initiating a template download.
 * Gates on premium status + monthly quota via the badge-store.
 * Records the download on success.
 */
export function TemplateDownloadButton({ templateId, template, variant = "default", className }: Props) {
  const resolved = template ?? (templateId ? getTemplate(templateId) : undefined)
  const [paywall, setPaywall] = useState<PaywallTrigger | null>(null)

  const canDownload = useBadgeStore((s) => s.canDownloadTemplate)
  const recordDownload = useBadgeStore((s) => s.recordTemplateDownload)
  const completeActivity = useBadgeStore((s) => s.completeActivity)

  if (!resolved) {
    return (
      <Button disabled variant="outline" size={variant === "compact" ? "sm" : "default"} className={className}>
        <FileWarning className="mr-2 h-4 w-4" />
        Template not found
      </Button>
    )
  }

  const { filePath, premium, fileAvailable } = resolved

  const handleClick = () => {
    const check = canDownload(premium)
    if (!check.allowed) {
      setPaywall(check.reason === "premium_required" ? "premium_template" : "download_limit")
      return
    }
    if (!fileAvailable) {
      // File not yet uploaded — still gate through paywall logic but don't
      // navigate to a 404. Show a soft "coming soon" by doing nothing.
      // A toast could go here; keeping it dependency-free.
      alert(`"${resolved.title}" is coming soon — the file hasn't been uploaded yet.`)
      return
    }

    // Record + (optional) XP award. One-time XP per template per user.
    recordDownload(resolved.id)
    if (resolved.xpReward > 0 && resolved.topicId) {
      completeActivity({
        activityId: `template:${resolved.id}`,
        activityType: "exercise", // downloads log as exercise-type activities for XP routing
        topicId: resolved.topicId,
        score: 1,
        maxScore: 1,
        xpEarned: resolved.xpReward,
      })
    }

    // Trigger browser download. Using <a download> instead of window.open so
    // files that the browser can render inline (PDF) still save to disk.
    const link = document.createElement("a")
    link.href = filePath
    link.download = filePath.split("/").pop() ?? resolved.title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const isCompact = variant === "compact"

  return (
    <>
      <Button
        type="button"
        onClick={handleClick}
        variant={premium ? "default" : "outline"}
        size={isCompact ? "sm" : "default"}
        className={className}
      >
        {premium ? <Lock className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
        {isCompact ? resolved.title : premium ? "Download (Premium)" : "Download free"}
      </Button>
      {paywall && (
        <Paywall
          isOpen
          onClose={() => setPaywall(null)}
          trigger={paywall}
          resourceName={resolved.title}
        />
      )}
    </>
  )
}
