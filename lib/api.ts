import type { Game, GameDetails } from "./types"

const API_BASE_URL = "https://free-to-play-games-database.p.rapidapi.com/api"

const headers = {
  "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
  "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
}

interface GetGamesOptions {
  platform?: string
  category?: string
  sortBy?: string
}

// Da die FreeToGame API keine native Paginierung unterstützt,
// implementieren wir eine clientseitige Paginierung
export async function getGames(options: GetGamesOptions = {}): Promise<Game[]> {
  try {
    const { platform, category, sortBy } = options

    const params = new URLSearchParams()
    if (platform) params.append("platform", platform)
    if (category) params.append("category", category)
    if (sortBy) params.append("sort-by", sortBy)

    const queryString = params.toString() ? `?${params.toString()}` : ""

    // If using RapidAPI (recommended for production)
    const response = await fetch(`${API_BASE_URL}/games${queryString}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    // Fallback to direct API if no RapidAPI key is provided
    if (!process.env.RAPIDAPI_KEY) {
      const directResponse = await fetch(`https://www.freetogame.com/api/games${queryString}`, {
        next: { revalidate: 3600 },
      })
      return directResponse.json()
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching games:", error)
    return []
  }
}

export async function getGameDetails(id: number): Promise<GameDetails | null> {
  try {
    // If using RapidAPI (recommended for production)
    const response = await fetch(`${API_BASE_URL}/game?id=${id}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    // Fallback to direct API if no RapidAPI key is provided
    if (!process.env.RAPIDAPI_KEY) {
      const directResponse = await fetch(`https://www.freetogame.com/api/game?id=${id}`, {
        next: { revalidate: 3600 },
      })
      return directResponse.json()
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch game details: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching game details:", error)
    return null
  }
}
