"use client"

import { type ReactNode, useEffect, useRef } from "react"
import { BookmarkButton } from "@/components/bookmark-button"
import { useSearchParams } from "next/navigation"

interface BookmarkableSectionProps {
  id: string
  title: string
  moduleId: string
  chapterId: string
  children: ReactNode
}

export function BookmarkableSection({ id, title, moduleId, chapterId, children }: BookmarkableSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const highlightedSection = searchParams.get("section")

  useEffect(() => {
    if (highlightedSection === id && sectionRef.current) {
      // Scroll to this section if it's highlighted
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })

      // Add a temporary highlight effect
      sectionRef.current.classList.add("highlight-section")

      // Remove the highlight after animation completes
      const timer = setTimeout(() => {
        sectionRef.current?.classList.remove("highlight-section")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [highlightedSection, id])

  return (
    <div ref={sectionRef} id={id} className="relative group scroll-mt-16 transition-all duration-300">
      <div className="flex items-center gap-2">
        {children}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <BookmarkButton moduleId={moduleId} chapterId={chapterId} sectionId={id} sectionTitle={title} />
        </div>
      </div>
    </div>
  )
}
