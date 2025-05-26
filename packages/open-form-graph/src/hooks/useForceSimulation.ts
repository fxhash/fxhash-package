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

export interface SimNode extends RawNode, SimulationNodeDatum {}
export interface SimLink extends SimulationLinkDatum<SimNode> {}

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
      const ctx = canvas.getContext("2d")
      if (ctx) draw(ctx, transform.current)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleClick)
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleClick)
    }
  }, [getNodeAtPosition, draw, transform])

  useEffect(() => {
    if (simulation.current) {
      return
    }
    const _nodes = data.nodes.map(n => ({ ...n }))
    const _links = data.links.map(l => ({ ...l }))

    if (!data.nodes.find(n => n.id === rootId)) {
      _nodes.push({ id: rootId })
      const targetIds = new Set(_links.map(link => link.target))
      const rootNodes = _nodes.filter(node => !targetIds.has(node.id))
      for (const node of rootNodes) {
        _links.push({
          source: rootId,
          target: node.id,
        })
      }
    }
    const _openFormSimulation = forceSimulation<SimNode, SimLink>(_nodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(_links).id(d => d.id)
      )
      .force("charge", forceManyBody())
      .force("center", forceCenter(width / 2, height / 2))

    function _draw() {
      const context = canvasRef.current?.getContext("2d")!
      draw(context, transform.current)
    }

    _openFormSimulation.on("tick", _draw)
    _openFormSimulation.on("end", () => {
      console.log("Simulation ended")
    })
    simulation.current = _openFormSimulation
    nodes.current = _nodes
    links.current = _links
  }, [data.nodes, data.links, simulation.current, draw])

  return {
    simulation,
    canvasRef,
    hoveredNode,
    selectedNode,
  }
}
