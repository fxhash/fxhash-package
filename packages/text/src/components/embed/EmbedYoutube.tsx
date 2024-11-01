import { memo } from "react"
import { EmbedElementProps } from "./Media"
import { getYoutubeCodeFromUrl } from "./utils"

export const EmbedYoutube = memo<EmbedElementProps>(({ href }) => {
  const code = getYoutubeCodeFromUrl(href)
  const embedUrl = `https://www.youtube.com/embed/${code}`
  return (
    <iframe
      className="embed-youtube"
      width="100%"
      height="auto"
      src={embedUrl}
      title="YouTube video player"
      frameBorder="0"
      sandbox="allow-same-origin allow-scripts allow-presentation"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
    />
  )
})

EmbedYoutube.displayName = "EmbedYoutube"
