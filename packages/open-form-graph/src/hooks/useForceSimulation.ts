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
  return links.filter(link => link.source === id).map(link => link.target)
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

function isSimNode(node: SimNode | string | number): node is SimNode {
  return typeof node === "object" && "id" in node
}

function isSimLink(link: SimLink): link is SimLink {
  return (
    typeof link === "object" &&
    "source" in link &&
    typeof link.source !== "string"
  )
}

function getPrunedData(startId: string, nodes: SimNode[], links: SimLink[]) {
  const nodesById = Object.fromEntries(nodes.map(node => [node.id, node]))
  const visibleNodes = []
  const visibleLinks = []
  const visited = new Set()

  ;(function traverseTree(node = nodesById[startId]) {
    if (!node || visited.has(node.id)) return // Add this line!
    visited.add(node.id) // And this line!

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

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const nodes = useRef<SimNode[]>([])
  const links = useRef<SimLink[]>([])
  const simulation = useRef<Simulation<SimNode, SimLink> | null>(null)

  const hoveredNode = useRef<SimNode | null>(null)
  const selectedNode = useRef<SimNode | null>(null)

  const { draw } = useCanvasDraw({
    width,
    height,
    nodes,
    links,
    hoveredNode,
    selectedNode,
    rootId,
  })

  const { transform } = useTransform({
    canvasRef,
    onUpdate: transform => {
      const context = canvasRef.current?.getContext("2d")!
      draw(context, transform)
    },
  })

  // --- Node hit test (adjust radius as needed) ---
  const getNodeAtPosition = useCallback(
    (canvasX: number, canvasY: number) => {
      // Transform mouse pos to graph coordinates
      const { x: tx, y: ty, scale } = transform.current
      const x = (canvasX - tx) / scale
      const y = (canvasY - ty) / scale
      // Check each node
      for (let node of nodes.current) {
        // default radius, or use your own node property
        const r = 5
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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const node = getNodeAtPosition(mouseX, mouseY)
      hoveredNode.current = node
      canvas.style.cursor = node ? "pointer" : "default"
      const ctx = canvas.getContext("2d")
      if (ctx) draw(ctx, transform.current)
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const node = getNodeAtPosition(mouseX, mouseY)
      selectedNode.current = node
      if (node) {
        if (node.state) {
          node.state.collapsed = !node.state.collapsed
        }
        const prunedData = getPrunedData(rootId, fullData.nodes, fullData.links)
        simulation.current?.nodes(prunedData.nodes)
        simulation.current?.force(
          "link",
          forceLink<SimNode, SimLink>(prunedData.links).id(d => d.id)
        )
        simulation.current?.alpha(0.3).restart()
        nodes.current = prunedData.nodes
        links.current = prunedData.links
      }
      const ctx = canvas.getContext("2d")
      if (ctx) draw(ctx, transform.current)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleClick)
    // --- CLEANUP ---
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleClick)
    }
  }, [getNodeAtPosition, draw, transform, fullData, rootId])

  useEffect(() => {
    if (simulation.current) {
      // --- CLEANUP ---
      simulation.current.stop()
      simulation.current.on("tick", null)
      simulation.current.on("end", null)
      simulation.current = null
    }

    const prunedData = getPrunedData(rootId, fullData.nodes, fullData.links)
    const _openFormSimulation = forceSimulation<SimNode, SimLink>(
      prunedData.nodes
    )
      .force(
        "link",
        forceLink<SimNode, SimLink>(prunedData.links).id(d => d.id)
      )
      .force("charge", forceManyBody())
      .force("center", forceCenter(width / 2, height / 2))

    function _draw() {
      const context = canvasRef.current?.getContext("2d")!
      draw(context, transform.current)
    }

    nodes.current = prunedData.nodes
    links.current = prunedData.links
    _openFormSimulation.on("tick", _draw)
    _openFormSimulation.on("end", () => {
      console.log("Simulation ended")
    })
    simulation.current = _openFormSimulation

    // --- CLEANUP for when effect re-runs or unmounts ---
    return () => {
      _openFormSimulation.stop()
      _openFormSimulation.on("tick", null)
      _openFormSimulation.on("end", null)
      simulation.current = null
    }
  }, [data.nodes, data.links, draw, fullData, rootId, width, height, transform])

  return {
    simulation,
    canvasRef,
    hoveredNode,
    selectedNode,
  }
}
