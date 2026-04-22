// Simple mock auth implementation that doesn't rely on external services
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Demo user data
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    password: "password",
    image: "/generic-avatar-icon.png",
    role: "user",
  },
  {
    id: "2",
    name: "Demo Admin",
    email: "admin@example.com",
    password: "password",
    image: "/generic-avatar-icon.png",
    role: "admin",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = users.find(
            (candidate) => candidate.email === credentials.email && candidate.password === credentials.password,
          )

          if (!user) {
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "DEMO_SECRET",
  debug: false,
}

// Re-export types and functions for compatibility
export type { Session, User } from "next-auth"
export { signIn, signOut, useSession } from "next-auth/react"
