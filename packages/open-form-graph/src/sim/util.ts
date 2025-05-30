import { SimNode, SimLink } from "@/_types"
import { isSimNode } from "@/util/types"

export function getPrunedData(
  startId: string,
  nodes: SimNode[],
  links: SimLink[]
) {
  const nodesById = Object.fromEntries(nodes.map(node => [node.id, node]))
  const visibleNodes = []
  const visibleLinks = []
  const visited = new Set()

  ;(function traverseTree(node = nodesById[startId]) {
    // avoid circles
    if (!node || visited.has(node.id)) return
    visited.add(node.id)

    visibleNodes.push(node)
    if (node?.state?.collapsed) return

    const childLinks = links.filter(
      l => (isSimNode(l.source) ? l.source.id : l.source) === node.id
    )
    visibleLinks.push(...childLinks)

    childLinks
      .map(link => link.target)
      .forEach(n => traverseTree(isSimNode(n) ? n : nodesById[n.toString()]))
  })()

  return {
    nodes: visibleNodes,
    links: visibleLinks,
  }
}
