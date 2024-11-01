import { memo } from "react"
import { EmbedElementProps } from "./Media"
import { getTweetIdFromUrl } from "./utils"
import { Tweet } from "react-tweet"

export const EmbedTwitter = memo<EmbedElementProps>(({ href }) => {
  const id = getTweetIdFromUrl(href) || ""

  return (
    <div className="embed-twitter not-prose">
      <Tweet id={id} />
    </div>
  )
})
