"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider-client"
import type { Language } from "@/lib/translations"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const flags: Record<Language, { src: string; alt: string; code: string }> = {
    en: { src: "https://flagsapi.com/US/flat/24.png", alt: "US Flag", code: "US" },
    de: { src: "https://flagsapi.com/DE/flat/24.png", alt: "German Flag", code: "DE" },
    es: { src: "https://flagsapi.com/ES/flat/24.png", alt: "Spanish Flag", code: "ES" },
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 h-9 px-2">
          <Image
            src={flags[language].src || "/placeholder.svg"}
            alt={flags[language].alt}
            width={24}
            height={18}
            className="object-cover rounded-sm"
            unoptimized
          />
          <span className="font-medium">{flags[language].code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange("en")} className="flex items-center gap-2">
          <Image
            src={flags.en.src || "/placeholder.svg"}
            alt={flags.en.alt}
            width={24}
            height={18}
            className="object-cover rounded-sm"
            unoptimized
          />
          <span className="font-medium">{flags.en.code}</span> {t("languages", "en")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("de")} className="flex items-center gap-2">
          <Image
            src={flags.de.src || "/placeholder.svg"}
            alt={flags.de.alt}
            width={24}
            height={18}
            className="object-cover rounded-sm"
            unoptimized
          />
          <span className="font-medium">{flags.de.code}</span> {t("languages", "de")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange("es")} className="flex items-center gap-2">
          <Image
            src={flags.es.src || "/placeholder.svg"}
            alt={flags.es.alt}
            width={24}
            height={18}
            className="object-cover rounded-sm"
            unoptimized
          />
          <span className="font-medium">{flags.es.code}</span> {t("languages", "es")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
