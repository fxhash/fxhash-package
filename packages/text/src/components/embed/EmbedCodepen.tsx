import { memo } from "react"
import { EmbedElementProps } from "./Media.js"
import { getCodepenFromUrl } from "./utils.js"

export const EmbedCodepen = memo<EmbedElementProps>(({ href }) => {
  const codepen = getCodepenFromUrl(href)
  const data = codepen
    ? {
        src: `https://codepen.io/rcyou/embed/${codepen.id}?default-tab=result`,
        author: codepen.author,
      }
    : null
  return (
    <>
      {data ? (
        <iframe
          src={data.src}
          className="embed-codepen"
          width="100%"
          height="auto"
          loading="lazy"
          allow="transparency; fullscreen"
        />
      ) : (
        <>CodePen can&apos;t be load.</>
      )}
    </>
  )
})

EmbedCodepen.displayName = "EmbedCodepen"
