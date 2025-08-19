"use client"

import { useMediaImageSizes } from "@/hooks/useMediaImageSizes"
import { cn } from "@fxhash/ui"
import { ipfsImageLoader } from "@/lib/ipfs"
import Image from "next/image"

export interface IpfsImageProps {
  alt: string
  mediaId: string
  blurDataURL?: string
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
}

export function IpfsImage(props: IpfsImageProps) {
  const {
    mediaId,
    alt,
    blurDataURL,
    width: _width,
    height: _height,
    sizes = "(max-width: 768px) 80vw, (max-width: 1280px) 50vw, 25vw",
    className,
  } = props
  const { mode, width, height } = useMediaImageSizes({
    originalHeight: _height,
    originalWidth: _width,
  })
  return (
    <div
      className={cn(
        {
          "h-full w-auto": mode === "portrait",
          "size-full": mode !== "portrait",
        },
        "mx-auto my-auto object-contain",
        className
      )}
    >
      <Image
        loader={ipfsImageLoader}
        className={cn("size-full object-contain", className)}
        placeholder={blurDataURL === "" || !blurDataURL ? undefined : "blur"}
        blurDataURL={blurDataURL}
        height={height}
        width={width}
        loading="lazy"
        src={mediaId}
        sizes={sizes}
        alt={alt}
        fetchPriority={props.priority ? "high" : "auto"}
      />
    </div>
  )
}
