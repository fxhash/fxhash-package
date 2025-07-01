import {
  RawGraphData,
  RawNode,
  RawLink,
  SimLink,
  SimNode,
  NestedRawNode,
} from "@/_types"
import { VOID_ROOT_ID } from "@/context/constants"
import { isSimNode } from "./types"
import { HighlightStyle } from "@/sim/_types"

export type NodeVisibility = "all" | "mine"

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

function isSpecialNode(node: SimNode): boolean {
  const state = node.state
  return !!(state?.emitterNode || state?.sessionNode || state?.rootNode)
}

export function getPrunedData(
  startId: string,
  nodes: SimNode[],
  links: SimLink[],
  highlights: HighlightStyle[] = [],
  options: { nodeVisibility?: NodeVisibility; emittedNodes: Array<string> } = {
    nodeVisibility: "all",
    emittedNodes: [],
  }
) {
  const visiblityModeFilter =
    highlights.length > 0 && options.nodeVisibility === "mine"
  const nodesById = Object.fromEntries(nodes.map(node => [node.id, node]))
  const visibleNodes = []
  const visibleLinks = []
  const visited = new Set()

  const mineFilter = (node: SimNode) =>
    !options.emittedNodes.includes(node.id) &&
    !isSpecialNode(node) &&
    !highlights.find(h => h.id === node.id)
  const liquidatedFilter = (node: SimNode) =>
    node.status === "LIQUIDATED" && !highlights.find(h => h.id === node.id)

  ;(function traverseTree(node = nodesById[startId]) {
    // avoid circles
    if (!node || visited.has(node.id)) return
    visited.add(node.id)

    // Skip liquidated nodes unless they are highlighted
    if (liquidatedFilter(node)) {
      return
    }
    // when mine mode is activated we use mineFilter to skip nodes
    if (visiblityModeFilter) {
      if (mineFilter(node)) {
        return
      }
    }

    visibleNodes.push(node)
    if (node?.state?.collapsed) return

    const childLinks = links.filter(
      l => (isSimNode(l.source) ? l.source.id : l.source) === node.id
    )

    for (const link of childLinks) {
      const targetNode = isSimNode(link.target)
        ? link.target
        : nodesById[link.target.toString()]

      // Check whether child should be included before adding link
      if (liquidatedFilter(targetNode)) {
        continue // skip adding link to liquidated non-highlighted child
      }
      // when mine mode is activated we use mineFilter to skip nodes
      if (visiblityModeFilter) {
        if (mineFilter(targetNode)) {
          continue
        }
      }

      visibleLinks.push(link)
      traverseTree(targetNode)
    }
  })()

  return {
    nodes: visibleNodes,
    links: visibleLinks,
  }
}

/**
 * Automatically identifies root nodes and builds a nested structure
 * @param nodes Array of raw nodes
 * @param links Array of links between nodes
 * @returns Array of nested nodes starting from identified roots
 */
export function buildTreeFromGraphData(
  nodes: RawNode[],
  links: RawLink[]
): NestedRawNode<RawNode>[] {
  // Create node map for faster lookups
  const nodeMap = new Map<string, RawNode>()
  nodes.forEach(node => nodeMap.set(node.id, node))

  // Create parent-child relationships
  const childrenMap = new Map<string, string[]>()
  const parentMap = new Map<string, string[]>()

  // Initialize with empty arrays
  nodes.forEach(node => {
    childrenMap.set(node.id, [])
    parentMap.set(node.id, [])
  })

  // Populate relationships based on links
  links.forEach(link => {
    // Assuming source is parent and target is child
    if (nodeMap.has(link.source) && nodeMap.has(link.target)) {
      // Add child to parent's children list
      const children = childrenMap.get(link.source) || []
      if (!children.includes(link.target)) {
        children.push(link.target)
        childrenMap.set(link.source, children)
      }

      // Add parent to child's parent list
      const parents = parentMap.get(link.target) || []
      if (!parents.includes(link.source)) {
        parents.push(link.source)
        parentMap.set(link.target, parents)
      }
    }
  })

  // Identify root nodes (nodes with no parents)
  const rootHashes: string[] = []
  nodeMap.forEach((_, hash) => {
    const parents = parentMap.get(hash) || []
    if (parents.length === 0) {
      rootHashes.push(hash)
    }
  })

  // Function to build a nested node and its descendants
  const buildNode = (
    hash: string,
    visited = new Set<string>()
  ): NestedRawNode<RawNode> | null => {
    if (visited.has(hash)) return null // Prevent circular references
    visited.add(hash)

    const node = nodeMap.get(hash)
    if (!node) return null

    const childHashes = childrenMap.get(hash) || []
    const nestedChildren: NestedRawNode<RawNode>[] = []

    childHashes.forEach(childHash => {
      const childNode = buildNode(childHash, new Set([...visited]))
      if (childNode) {
        nestedChildren.push(childNode)
      }
    })

    return {
      ...node,
      children: nestedChildren,
    }
  }

  // Build the nested structure starting from root nodes
  const result: NestedRawNode<RawNode>[] = []
  rootHashes.forEach(rootHash => {
    const nestedRoot = buildNode(rootHash)
    if (nestedRoot) {
      result.push(nestedRoot)
    }
  })

  // Handle orphaned cycles (if any) - nodes that are part of a cycle but have no root
  const processedNodes = new Set<string>()

  // Mark all nodes in the result as processed
  const markProcessed = (node: NestedRawNode<RawNode>) => {
    processedNodes.add(node.id)
    node.children.forEach(markProcessed)
  }
  result.forEach(markProcessed)

  // Find any unprocessed nodes and treat them as independent roots
  nodeMap.forEach((_, hash) => {
    if (!processedNodes.has(hash)) {
      const orphanedRoot = buildNode(hash)
      if (orphanedRoot) {
        result.push(orphanedRoot)
      }
    }
  })

  return result
}

/**
 * Recursively retrieves all parents of a node from a graph data structure
 * @param {string} nodeHash - The hash of the node to find parents for
 * @param {RawNode[]} nodes - Array of nodes in the graph
 * @param {RawLink[]} links - Array of links connecting the nodes
 * @returns {RawNode[]} - Array of parent nodes
 */
export function searchParents(
  nodeHash: string,
  nodes: RawNode[],
  links: RawLink[]
): RawNode[] {
  const visited = new Set<string>()

  function findParents(hash: string): RawNode[] {
    if (visited.has(hash)) {
      return []
    }
    visited.add(hash)

    const immediateParents = links
      .filter(link => link.target === hash)
      .map(link => link.source)

    const parentNodes = nodes.filter(node => immediateParents.includes(node.id))

    const ancestorNodes = immediateParents.flatMap(parentHash =>
      findParents(parentHash)
    )

    return [...parentNodes, ...ancestorNodes]
  }

  return findParents(nodeHash)
}
