import { GamesList } from "@/components/games-list"
import { FilterBar } from "@/components/filter-bar"
import { ScrollToTop } from "@/components/scroll-to-top"
import { HomeClient } from "@/components/home-client"
import { getGames } from "@/lib/api"

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const platform =
    typeof searchParams.platform === "string" && searchParams.platform !== "all" ? searchParams.platform : undefined

  const category =
    typeof searchParams.category === "string" && searchParams.category !== "all" ? searchParams.category : undefined
  const sortBy = typeof searchParams.sort === "string" ? searchParams.sort : undefined

  const games = await getGames({ platform, category, sortBy })

  return (
    <main className="container mx-auto px-4 py-8">
      <HomeClient gamesCount={games.length}>
        <FilterBar />
        {games.length > 0 && <GamesList initialGames={games} />}
      </HomeClient>
      <ScrollToTop />
    </main>
  )
}
