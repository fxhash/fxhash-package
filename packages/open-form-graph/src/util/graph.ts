import { SimLink, GraphData, newGraphData } from "@/_types"
import { getNodeId } from "./types"

export function getParent(
  id: string,
  links: GraphData["links"]
): string | null {
  const linkToParent = links.maps.targetId.get(id)
  if (!linkToParent) return null
  return getNodeId(linkToParent.source)
}

export function getAllParentsUntil(
  nodeId: string,
  links: GraphData["links"],
  stopAtId?: string
): string[] {
  const parent = getParent(nodeId, links)
  if (parent === null || parent === stopAtId) return []
  return [parent, ...getAllParentsUntil(parent, links, stopAtId)]
}

export function getChildren(id: string, links: GraphData["links"]): string[] {
  return (links.maps.sourceId.get(id) || []).map(link => getNodeId(link.target))
}

export function getClusterSize(id: string, links: GraphData["links"]): number {
  const children = getChildren(id, links)
  return children.reduce((acc, childId) => {
    return acc + getClusterSize(childId, links)
  }, children.length || 0)
}

export function getNodeDepth(id: string, links: GraphData["links"]): number {
  function getDepth(id: string, depth: number): number {
    const parent = getParent(id, links)
    if (parent === null) return depth
    return getDepth(parent, depth + 1)
  }
  return getDepth(id, 0)
}

export function getRootParent(
  id: string,
  links: GraphData["links"],
  stop?: string
): string | null {
  let currentId = id
  while (true) {
    const parent = getParent(currentId, links)
    if (stop && parent === stop) return currentId
    if (parent === null) return currentId
    currentId = parent
  }
}

export function hasOnlyLeafs(id: string, links: GraphData["links"]): boolean {
  const children = getChildren(id, links)
  return children.every(childId => getChildren(childId, links).length === 0)
}

export function getNodeSubgraph(
  nodeId: string,
  nodes: GraphData["nodes"],
  links: GraphData["links"],
  rootId: string
): GraphData {
  const parentSet = new Set<string>()
  const childSet = new Set<string>()
  const subLinks = new Set<SimLink>()

  let currentId = nodeId
  while (currentId !== rootId) {
    const parentLink = links.maps.targetId.get(currentId)
    if (!parentLink) break
    const parentId = getNodeId(parentLink.source)
    if (parentSet.has(parentId)) break
    parentSet.add(parentId)
    subLinks.add(parentLink)
    currentId = parentId
  }

  function collectChildren(id: string) {
    for (const link of links.values) {
      const sourceId = getNodeId(link.source)
      const targetId = getNodeId(link.target)
      if (sourceId === id && !childSet.has(targetId)) {
        childSet.add(targetId)
        subLinks.add(link)
        collectChildren(targetId)
      }
    }
  }
  collectChildren(nodeId)

  const validIds = new Set<string>([...parentSet, nodeId, ...childSet])
  const filteredLinks = Array.from(subLinks).filter(link => {
    const sourceId = getNodeId(link.source)
    const targetId = getNodeId(link.target)
    return (
      validIds.has(sourceId.toString()) && validIds.has(targetId.toString())
    )
  })

  const allNodeIds = Array.from(validIds)
  const subNodes = allNodeIds.map(id => nodes.maps.id.get(id)!).filter(Boolean)

  return newGraphData({ nodes: subNodes, links: filteredLinks })
}
