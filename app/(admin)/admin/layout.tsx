import type React from "react"
// Replace any direct imports of authOptions from the route file
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin layout content */}
      {children}
    </div>
  )
}
