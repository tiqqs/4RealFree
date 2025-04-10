"use client"

import type React from "react"

import { useLanguage } from "@/components/language-provider-client"

interface HomeClientProps {
  gamesCount: number
  children: React.ReactNode
}

export function HomeClient({ gamesCount, children }: HomeClientProps) {
  const { t } = useLanguage()

  return (
    <>
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{t("common", "title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">{t("common", "description")}</p>
      </div>

      {gamesCount === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold">{t("common", "noGamesFound")}</h2>
          <p className="text-muted-foreground mt-2">{t("common", "tryDifferentFilters")}</p>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground mb-4">
          {gamesCount} {t("common", "gamesFound")}
        </div>
      )}

      {children}
    </>
  )
}
