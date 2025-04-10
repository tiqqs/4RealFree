import { notFound } from "next/navigation"
import { getGameDetails } from "@/lib/api"
import { GameDetailsClient } from "@/components/game-details-client"
import { ScrollToTop } from "@/components/scroll-to-top"

export default async function GamePage({ params }: { params: { id: string } }) {
  const gameId = Number.parseInt(params.id)

  if (isNaN(gameId)) {
    notFound()
  }

  const game = await getGameDetails(gameId)

  if (!game) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <GameDetailsClient game={game} />
      <ScrollToTop />
    </main>
  )
}
