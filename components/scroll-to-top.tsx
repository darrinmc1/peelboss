"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // When the pathname changes, scroll to the top of the page
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
