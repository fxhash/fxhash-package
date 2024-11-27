import { proxyUrl } from "@fxhash/config"
import { ReactEventHandler, useCallback, useMemo, useState } from "react"
import { IUseMediaSourcePayload, IUseMediaSourceProps } from "./_interfaces"

export const AUDIO_EXTENSIONS = ["ogg", "mp3", "mpeg", "wav", "flac"]
export const VIDEO_EXTENSIONS = ["ogg", "webm", "mp4"]

export function useMediaSource({
  src,
}: IUseMediaSourceProps): IUseMediaSourcePayload {
  const [error, setError] = useState<Error | null>(null)

  const onError = useCallback<ReactEventHandler<HTMLVideoElement>>(e => {
    setError(e as unknown as Error)
  }, [])

  const onCanPlay = useCallback<ReactEventHandler<HTMLVideoElement>>(() => {
    setError(null)
  }, [])
  const url = useMemo(() => proxyUrl(src), [src])

  const extension = useMemo(() => {
    if (!url) return undefined
    const urlObj = new URL(url)
    const splittedUrl = urlObj.pathname.split(".")
    return splittedUrl[splittedUrl.length - 1]
  }, [url])

  const media = useMemo(() => {
    if (!extension) return undefined
    try {
      if (AUDIO_EXTENSIONS.indexOf(extension) > -1)
        return { type: "audio" as const, sourceType: `audio/${extension}` }
      if (VIDEO_EXTENSIONS.indexOf(extension) > -1)
        return { type: "video" as const, sourceType: `video/${extension}` }
      return undefined
    } catch (e) {
      return undefined
    }
  }, [extension])

  return {
    type: media?.type,
    sourceType: media?.sourceType,
    extension,
    url,
    error,
    onError,
    onCanPlay,
  }
}
