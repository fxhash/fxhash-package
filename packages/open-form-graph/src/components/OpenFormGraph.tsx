import { SimNode } from "@/_types"
import { useOpenFormGraph } from "@/provider"
import { HighlightStyle, Transform } from "@/sim/_types"
import { OpenGraphSimulation } from "@/sim/OpenGraphSimulation"
import { NodeVisibility } from "@/util/data"
import { MouseEventHandler, useEffect, useRef } from "react"

interface OpenFormGraphProps {
  width: number
  height: number
  highlights?: HighlightStyle[]
  className?: string
  noInteraction?: boolean
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
  loadNodeImage?: (node: SimNode) => Promise<string | undefined>
  translate?: { x: number; y: number }
  onTransform?: (transform: Transform) => void
  onSimulationEnded?: (simulation: OpenGraphSimulation) => void
  nodeVisibility?: NodeVisibility
  children?: React.ReactNode
  groupRootOrphans?: boolean
}

export function OpenFormGraph(props: OpenFormGraphProps) {
  const {
    width,
    height,
    highlights = [],
    className,
    noInteraction = false,
    loadNodeImage,
    translate,
    onTransform,
    onSimulationEnded,
    nodeVisibility = "all",
    children,
    groupRootOrphans = false,
  } = props
  const {
    simulation,
    data,
    rootId,
    rootImageSources,
    theme,
    hideThumbnails,
    setHoveredNode,
    setSelectedNode,
    lockedNodeId,
  } = useOpenFormGraph()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    simulation.current = new OpenGraphSimulation({
      width,
      height,
      canvas: canvasRef.current,
      rootImageSources,
      loadNodeImage,
      theme,
      translate,
      lockedNodeId,
      nodeVisibility,
      highlights,
      groupRootOrphans,
    })
    return () => {
      simulation.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (!simulation.current) return
    simulation.current.emitter.on("selected-node-changed", setSelectedNode)
    simulation.current.emitter.on("hovered-node-changed", setHoveredNode)
    return () => {
      simulation.current?.emitter.off("selected-node-changed", setSelectedNode)
      simulation.current?.emitter.off("hovered-node-changed", setHoveredNode)
    }
  }, [setSelectedNode, setHoveredNode])

  useEffect(() => {
    if (!simulation.current) return
    if (!onTransform) return
    simulation.current.emitter.on("transform-changed", onTransform)
    return () => {
      simulation.current?.emitter.off("transform-changed", onTransform)
    }
  }, [onTransform])

  useEffect(() => {
    if (!simulation.current || !onSimulationEnded) return
    return simulation.current.emitter.on("simulation:ended", onSimulationEnded)
  }, [onSimulationEnded])

  useEffect(() => {
    if (!simulation.current) return
    simulation.current.resize(width, height)
  }, [width, height])

  useEffect(() => {
    if (!simulation.current || !theme) return
    simulation.current.setTheme(theme)
  }, [theme])

  useEffect(() => {
    if (!simulation.current) return
    simulation.current.setHideThumbnails(hideThumbnails)
  }, [hideThumbnails])

  useEffect(() => {
    if (!simulation.current) return
    simulation.current.setNodeVisibility(nodeVisibility, groupRootOrphans)
  }, [nodeVisibility, groupRootOrphans])

  useEffect(() => {
    if (!simulation.current) return
    simulation.current.setHighlights(highlights)
  }, [highlights])

  useEffect(() => {
    if (!simulation.current) return
    simulation.current.setNoInteraction(noInteraction)
  }, [noInteraction])

  useEffect(() => {
    if (!simulation.current) return
    simulation.current.initialize(data, rootId)
  }, [data, rootId])

  useEffect(() => {
    if (!simulation.current) return
    if (!translate) return
    simulation.current.setTranslate(translate)
  }, [translate?.y, translate?.x])

  useEffect(() => {
    if (!simulation.current) return
    if (simulation.current.lockedNodeId === lockedNodeId) return
    simulation.current.setLockedNodeId(lockedNodeId)
  }, [lockedNodeId])

  const dpi = devicePixelRatio || 1

  return (
    <>
      <canvas
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        ref={canvasRef}
        className={className}
        width={`${width * dpi}px`}
        height={`${height * dpi}px`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
      {children}
    </>
  )
}
