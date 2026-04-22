"use client"

import type React from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ScrollToTopLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function ScrollToTopLink({ href, children, className, onClick }: ScrollToTopLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't intercept anchor links (they should work normally)
    if (href.startsWith("#")) {
      return
    }

    e.preventDefault()

    // Call the original onClick if provided
    if (onClick) {
      onClick()
    }

    // Navigate to the page
    router.push(href)

    // Scroll to top - ensure this happens immediately
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
