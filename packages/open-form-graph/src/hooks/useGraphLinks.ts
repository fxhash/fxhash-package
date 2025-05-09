import { useGraphDataContext } from "@/context/graph";
import { useColor } from "./useColor";

export function useGraphLinks() {
  const { color } = useColor()
  const { highlights, selectedNode } = useGraphDataContext()
  return {
    linkColor: (link: { source: { id: string }; target: { id: string } }) => {
      const isHighlighted = highlights.links.find(l => l === link)
      const opacity = selectedNode && isHighlighted ? 0.4 : 0.1
      return color(opacity)
    },
    linkWidth: (link: { source: { id: string }; target: { id: string } }) => {
      const isHighlighted = highlights.links.find(l => l === link)
      return isHighlighted ? 1.2 : 1
    }
  }
}
