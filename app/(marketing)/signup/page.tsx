"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page since signup is disabled in demo mode
    router.push("/login")
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}
