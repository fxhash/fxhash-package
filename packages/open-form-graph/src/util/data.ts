import { RawGraphData, RawNode, RawLink, Node, Link } from "@/_types"
import { VOID_ROOT_ID } from "@/context/constants"

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

export function collectChildren(
  node: Node,
  threshold: number,
  visited = new Set<string>()
): { nodes: Node[]; links: Link[] } {
  const collectedNodes: Node[] = []
  const collectedLinks: Link[] = []

  function collect(n: Node) {
    for (const link of n.childLinks) {
      const child = link.target
      if (visited.has(child.id)) continue
      if (child.clusterSize <= threshold) {
        visited.add(child.id)
        collectedNodes.push(child)
        collectedLinks.push(link)
        collect(child)
      }
    }
  }

  collect(node)

  return { nodes: collectedNodes, links: collectedLinks }
}
