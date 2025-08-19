import { cn } from "@fxhash/ui"
import { forwardRef, useEffect } from "react"

interface ArtworkIframeProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  onMount?: () => void
}

export const DEFAULT_IFRAME_ALLOW = [
  "accelerometer *",
  "camera *",
  "gyroscope *",
  "microphone *",
  "xr-spatial-tracking *",
].join("; ")

export const DEFAULT_IFRAME_SANDBOX = [
  "allow-scripts",
  "allow-same-origin",
  "allow-modals",
].join(" ")

export const ArtworkIframe = forwardRef<HTMLIFrameElement, ArtworkIframeProps>(
  function ArtworkIframe(props, ref) {
    const {
      className,
      allow = DEFAULT_IFRAME_ALLOW,
      sandbox = DEFAULT_IFRAME_SANDBOX,
      onMount,
      ...rest
    } = props

    useEffect(() => {
      onMount?.()
    }, [])

    return (
      <iframe
        ref={ref}
        className={cn(className)}
        allow={allow}
        sandbox={sandbox}
        {...rest}
      />
    )
  }
)
