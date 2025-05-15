import { useOpenFormGraph } from "@/context/graph"
import { useColor } from "./useColor"

export function useGraphLinks() {
  const { color } = useColor()
  const { highlights, selectedNode, theme } = useOpenFormGraph()
  return {
    linkColor: (link: { source: { id: string }; target: { id: string } }) => {
      const isLight = theme === "light"
      const visible = isLight ? 0.1 : 0.15
      const opaque = isLight ? 0.05 : 0.025
      if (!selectedNode) return color(visible)
      const isHighlighted = highlights.links.find(l => l === link)
      return color(isHighlighted ? visible : opaque)
    },
    linkWidth: (link: { source: { id: string }; target: { id: string } }) => {
      const isHighlighted = highlights.links.find(l => l === link)
      return isHighlighted ? 1.2 : 1
    },
  }
}
