import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { AdminAccess } from "@/components/admin-access"

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Peel Boss</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/explore/categories" className="text-sm font-medium hover:text-primary">
              Categories
            </Link>
            <Link href="/#explore" className="text-sm font-medium hover:text-primary">
              Modules
            </Link>
            <Link href="/#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <AdminAccess />
          <ModeToggle />
          <Button asChild>
            <Link href="/login">Demo Access</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
