import { memo } from "react"
import { getOpenProcessingIdFromUrl } from "./utils.js"
import { EmbedElementProps } from "./Media.js"

export const EmbedOpenProcessing = memo<EmbedElementProps>(({ href }) => {
  const id = getOpenProcessingIdFromUrl(href)
  const src = `https://openprocessing.org/sketch/${id}/embed`
  return (
    <iframe
      className="embed-open-processing"
      src={src}
      width="100%"
      height="auto"
    />
  )
})

EmbedOpenProcessing.displayName = "EmbedProcessing"
