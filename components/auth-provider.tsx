"use client"

import type React from "react"
import { NextAuthProvider } from "@/components/next-auth-provider"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthProvider>{children}</NextAuthProvider>
}
