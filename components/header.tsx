"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Video, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthButton } from "@/components/auth-button"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Video className="h-6 w-6" />
            <span className="font-bold">Faceless Flicks</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button
              asChild
              variant={pathname === "/create" ? "default" : "ghost"}
            >
              <Link href="/create">
                <Wand2 className="mr-2 h-4 w-4" />
                Create Video
              </Link>
            </Button>
            <AuthButton />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}