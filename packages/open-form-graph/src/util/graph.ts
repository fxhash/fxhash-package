import { SimLink, RawLink, SimNode } from "@/_types"
import { isSimNode } from "./types"

export function getNodeId(n: any) {
  return typeof n === "object" && n !== null && "id" in n ? n.id : n
}

export function getChildren(id: string, links: SimLink[]): string[] {
  return links
    .filter(l => {
      const sourceId = isSimNode(l.source) ? l.source.id : l.source
      return sourceId === id
    })
    .map(link => link.target.toString())
}

export function getClusterSize(id: string, links: RawLink[]): number {
  const children = getChildren(id, links)
  return children.reduce((acc, childId) => {
    return acc + getClusterSize(childId, links)
  }, children.length || 0)
}

export function hasOnlyLeafs(id: string, links: RawLink[]): boolean {
  const children = getChildren(id, links)
  return children.every(childId => getChildren(childId, links).length === 0)
}

export function getNodeSubgraph(
  nodeId: string,
  nodes: SimNode[],
  links: SimLink[],
  rootId: string
): { nodes: SimNode[]; links: SimLink[] } {
  const nodesById = Object.fromEntries(nodes.map(n => [n.id, n]))
  const parentSet = new Set<string>()
  const childSet = new Set<string>()
  const subLinks = new Set<SimLink>()

  let currentId = nodeId
  while (currentId !== rootId) {
    const parentLink = links.find(l => {
      const targetId = isSimNode(l.target) ? l.target.id : l.target
      return targetId === currentId
    })
    if (!parentLink) break
    const parentId = isSimNode(parentLink.source)
      ? parentLink.source.id
      : parentLink.source
    if (parentSet.has(parentId.toString())) break
    parentSet.add(parentId.toString())
    subLinks.add(parentLink)
    currentId = parentId.toString()
  }

  function collectChildren(id: string) {
    for (const link of links) {
      const sourceId = isSimNode(link.source) ? link.source.id : link.source
      const targetId = isSimNode(link.target) ? link.target.id : link.target
      if (sourceId === id && !childSet.has(targetId.toString())) {
        childSet.add(targetId.toString())
        subLinks.add(link)
        collectChildren(targetId.toString())
      }
    }
  }
  collectChildren(nodeId)

  const validIds = new Set<string>([...parentSet, nodeId, ...childSet])
  const filteredLinks = Array.from(subLinks).filter(link => {
    const sourceId = isSimNode(link.source) ? link.source.id : link.source
    const targetId = isSimNode(link.target) ? link.target.id : link.target
    return (
      validIds.has(sourceId.toString()) && validIds.has(targetId.toString())
    )
  })

  const allNodeIds = Array.from(validIds)
  const subNodes = allNodeIds.map(id => nodesById[id]).filter(Boolean)

  return { nodes: subNodes, links: filteredLinks }
}
