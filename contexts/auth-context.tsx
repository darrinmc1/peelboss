"use client"

import type React from "react"

import { createContext, useContext } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import type { Session, User } from "next-auth"

// Define the auth context type
interface AuthContextType {
  session: Session | null
  status: "loading" | "authenticated" | "unauthenticated"
  user: User | null
  signIn: typeof signIn
  signOut: typeof signOut
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create the auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  const value = {
    session: session ?? null,
    status,
    user: session?.user || null,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Create the useAuth hook
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

export type { Session, User }
