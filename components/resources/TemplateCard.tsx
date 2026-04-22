"use client"

import { Download, FileText, Lock, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { TemplateDownloadButton } from "./TemplateDownloadButton"
import type { TemplateDefinition } from "@/types/activities"

type Props = { template: TemplateDefinition }

const FILE_TYPE_GRADIENT: Record<string, string> = {
  docx: "from-sky-100 to-blue-200",
  pdf: "from-rose-100 to-red-200",
  xlsx: "from-emerald-100 to-green-200",
  pptx: "from-orange-100 to-amber-200",
}

export function TemplateCard({ template }: Props) {
  const {
    title,
    description,
    topic,
    fileType,
    premium,
    previewImage,
    downloadCount,
    rating,
    fileAvailable,
    tags,
  } = template

  const fallbackGradient = FILE_TYPE_GRADIENT[fileType] ?? "from-amber-100 to-yellow-200"

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {/* Preview */}
      <div
        className={`relative h-40 w-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center`}
      >
        {previewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewImage} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-slate-600">
            <FileText className="h-10 w-10" aria-hidden />
            <span className="text-xs font-mono uppercase tracking-wider">{fileType}</span>
          </div>
        )}

        {premium && (
          <Badge className="absolute right-2 top-2 gap-1 bg-amber-500 text-white hover:bg-amber-500">
            <Lock className="h-3 w-3" />
            Premium
          </Badge>
        )}

        <Badge className="absolute left-2 top-2 bg-slate-900/80 text-white hover:bg-slate-900/80">
          {topic}
        </Badge>

        {!fileAvailable && (
          <Badge
            variant="outline"
            className="absolute bottom-2 left-2 border-slate-400 bg-white/90 text-slate-700"
          >
            Coming soon
          </Badge>
        )}

        {tags?.includes("staff-pick") && fileAvailable && (
          <Badge className="absolute bottom-2 left-2 bg-purple-600 hover:bg-purple-600">
            ⭐ Staff pick
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1.5 font-semibold leading-tight">{title}</h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="mb-3 mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            {formatCount(downloadCount)}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {rating.toFixed(1)}
          </span>
          <span className="font-mono uppercase">{fileType}</span>
        </div>

        <TemplateDownloadButton template={template} className="w-full" />
      </div>
    </Card>
  )
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`
  return n.toLocaleString()
}
