import { proxyUrl } from "@fxhash/config"
import { ReactEventHandler, useCallback, useMemo, useState } from "react"
import { IUseMediaSourcePayload, IUseMediaSourceProps } from "./_interfaces"

export const AUDIO_EXTENSIONS = ["ogg", "mp3", "mpeg", "wav", "flac"]
export const VIDEO_EXTENSIONS = ["ogg", "webm", "mp4"]
export const MEDIA_EXTENSIONS = {
  audio: AUDIO_EXTENSIONS,
  video: VIDEO_EXTENSIONS,
}

export function useMediaSource({
  type,
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

  const sourceType = useMemo(() => {
    if (!extension) return undefined
    try {
      if (MEDIA_EXTENSIONS[type].indexOf(extension) > -1)
        return `${type}/${extension}`
      return undefined
    } catch (e) {
      return undefined
    }
  }, [extension])

  return {
    type,
    sourceType,
    extension,
    url,
    error,
    onError,
    onCanPlay,
  }
}
