"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { GameCard } from "@/components/game-card"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { useLanguage } from "@/components/language-provider-client"
import type { Game } from "@/lib/types"

interface GamesListProps {
  initialGames: Game[]
}

export function GamesList({ initialGames }: GamesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [displayedGames, setDisplayedGames] = useState<Game[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const gamesPerPage = 12
  const { t } = useLanguage()

  // Filtere Spiele basierend auf der Suchanfrage
  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return initialGames

    const query = searchQuery.toLowerCase().trim()
    return initialGames.filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.short_description.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query) ||
        game.platform.toLowerCase().includes(query) ||
        game.publisher.toLowerCase().includes(query) ||
        game.developer.toLowerCase().includes(query),
    )
  }, [initialGames, searchQuery])

  // Aktualisiere die angezeigten Spiele, wenn sich die gefilterten Spiele ändern
  useEffect(() => {
    setCurrentPage(1)
    setDisplayedGames(filteredGames.slice(0, gamesPerPage))
  }, [filteredGames])

  const hasMoreGames = displayedGames.length < filteredGames.length

  const loadMoreGames = () => {
    const nextPage = currentPage + 1
    const nextGames = filteredGames.slice(0, nextPage * gamesPerPage)
    setDisplayedGames(nextGames)
    setCurrentPage(nextPage)
  }

  return (
    <div className="space-y-8">
      <SearchBar onSearch={setSearchQuery} />

      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold">{t("common", "noGamesFound")}</h2>
          <p className="text-muted-foreground mt-2">{t("common", "tryDifferentSearch")}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="block h-full transform transition-transform duration-300 hover:-translate-y-1"
              >
                <GameCard game={game} />
              </Link>
            ))}
          </div>

          {hasMoreGames && (
            <div className="flex justify-center pt-4">
              <Button onClick={loadMoreGames} size="lg">
                {t("common", "loadMore")} ({filteredGames.length - displayedGames.length} {t("common", "remaining")})
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
