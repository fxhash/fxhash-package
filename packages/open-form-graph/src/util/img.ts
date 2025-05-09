import { Link, Node } from "@/_types"
import { ForceGraphMethods } from "react-force-graph-2d"

const imageCache = new Map<string, HTMLImageElement>()

export function preloadImage(
  url: string,
  ref: React.MutableRefObject<ForceGraphMethods<Node, Link> | undefined>
): HTMLImageElement {
  if (imageCache.has(url)) return imageCache.get(url)!
  const img = new Image()
  img.src = url
  imageCache.set(url, img)
  img.onload = () => {
    // this is a hack to force the canvans to refresh
    ref?.current?.zoomToFit(1)
  }
  return img
}
