"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Screenshot } from "@/lib/types"

interface GameScreenshotsProps {
  screenshots: Screenshot[]
}

export function GameScreenshots({ screenshots }: GameScreenshotsProps) {
  const [selectedImage, setSelectedImage] = useState(screenshots[0]?.image || "")

  if (screenshots.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {selectedImage && (
        <div className="relative w-full rounded-lg overflow-hidden aspect-video">
          <Image src={selectedImage || "/placeholder.svg"} alt="Game screenshot" fill className="object-cover" />
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        {screenshots.map((screenshot, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(screenshot.image)}
            className={cn(
              "relative aspect-video rounded-md overflow-hidden border-2",
              selectedImage === screenshot.image ? "border-primary" : "border-transparent",
            )}
          >
            <Image
              src={screenshot.image || "/placeholder.svg"}
              alt={`Screenshot ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
