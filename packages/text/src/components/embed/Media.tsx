import { NamedExoticComponent } from "react"
import {
  getCodepenFromUrl,
  getOpenProcessingIdFromUrl,
  getYoutubeCodeFromUrl,
  getTweetIdFromUrl,
} from "./utils.js"
import { EmbedTwitter } from "./EmbedTwitter.js"
import { EmbedCodepen } from "./EmbedCodepen.js"
import { EmbedOpenProcessing } from "./EmbedProcessing.js"
import { EmbedSpotify } from "./EmbedSpotify.js"
import { EmbedYoutube } from "./EmbedYoutube.js"

export interface EmbedElementProps {
  href: string
  caption?: string
  className?: string
}
interface UrlPlayer {
  check: (href: string) => boolean
  component: NamedExoticComponent<EmbedElementProps>
}
export const mediaPlayers: Record<string, UrlPlayer> = {
  spotify: {
    check: href => href.startsWith("https://open.spotify.com/"),
    component: EmbedSpotify,
  },
  codepen: {
    check: href => !!getCodepenFromUrl(href),
    component: EmbedCodepen,
  },
  openProcessing: {
    check: href => !!getOpenProcessingIdFromUrl(href),
    component: EmbedOpenProcessing,
  },
  youtube: {
    check: href => !!getYoutubeCodeFromUrl(href),
    component: EmbedYoutube,
  },
  twitter: {
    check: href => !!getTweetIdFromUrl(href),
    component: EmbedTwitter,
  },
}

interface EmbedMediaProps {
  href: string
  showNotFound?: boolean
  children?: any
}
export const EmbedMediaDisplay = ({
  href,
  children,
  showNotFound,
}: EmbedMediaProps): JSX.Element => {
  const player = Object.values(mediaPlayers).find(player => {
    return player.check(href)
  })
  const EmbedMediaElement = player?.component
  return EmbedMediaElement ? (
    <EmbedMediaElement href={href} caption={children} />
  ) : (
    <>
      {showNotFound ? (
        <p contentEditable={false}>
          No embed player found for{" "}
          <a href={href} target="_blank" rel="noreferrer noopener">
            {href}
          </a>
        </p>
      ) : (
        <a href={href} target="_blank" rel="noreferrer noopener">
          {children}
        </a>
      )}
    </>
  )
}
