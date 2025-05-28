import { RawLink, RawNode } from "@/_types"
import {
  SimulationNodeDatum,
  SimulationLinkDatum,
  Simulation,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
} from "d3-force"
import { useRef, useEffect, useMemo, useState, useCallback } from "react"
import { useTransform } from "./useTransform"
import { useCanvasDraw } from "./useCanvasDraw"

export interface NodeState {
  collapsed?: boolean
}

export interface SimNode extends RawNode, SimulationNodeDatum {
  state?: NodeState
  clusterSize?: number
}
export interface SimLink extends SimulationLinkDatum<SimNode> {}

function getChildren(id: string, links: RawLink[]): string[] {
  return links
    .filter(l => {
      const sourceId = isSimNode(l.source) ? l.source.id : l.source
      return sourceId === id
    })
    .map(link => link.target)
}

function getClusterSize(id: string, links: RawLink[]): number {
  const children = getChildren(id, links)
  return children.reduce((acc, childId) => {
    return acc + getClusterSize(childId, links)
  }, children.length || 0)
}

function hasOnlyLeafs(id: string, links: RawLink[]): boolean {
  const children = getChildren(id, links)
  return children.every(childId => getChildren(childId, links).length === 0)
}

export function isSimNode(node: SimNode | string | number): node is SimNode {
  return typeof node === "object" && "id" in node
}

