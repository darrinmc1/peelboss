"use client"

import { AlertCircle, Download, Infinity as InfinityIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FREE_DOWNLOAD_LIMIT, useBadgeStore } from "@/lib/badge-store"

/**
 * Small status card showing how many free downloads remain this month.
 * Reads directly from the badge-store so it's always in sync.
 */
export function DownloadTracker() {
  const isPremium = useBadgeStore((s) => s.isPremium)
  const templateDownloads = useBadgeStore((s) => s.templateDownloads)
  const downloadResetMonth = useBadgeStore((s) => s.downloadResetMonth)

  if (isPremium) {
    return (
      <Card className="px-4 py-2.5 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
        <div className="flex items-center gap-2">
          <InfinityIcon className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-900">Unlimited downloads</span>
        </div>
      </Card>
    )
  }

  const thisMonthKey = currentMonthKey()
  const usedThisMonth =
    downloadResetMonth === thisMonthKey
      ? templateDownloads.filter((d) => d.downloadedAt.startsWith(thisMonthKey)).length
      : 0
  const remaining = Math.max(0, FREE_DOWNLOAD_LIMIT - usedThisMonth)
  const percent = Math.min(100, (usedThisMonth / FREE_DOWNLOAD_LIMIT) * 100)

  return (
    <Card className="w-full max-w-xs p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Download className="h-3.5 w-3.5" />
          Downloads this month
        </span>
        <span className="text-xs font-semibold tabular-nums">
          {usedThisMonth} / {FREE_DOWNLOAD_LIMIT}
        </span>
      </div>
      <Progress value={percent} className="h-1.5" />
      <p
        className={`mt-2 text-xs ${
          remaining === 0 ? "flex items-center gap-1 text-rose-600" : "text-muted-foreground"
        }`}
      >
        {remaining === 0 ? (
          <>
            <AlertCircle className="h-3 w-3" />
            No downloads remaining — upgrade for unlimited.
          </>
        ) : (
          `${remaining} download${remaining !== 1 ? "s" : ""} remaining`
        )}
      </p>
    </Card>
  )
}

function currentMonthKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}
