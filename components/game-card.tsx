import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monitor, Smartphone } from "lucide-react"
import type { Game } from "@/lib/types"

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={game.thumbnail || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-4 relative z-10">
        <h2 className="font-bold text-lg line-clamp-1">{game.title}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 h-10">{game.short_description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex gap-2">
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
        <Badge>{game.genre}</Badge>
      </CardFooter>
    </Card>
  )
}
