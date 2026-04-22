"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (status === "loading") {
      return
    }

    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname || "/")}`)
    } else if (requireAdmin && session.user.role !== "admin") {
      router.push("/dashboard")
    } else {
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [pathname, requireAdmin, router, session, status])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return isAuthenticated ? <>{children}</> : null
}
