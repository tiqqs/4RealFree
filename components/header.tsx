"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Gamepad2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider-client"

export function Header() {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Gamepad2 className="h-6 w-6" />
          <span className="font-bold text-xl">{t("common", "title")}</span>
        </Link>

        <nav className="flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
