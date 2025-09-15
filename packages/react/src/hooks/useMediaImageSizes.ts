export type ImageMode = "landscape" | "portrait" | "square"

export const FIXED_HEADER_HEIGHT = 654

interface IUseMediaImageProps {
  originalWidth?: number | null
  originalHeight?: number | null
  maxHeight?: number
}

interface IUseMediaImagePayload {
  mode: ImageMode
  aspectRatio: number
  width: number
  height: number
}

export function useMediaImageSizes({
  originalWidth,
  originalHeight,
  maxHeight,
}: IUseMediaImageProps): IUseMediaImagePayload {
  const originalMediaHeight = originalHeight || 1
  const originalMediaWidth = originalWidth || 1

  const mode =
    originalMediaWidth === originalMediaHeight
      ? "square"
      : originalMediaWidth > originalMediaHeight
        ? "landscape"
        : "portrait"

  const aspectRatio = originalMediaWidth / originalMediaHeight
  const adjustedWidth = (maxHeight || originalMediaHeight) * aspectRatio
  const height = maxHeight || originalMediaHeight
  const width = adjustedWidth
  return {
    mode,
    aspectRatio,
    width,
    height,
  }
}
