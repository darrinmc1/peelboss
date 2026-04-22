"use client"

import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <button
      type="button"
      className="text-sm"
      onClick={() => void signOut({ callbackUrl: "/login" })}
    >
      Sign Out
    </button>
  )
}
