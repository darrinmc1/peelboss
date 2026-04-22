"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

const DEMO_PASSWORD = "password"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [email, setEmail] = useState("user@example.com")
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLogin(nextEmail = email, nextPassword = password, nextCallbackUrl = callbackUrl) {
    setIsSubmitting(true)
    setError("")

    const result = await signIn("credentials", {
      email: nextEmail,
      password: nextPassword,
      redirect: false,
      callbackUrl: nextCallbackUrl,
    })

    setIsSubmitting(false)

    if (result?.error) {
      setError("Invalid demo credentials.")
      return
    }

    router.push(result?.url || nextCallbackUrl)
    router.refresh()
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to sign in to your account</p>
        </div>
        <div className="grid gap-6">
          <form
            className="grid gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              void handleLogin()
            }}
          >
            <div className="grid gap-1">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-1">
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 w-full"
            >
              Sign In
            </button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <button
              type="button"
              onClick={() => void handleLogin("user@example.com", DEMO_PASSWORD, "/dashboard")}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Demo User
            </button>
            <button
              type="button"
              onClick={() => void handleLogin("admin@example.com", DEMO_PASSWORD, "/admin")}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Demo Admin
            </button>
          </div>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <a href="/signup" className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}
