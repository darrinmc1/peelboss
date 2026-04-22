"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, FileText, Users, Settings, BarChart2, LogOut, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/admin",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/admin/modules",
      icon: BookOpen,
      label: "Modules",
    },
    {
      href: "/admin/content",
      icon: FileText,
      label: "Content",
    },
    {
      href: "/admin/users",
      icon: Users,
      label: "Users",
    },
    {
      href: "/admin/analytics",
      icon: BarChart2,
      label: "Analytics",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "Settings",
    },
  ]

  return (
    <div className="flex flex-col h-full w-64 bg-slate-800 text-white">
      <div className="p-6">
        <h1 className="text-xl font-bold">Peel Boss Admin</h1>
      </div>
      <div className="flex-1 px-4">
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-white hover:bg-slate-700",
                pathname === route.href ? "bg-slate-700 text-white" : "text-slate-300",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-700">
        <Link
          href="/logout"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-all hover:text-white hover:bg-slate-700"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Link>
      </div>
    </div>
  )
}
