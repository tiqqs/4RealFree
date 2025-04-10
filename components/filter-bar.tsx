"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useLanguage } from "@/components/language-provider-client"

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()

  // Lokale Zustandsvariablen für die ausgewählten Filter
  const [platform, setPlatform] = useState(searchParams.get("platform") || "all")
  const [category, setCategory] = useState(searchParams.get("category") || "all")
  const [sort, setSort] = useState(searchParams.get("sort") || "relevance")

  // Aktualisiere die lokalen Zustandsvariablen, wenn sich die URL-Parameter ändern
  useEffect(() => {
    setPlatform(searchParams.get("platform") || "all")
    setCategory(searchParams.get("category") || "all")
    setSort(searchParams.get("sort") || "relevance")
  }, [searchParams])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== "all" && name !== "sort") {
        params.set(name, value)
      } else if (value && name === "sort") {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams],
  )

  const handlePlatformChange = (value: string) => {
    setPlatform(value)
    if (value === "all") {
      // Remove the platform parameter from the URL
      const params = new URLSearchParams(searchParams.toString())
      params.delete("platform")
      router.push(`/?${params.toString()}`)
    } else {
      router.push(`/?${createQueryString("platform", value)}`)
    }
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    if (value === "all") {
      // Remove the category parameter from the URL
      const params = new URLSearchParams(searchParams.toString())
      params.delete("category")
      router.push(`/?${params.toString()}`)
    } else {
      router.push(`/?${createQueryString("category", value)}`)
    }
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    router.push(`/?${createQueryString("sort", value)}`)
  }

  const clearFilters = () => {
    // Setze die lokalen Zustandsvariablen zurück
    setPlatform("all")
    setCategory("all")
    setSort("relevance")

    // Navigiere zur Basis-URL ohne Parameter
    router.push("/")
  }

  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <Select value={platform} onValueChange={handlePlatformChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={t("filters", "platform")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("filters", "allPlatforms")}</SelectItem>
          <SelectItem value="pc">{t("filters", "pc")}</SelectItem>
          <SelectItem value="browser">{t("filters", "browser")}</SelectItem>
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={t("filters", "category")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("filters", "allCategories")}</SelectItem>
          <SelectItem value="mmorpg">MMORPG</SelectItem>
          <SelectItem value="shooter">Shooter</SelectItem>
          <SelectItem value="strategy">Strategy</SelectItem>
          <SelectItem value="moba">MOBA</SelectItem>
          <SelectItem value="racing">Racing</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          <SelectItem value="social">Social</SelectItem>
          <SelectItem value="sandbox">Sandbox</SelectItem>
          <SelectItem value="open-world">Open World</SelectItem>
          <SelectItem value="survival">Survival</SelectItem>
          <SelectItem value="pvp">PVP</SelectItem>
          <SelectItem value="pve">PVE</SelectItem>
          <SelectItem value="pixel">Pixel</SelectItem>
          <SelectItem value="voxel">Voxel</SelectItem>
          <SelectItem value="zombie">Zombie</SelectItem>
          <SelectItem value="turn-based">Turn Based</SelectItem>
          <SelectItem value="first-person">First Person</SelectItem>
          <SelectItem value="third-person">Third Person</SelectItem>
          <SelectItem value="top-down">Top Down</SelectItem>
          <SelectItem value="tank">Tank</SelectItem>
          <SelectItem value="space">Space</SelectItem>
          <SelectItem value="sailing">Sailing</SelectItem>
          <SelectItem value="side-scroller">Side Scroller</SelectItem>
          <SelectItem value="superhero">Superhero</SelectItem>
          <SelectItem value="permadeath">Permadeath</SelectItem>
          <SelectItem value="card">Card</SelectItem>
          <SelectItem value="battle-royale">Battle Royale</SelectItem>
          <SelectItem value="mmo">MMO</SelectItem>
          <SelectItem value="mmofps">MMOFPS</SelectItem>
          <SelectItem value="mmotps">MMOTPS</SelectItem>
          <SelectItem value="3d">3D</SelectItem>
          <SelectItem value="2d">2D</SelectItem>
          <SelectItem value="anime">Anime</SelectItem>
          <SelectItem value="fantasy">Fantasy</SelectItem>
          <SelectItem value="sci-fi">Sci-Fi</SelectItem>
          <SelectItem value="fighting">Fighting</SelectItem>
          <SelectItem value="action-rpg">Action RPG</SelectItem>
          <SelectItem value="action">Action</SelectItem>
          <SelectItem value="military">Military</SelectItem>
          <SelectItem value="martial-arts">Martial Arts</SelectItem>
          <SelectItem value="flight">Flight</SelectItem>
          <SelectItem value="low-spec">Low Spec</SelectItem>
          <SelectItem value="tower-defense">Tower Defense</SelectItem>
          <SelectItem value="horror">Horror</SelectItem>
          <SelectItem value="mmorts">MMORTS</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={t("filters", "sortBy")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">{t("filters", "relevance")}</SelectItem>
          <SelectItem value="popularity">{t("filters", "popularity")}</SelectItem>
          <SelectItem value="release-date">{t("filters", "releaseDate")}</SelectItem>
          <SelectItem value="alphabetical">{t("filters", "alphabetical")}</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="outline" onClick={clearFilters} className="gap-2">
          <X className="h-4 w-4" /> {t("filters", "clearFilters")}
        </Button>
      )}
    </div>
  )
}
