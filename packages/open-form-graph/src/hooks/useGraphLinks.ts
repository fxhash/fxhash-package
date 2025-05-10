import { useOpenFormGraph } from "@/context/graph"
import { useColor } from "./useColor"

export function useGraphLinks() {
  const { color } = useColor()
  const { highlights, selectedNode } = useOpenFormGraph()
  return {
    linkColor: (link: { source: { id: string }; target: { id: string } }) => {
      if (!selectedNode) return color(0.3)
      const isHighlighted = highlights.links.find(l => l === link)
      return color(isHighlighted ? 0.8 : 0.1)
    },
    linkWidth: (link: { source: { id: string }; target: { id: string } }) => {
      const isHighlighted = highlights.links.find(l => l === link)
      return isHighlighted ? 1.2 : 1
    },
  }
}
