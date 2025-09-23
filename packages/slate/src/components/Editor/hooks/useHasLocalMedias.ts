import { useMemo } from "react"
import { FxTextEditorMediaFile } from "../_types"

export function isLocalFxTextMediaFile(url: string): boolean {
  return url.startsWith("data:") || url.startsWith("blob:")
}

export function useHasLocalMedias(medias: FxTextEditorMediaFile[]): boolean {
  const hasLocalMedias = useMemo(() => {
    return medias.some(media => {
      return isLocalFxTextMediaFile(media.uri)
    })
  }, [medias])
  return hasLocalMedias
}
