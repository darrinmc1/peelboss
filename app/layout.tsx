import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { NextAuthProvider } from "@/components/next-auth-provider"
import { PanicButton } from "@/components/panic-button"
import { WaitlistPopup } from "@/components/waitlist-popup"

export const metadata: Metadata = {
  title: "Peel Boss - From Sprout to Golden Leadership",
  description: "Master leadership skills with humor. Peel back the layers of management with banana-themed badges, interactive lessons, and a community that gets the joke.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
          <WaitlistPopup />
          <PanicButton />
        </NextAuthProvider>
      </body>
    </html>
  )
}
