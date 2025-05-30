import { NodeState, RawLink, RawNode, SimLink, SimNode } from "@/_types"
import {
  Simulation,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
} from "d3-force"
import { useRef, useEffect, useMemo, useCallback } from "react"
import { useTransform } from "./useTransform"
import { useCanvasDraw } from "./useCanvasDraw"
import { useOpenFormGraph } from "@/provider"
import { scaleLinear } from "d3-scale"
import { isSimNode } from "@/util/types"
import {
  hasOnlyLeafs,
  getChildren,
  getClusterSize,
  getNodeSubgraph,
} from "@/util/graph"
import { loadImage } from "@/util/img"

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
  width: number
  height: number
}

export function useForceSimulation(props: UseForceSimulationProps) {
  const { width, height } = props
  const {
    rootImageSources,
    data,
    config,
    rootId,
    setSelectedNode,
    setHoveredNode,
    selectedNodeRef,
    hoveredNodeRef,
  } = useOpenFormGraph()
  const { nodeSize } = config
  const rootImages = useRef<HTMLImageElement[]>([])
  const imageCache = useRef<{ [src: string]: HTMLImageElement }>({})
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const nodes = useRef<SimNode[]>([])
  const links = useRef<SimLink[]>([])
  const simulation = useRef<Simulation<SimNode, SimLink> | null>(null)
  const subGraph = useRef<{
    nodes: SimNode[]
    links: SimLink[]
  }>({ nodes: [], links: [] })
  const clusterSizeRange = useRef<[number, number]>([0, 0])

  const fullData = useMemo<{
    nodes: SimNode[]
    links: SimLink[]
  }>(() => {
    const _links = data.links.map(l => ({ ...l }))
    const _nodes = data.nodes.map(n => ({
      ...n,
      state: {
        collapsed:
          hasOnlyLeafs(n.id, _links) && getChildren(n.id, _links).length > 1,
      } as NodeState,
      clusterSize: getClusterSize(n.id, _links),
    }))

    // if rootId is not in the nodes, add it
    if (!data.nodes.find(n => n.id === rootId)) {
      _nodes.push({
        id: rootId,
        state: { collapsed: false, image: undefined },
        clusterSize: 1,
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

  const getNodeSize = useCallback(
    (nodeId: string) => {
      if (nodeId === rootId) return nodeSize * 2
      const node = fullData.nodes.find(n => n.id === nodeId)
      const isCollapsed = !!node?.state?.collapsed
      if (isCollapsed) {
        const scale = scaleLinear()
          .domain(clusterSizeRange.current)
          .range([nodeSize, nodeSize * 3])
        return scale(node.clusterSize || 1)
      }
      const isSelected = selectedNodeRef?.current?.id === nodeId
      return isSelected ? nodeSize * 2 : nodeSize
    },
    [nodeSize, rootId, fullData]
  )

  const { draw } = useCanvasDraw({
    width,
    height,
    nodes,
    links,
    getNodeSize,
    hoveredNode: hoveredNodeRef,
    selectedNode: selectedNodeRef,
    subGraph,
    rootImages,
    clusterSizeRange,
  })

  const { transform, transformTo, trackCursor } = useTransform({
    canvasRef,
    onUpdate: transform => {
      const context = canvasRef.current?.getContext("2d")
      if (!context) return
      draw(context, transform)
    },
    onMove: (x, y) => {
      const canvas = canvasRef.current
      const node = getNodeAtPosition(x, y)
      setHoveredNode(node)
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
          setSelectedNode(null)
          subGraph.current = {
            nodes: [],
            links: [],
          }
          return
        }
        if (node.state) {
          const children = getChildren(node.id, fullData.links)
          if (children.length > 0) {
            if (selectedNodeRef?.current?.id !== node.id) {
              node.state.collapsed = false
            } else {
              node.state.collapsed = !node.state.collapsed
            }
            if (!node.state.collapsed) {
              children.forEach(childId => {
                const childNode = fullData.nodes.find(n => n.id === childId)
                if (childNode && isSimNode(childNode)) {
                  if (!childNode.x || childNode.x === 0)
                    childNode.x = (node.x || width / 2) + Math.random() * 50 - 5
                  if (!childNode.y || childNode.y === 0)
                    childNode.y =
                      (node.y || height / 2) + Math.random() * 50 - 5
                }
              })
            }
          }
        }
        resetSimulation()
        subGraph.current = getNodeSubgraph(
          node.id,
          fullData.nodes,
          fullData.links,
          rootId
        )
        const nodePos = getNodeScreenPosition(node)
        console.log(node, nodePos)
        transformTo({ x: nodePos.x, y: nodePos.y })
      }
      setSelectedNode(node)
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) draw(ctx, transform.current)
      }
    },
  })

  const getNodeScreenPosition = useCallback(
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
        const r = getNodeSize(node.id) / 2
        if (node.x == null || node.y == null) continue
        const dx = node.x - x
        const dy = node.y - y
        if (dx * dx + dy * dy < r * r) {
          return node
        }
      }
      return null
    },
    [transform.current, getNodeSize, nodes.current]
  )

  const resetSimulation = useCallback(() => {
    const prunedData = getPrunedData(rootId, fullData.nodes, fullData.links)
    clusterSizeRange.current = prunedData.nodes
      .filter(n => n.state?.collapsed)
      .reduce(
        (acc, node) => [
          Math.min(acc[0], node.clusterSize || 1),
          Math.max(acc[1], node.clusterSize || 1),
        ],
        [Infinity, -Infinity] as [number, number]
      )
    const _openFormSimulation = forceSimulation<SimNode, SimLink>(
      prunedData.nodes
    )
      .force(
        "link",
        forceLink<SimNode, SimLink>(prunedData.links)
          .id(d => d.id)
          .distance(l => {
            if (isSimNode(l.target) && !l.target?.state?.collapsed)
              return nodeSize
            return nodeSize * 3
          })
          .strength(l => {
            return 0.6
            const num = Math.min(
              prunedData.links.filter(x => x.source.id === l.source.id).length,
              prunedData.links.filter(x => x.source.id === l.target.id).length
            )
            return 1 / Math.max(num * 0.3, 1)
          })
      )
      .force(
        "charge",
        forceManyBody().strength(() => {
          return -130
        })
      )
      .force("center", forceCenter(width / 2, height / 2).strength(0.01))

    function _draw() {
      const context = canvasRef.current?.getContext("2d")
      if (!context) return
      trackCursor()
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
  }, [fullData, rootId, width, height, draw, transform, nodeSize, trackCursor])

  useEffect(() => {
    if (!fullData) return
    fullData.nodes.forEach(node => {
      if (node.imgSrc && !imageCache.current[node.imgSrc]) {
        loadImage(node.imgSrc).then(img => {
          imageCache.current[node.imgSrc!] = img
          node.state = node.state || {}
          node.state.image = img
          // TODO: determine if need to redraw the canvas
          // const ctx = canvasRef.current?.getContext("2d")
          // if (ctx) draw(ctx, transform.current)
        })
      }
    })
  }, [fullData, draw, transform])

  useEffect(() => {
    rootImageSources.forEach((src, idx) => {
      if (!src) return
      loadImage(src).then(img => {
        if (img) {
          rootImages.current[idx] = img
        }
      })
    })
  }, [rootImageSources])

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
  }, [])

  return {
    simulation,
    canvasRef,
  }
}
