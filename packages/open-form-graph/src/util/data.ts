import {
  RawGraphData,
  RawNode,
  RawLink,
  Node,
  Link,
  SimLink,
  SimNode,
} from "@/_types"
import { VOID_ROOT_ID } from "@/context/constants"
import { isSimNode } from "./types"

const images: string[] = []

export function generateTree(
  maxNodes: number,
  maxChildren: number
): RawGraphData {
  const nodes: RawNode[] = []
  const links: RawLink[] = []

  let index = 0

  function createNode(label: string): RawNode {
    const isRoot = label === VOID_ROOT_ID
    const idx = isRoot ? VOID_ROOT_ID : index++
    return {
      id: idx.toString(),
      label,
      imgSrc: isRoot ? undefined : images[index % images.length],
    }
  }

  const root = createNode(VOID_ROOT_ID)
  nodes.push(root)

  const queue = [root]

  while (queue.length > 0 && nodes.length < maxNodes) {
    const parent = queue.shift()!

    const rand = Math.random()
    const biased = Math.floor(Math.pow(rand, 2) * (maxChildren + 1)) // Skew towards 0
    const childrenCount = Math.min(biased, maxChildren)

    for (let i = 0; i < childrenCount; i++) {
      if (nodes.length >= maxNodes) break

      const child = createNode(`Node ${nodes.length}`)
      nodes.push(child)
      links.push({ source: parent.id, target: child.id })
      queue.push(child)
    }
  }

  return { nodes, links }
}

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
