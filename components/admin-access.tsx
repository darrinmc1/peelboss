"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminAccess() {
  const { data: session } = useSession()
  const router = useRouter()

  // Only show admin access if user has admin role
  if (!session || session.user.role !== "admin") {
    return null
  }

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={() => router.push("/admin")}>
      <Shield className="h-4 w-4" />
      Admin Dashboard
    </Button>
  )
}