function isSimLink(link: SimLink): link is SimLink {
  return (
    typeof link === "object" &&
    "source" in link &&
    typeof link.source !== "string"
  )
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

function getPrunedData(startId: string, nodes: SimNode[], links: SimLink[]) {
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

interface UseForceSimulationProps {
  rootId: string
  width: number
  height: number
  data: {
    nodes: RawNode[]
    links: RawLink[]
  }
}

export function useForceSimulation(props: UseForceSimulationProps) {
  const { data, width, height, rootId } = props

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const nodes = useRef<SimNode[]>([])
  const links = useRef<SimLink[]>([])
  const simulation = useRef<Simulation<SimNode, SimLink> | null>(null)
  const hoveredNode = useRef<SimNode | null>(null)
  const selectedNode = useRef<SimNode | null>(null)
  const subGraph = useRef<{
    nodes: SimNode[]
    links: SimLink[]
  }>({ nodes: [], links: [] })

  const fullData = useMemo(() => {
    const _links = data.links.map(l => ({ ...l }))
    const _nodes = data.nodes.map(n => ({
      ...n,
      state: {
        collapsed:
          hasOnlyLeafs(n.id, _links) && getChildren(n.id, _links).length > 0,
      },
      clusterSize: getClusterSize(n.id, _links),
    }))

    // if rootId is not in the nodes, add it
    if (!data.nodes.find(n => n.id === rootId)) {
      _nodes.push({
        id: rootId,
        state: { collapsed: false },
        clusterSize: 0,
      })
      const targetIds = new Set(_links.map(link => link.target))
      const rootNodes = _nodes.filter(node => !targetIds.has(node.id))
      for (const node of rootNodes) {
        _links.push({
          source: rootId,
          target: node.id,
        })
      }
    }
    return { nodes: _nodes, links: _links }
  }, [data])

  const { draw } = useCanvasDraw({
    width,
    height,
    nodes,
    links,
    hoveredNode,
    selectedNode,
    rootId,
    subGraph,
  })

  const { transform, transformTo } = useTransform({
    canvasRef,
    onUpdate: transform => {
      const context = canvasRef.current?.getContext("2d")
      if (!context) return
      draw(context, transform)
    },
    onMove: (x, y) => {
      const canvas = canvasRef.current
      const node = getNodeAtPosition(x, y)
      hoveredNode.current = node
      if (canvas) {
        canvas.style.cursor = node ? "pointer" : "default"
        const ctx = canvas.getContext("2d")
        if (ctx) draw(ctx, transform.current)
      }
    },
    onClick: (x, y) => {
      const canvas = canvasRef.current
      const node = getNodeAtPosition(x, y)
      if (node) {
        if (node.id === rootId) {
          selectedNode.current = null
          subGraph.current = {
            nodes: [],
            links: [],
          }
          return
        }
        if (node.state) {
          const children = getChildren(node.id, fullData.links)
          if (children.length > 0) {
            if (selectedNode?.current?.id !== node.id) {
              node.state.collapsed = false
            } else {
              node.state.collapsed = !node.state.collapsed
            }
            if (!node.state.collapsed) {
              children.forEach(childId => {
                const childNode = fullData.nodes.find(n => n.id === childId)
                if (childNode) {
                  childNode.x = node.x
                  childNode.y = node.y
                }
              })
            }
          }
        }
        resetSimulation()
        const nodePos = getNodePosition(node)
        transformTo({ x: nodePos.x, y: nodePos.y })
        subGraph.current = getNodeSubgraph(
          node.id,
          fullData.nodes,
          fullData.links,
          rootId
        )
      }
      selectedNode.current = node
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) draw(ctx, transform.current)
      }
    },
  })

  const getNodePosition = useCallback(
    (node: SimNode) => {
      const _x = node.x || 0
      const _y = node.y || 0
      const x = width / 2 - _x * transform.current.scale
      const y = height / 2 - _y * transform.current.scale
      return { x, y }
    },
    [transform.current, width, height]
  )

  const getNodeAtPosition = useCallback(
    (canvasX: number, canvasY: number) => {
      const { x: tx, y: ty, scale } = transform.current
      const x = (canvasX - tx) / scale
      const y = (canvasY - ty) / scale
      for (let node of nodes.current) {
        //TODO: use node radius instead of hardcoded value
        const r = 5 / 2
        if (node.x == null || node.y == null) continue
        const dx = node.x - x
        const dy = node.y - y
        if (dx * dx + dy * dy < r * r) {
          return node
        }
      }
      return null
    },
    [transform.current]
  )

  const resetSimulation = useCallback(() => {
    const prunedData = getPrunedData(rootId, fullData.nodes, fullData.links)
    const _openFormSimulation = forceSimulation<SimNode, SimLink>(
      prunedData.nodes
    )
      .force(
        "link",
        forceLink<SimNode, SimLink>(prunedData.links)
          .id(d => d.id)
          .distance(l => {
            if (!l.target?.state?.collapsed) return 15
            return 30
          })
          .strength(l => {
            const num = Math.min(
              prunedData.links.filter(x => x.source.id === l.source.id).length,
              prunedData.links.filter(x => x.source.id === l.target.id).length
            )
            return 1 / Math.max(num * 0.3, 1)
          })
      )
      .force("charge", forceManyBody())
      .force("center", forceCenter(width / 2, height / 2).strength(0.05))

    function _draw() {
      const context = canvasRef.current?.getContext("2d")
      if (!context) return
      draw(context, transform.current)
    }

    nodes.current = prunedData.nodes
    links.current = prunedData.links
    _openFormSimulation.on("tick", _draw)
    _openFormSimulation.on("end", () => {
      //TODO: add onEnd callback
      console.log("Simulation ended")
    })
    simulation.current = _openFormSimulation
    return _openFormSimulation
  }, [fullData, rootId, width, height, draw, transform])

  useEffect(() => {
    if (simulation.current) {
      simulation.current.stop()
      simulation.current.on("tick", null)
      simulation.current.on("end", null)
      simulation.current = null
    }

    const _openFormSimulation = resetSimulation()

    return () => {
      _openFormSimulation.stop()
      _openFormSimulation.on("tick", null)
      _openFormSimulation.on("end", null)
      simulation.current = null
    }
  }, [resetSimulation])

  return {
    simulation,
    canvasRef,
    hoveredNode,
    selectedNode,
  }
}
