import { memo } from "react"
import { EmbedElementProps } from "./Media.js"
import { getTweetIdFromUrl } from "./utils.js"
import { Tweet } from "react-tweet"

export const EmbedTwitter: React.NamedExoticComponent<EmbedElementProps> =
  memo<EmbedElementProps>(({ href }) => {
    const id = getTweetIdFromUrl(href) || ""

    return (
      <div className="embed-twitter not-prose">
        <Tweet id={id} />
      </div>
    )
  })
