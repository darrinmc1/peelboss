"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TemplateCard } from "@/components/resources/TemplateCard"
import { DownloadTracker } from "@/components/resources/DownloadTracker"
import {
  listTemplateFileTypes,
  listTemplateTopics,
  listTemplates,
} from "@/data/activities"

type AccessFilter = "All" | "Free" | "Premium"

export default function TemplatesPage() {
  const all = useMemo(() => listTemplates(), [])
  const topics = useMemo(() => listTemplateTopics(), [])
  const fileTypes = useMemo(() => listTemplateFileTypes(), [])

  const [query, setQuery] = useState("")
  const [topic, setTopic] = useState<string>("All")
  const [fileType, setFileType] = useState<string>("All")
  const [access, setAccess] = useState<AccessFilter>("All")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all.filter((t) => {
      if (topic !== "All" && t.topic !== topic) return false
      if (fileType !== "All" && t.fileType !== fileType) return false
      if (access === "Free" && t.premium) return false
      if (access === "Premium" && !t.premium) return false
      if (q) {
        const hay = `${t.title} ${t.description} ${t.topic}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [all, query, topic, fileType, access])

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold">📄 All Templates</h1>
          <p className="mt-1 text-muted-foreground">
            Professional templates to accelerate your management work.
          </p>
        </div>
        <DownloadTracker />
      </div>

      {/* Filters */}
      <div className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <FilterSelect value={topic} onChange={setTopic} options={topics} placeholder="Topic" />
        <FilterSelect value={fileType} onChange={setFileType} options={fileTypes} placeholder="File type" />
        <FilterSelect
          value={access}
          onChange={(v) => setAccess(v as AccessFilter)}
          options={["All", "Free", "Premium"]}
          placeholder="Access"
        />
      </div>

      {/* Result count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {all.length} template{all.length === 1 ? "" : "s"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed p-12 text-center">
          <p className="text-lg font-medium">No templates match your filters</p>
          <p className="mt-1 text-sm text-muted-foreground">Try clearing a filter or searching a different term.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o === "All" ? `${placeholder}: All` : o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
