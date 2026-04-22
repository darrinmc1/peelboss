import { notFound } from "next/navigation"
import Link from "next/link"
import { CheatSheet } from "@/components/cheat-sheet"
import { cheatSheets } from "@/data/cheat-sheets"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default async function CheatSheetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sheetData = cheatSheets[id as keyof typeof cheatSheets]

  if (!sheetData) {
    return notFound()
  }

  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-6">
        <Link href="/cheat-sheets" passHref>
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to all cheat sheets</span>
          </Button>
        </Link>
      </div>

      <CheatSheet
        title={sheetData.title}
        subtitle={sheetData.subtitle}
        sections={sheetData.sections}
        quickTips={sheetData.quickTips}
        humorousQuote={sheetData.humorousQuote}
      />
    </div>
  )
}
