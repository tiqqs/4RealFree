"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider-client"

interface SearchBarProps {
  onSearch: (query: string) => void
  initialQuery?: string
}

export function SearchBar({ onSearch, initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const { t } = useLanguage()

  // Debounce-Funktion für die Echtzeit-Suche
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, 300) // 300ms Verzögerung

    return () => clearTimeout(timer)
  }, [query, onSearch])

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("common", "searchPlaceholder")}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full p-0"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t("common", "clearSearch")}</span>
          </Button>
        )}
      </div>
    </div>
  )
}
