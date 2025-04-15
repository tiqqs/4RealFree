"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Monitor, Smartphone, Info } from "lucide-react"
import { GameScreenshots } from "@/components/game-screenshots"
import { useLanguage } from "@/components/language-provider-client"
import type { GameDetails } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface GameDetailsClientProps {
  game: GameDetails
}

export function GameDetailsClient({ game }: GameDetailsClientProps) {
  const { t, language } = useLanguage()

  // Zeige den Hinweis nur an, wenn die Sprache nicht Englisch ist
  const showTranslationNotice = language !== "en"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="relative w-full rounded-lg overflow-hidden aspect-video mb-6">
          <Image src={game.thumbnail || "/placeholder.svg"} alt={game.title} fill className="object-cover" loading="eager" />
        </div>

        <GameScreenshots screenshots={game.screenshots || []} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            {t("gameDetails", "about")} {game.title}
          </h2>

          {showTranslationNotice && (
            <Alert className="mb-4 bg-muted/50 flex items-center">
              <Info className="h-4 w-4 mr-2 flex-shrink-0" />
              <AlertDescription className="m-0">{t("gameDetails", "translationNotice")}</AlertDescription>
            </Alert>
          )}

          {showTranslationNotice && (
            <h3 className="font-medium text-sm text-muted-foreground mb-2">
              {t("gameDetails", "originalDescription")}
            </h3>
          )}

          <p className="text-muted-foreground whitespace-pre-line">{game.description}</p>
        </div>

        {game.minimum_system_requirements && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{t("gameDetails", "systemRequirements")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">{t("gameDetails", "os")}</h3>
                <p className="text-muted-foreground">
                  {game.minimum_system_requirements.os || t("gameDetails", "notSpecified")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">{t("gameDetails", "processor")}</h3>
                <p className="text-muted-foreground">
                  {game.minimum_system_requirements.processor || t("gameDetails", "notSpecified")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">{t("gameDetails", "memory")}</h3>
                <p className="text-muted-foreground">
                  {game.minimum_system_requirements.memory || t("gameDetails", "notSpecified")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">{t("gameDetails", "graphics")}</h3>
                <p className="text-muted-foreground">
                  {game.minimum_system_requirements.graphics || t("gameDetails", "notSpecified")}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">{t("gameDetails", "storage")}</h3>
                <p className="text-muted-foreground">
                  {game.minimum_system_requirements.storage || t("gameDetails", "notSpecified")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <h1 className="text-3xl font-bold">{game.title}</h1>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{game.genre}</Badge>
            <Badge variant="outline">{game.platform}</Badge>
            {game.platform.includes("PC") && (
              <Badge variant="outline">
                <Monitor className="h-3 w-3 mr-1" /> PC
              </Badge>
            )}
            {game.platform.includes("Browser") && (
              <Badge variant="outline">
                <Smartphone className="h-3 w-3 mr-1" /> Browser
              </Badge>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">{t("gameDetails", "developer")}</p>
            <p className="font-medium">{game.developer}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">{t("gameDetails", "publisher")}</p>
            <p className="font-medium">{game.publisher}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">{t("gameDetails", "releaseDate")}</p>
            <p className="font-medium">{game.release_date}</p>
          </div>

          <Separator />

          <Button className="w-full" size="lg" asChild>
            <a href={game.game_url} target="_blank" rel="noopener noreferrer">
              {t("gameDetails", "playNow")} <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
