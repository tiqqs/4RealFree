"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language } from "@/lib/translations"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (section: string, key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProviderClient({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Lade die gespeicherte Sprache beim ersten Laden
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "de", "es"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // Versuche, die Browsersprache zu erkennen
      const browserLang = navigator.language.split("-")[0] as Language
      if (["en", "de", "es"].includes(browserLang)) {
        setLanguage(browserLang)
      }
    }
  }, [])

  // Speichere die Sprache, wenn sie sich ändert
  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
  }, [language])

  // Übersetzungsfunktion
  const t = (section: string, key: string): string => {
    try {
      return translations[language][section][key] || `${section}.${key}`
    } catch (error) {
      console.error(`Translation missing: ${section}.${key}`)
      return `${section}.${key}`
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
