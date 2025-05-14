import { config } from "@fxhash/config"
import { useCallback, useMemo, useState } from "react"
import { FxTextEditorMediaFile } from "../_types"
import { isLocalFxTextMediaFile, useHasLocalMedias } from "./useHasLocalMedias"

interface UploadState {
  isUploading: boolean
  error?: string
}

interface MediaWithLoadingState extends FxTextEditorMediaFile {
  isUploading: boolean
  isLocal: boolean
  upload: () => Promise<void>
  error?: string
}

interface IUseFxTextEditorMediasProps {
  medias: FxTextEditorMediaFile[]
  onMediaUpdate: (media: FxTextEditorMediaFile, updatedUri: string) => void
}

interface IUseFxTextEditorMediasPayload {
  uploadMedias: () => Promise<void>
  hasLocalMedias: boolean
  mediasWithState: MediaWithLoadingState[]
}

export function useFxTextEditorMedias({
  medias,
  onMediaUpdate,
}: IUseFxTextEditorMediasProps): IUseFxTextEditorMediasPayload {
  const [uploadStates, setUploadStates] = useState<Record<string, UploadState>>(
    {}
  )

  const hasLocalMedias = useHasLocalMedias(medias)

  const uploadMedia = async (media: FxTextEditorMediaFile) => {
    try {
      setUploadStates(prev => ({
        ...prev,
        [media.uri]: { isUploading: true },
      }))

      const file = await (await fetch(media.uri)).blob()
      const form = new FormData()
      form.set("file", file)

      const res = await fetch(`${config.apis.file}/article/file/`, {
        method: "POST",
        body: form,
        cache: "no-cache",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Upload failed")
      }

      onMediaUpdate(media, `ipfs://${data.cid}`)

      setUploadStates(prev => ({
        ...prev,
        [media.uri]: { isUploading: false },
      }))
    } catch (error) {
      setUploadStates(prev => ({
        ...prev,
        [media.uri]: {
          isUploading: false,
          error: error instanceof Error ? error.message : "Upload failed",
        },
      }))
    }
  }

  const mediasWithState = useMemo(() => {
    return medias.map(media => ({
      ...media,
      isUploading: uploadStates[media.uri]?.isUploading || false,
      error: uploadStates[media.uri]?.error,
      isLocal: isLocalFxTextMediaFile(media.uri),
      upload: () => uploadMedia(media),
    }))
  }, [medias, uploadStates])

  const uploadMedias = useCallback(async () => {
    const uploads = mediasWithState
      .filter(media => media.isLocal)
      .map(media => media.upload())

    await Promise.all(uploads)
  }, [mediasWithState])

  return { uploadMedias, hasLocalMedias, mediasWithState }
}
