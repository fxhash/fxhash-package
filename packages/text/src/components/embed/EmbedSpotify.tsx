import { memo } from "react"
import { EmbedElementProps } from "./Media"

export const EmbedSpotify = memo<EmbedElementProps>(({ href }) => {
  const [_, path] = href.split("https://open.spotify.com/")
  const src = path.startsWith("embed")
    ? href
    : `https://open.spotify.com/embed/${path}`
  return (
    <iframe
      src={src}
      className="embed-spotify"
      width="100%"
      height="auto"
      sandbox="allow-same-origin allow-scripts"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  )
})

EmbedSpotify.displayName = "EmbedSpotify"
