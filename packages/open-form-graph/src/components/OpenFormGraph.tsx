import { useOpenFormGraph } from "@/provider"
import { OpenGraphSimulation } from "@/sim/OpenGraphSimulation"
import { MouseEventHandler, useEffect, useRef } from "react"

interface OpenFormGraphProps {
  width: number
  height: number
  highlights?: string[]
  className?: string
  noInteraction?: boolean
  onMouseEnter?: MouseEventHandler
  onMouseLeave?: MouseEventHandler
  centerOffset?: { x: number; y: number }
}

export function OpenFormGraph(props: OpenFormGraphProps) {
  const {
    width,
    height,
    highlights = [],
    className,
    noInteraction = false,
    centerOffset,
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
  } = useOpenFormGraph()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    simulation.current = new OpenGraphSimulation({
      width,
      height,
      canvas: canvasRef.current,
      rootImageSources,
      theme,
      onHoveredNodeChange: n => {
        setHoveredNode(n)
      },
      onSelectedNodeChange: n => {
        setSelectedNode(n)
      },
      centerOffset,
    })
    return () => {
      simulation.current?.destroy()
    }
  }, [])

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
    simulation.current.setHighlights(highlights)
  }, [highlights])

  useEffect(() => {
    if (!simulation.current) return
    simulation.current.setNoInteraction(noInteraction)
  }, [noInteraction])

  useEffect(() => {
    if (!simulation.current) return
    simulation.current.initialize(data, rootId)
  }, [data])

  useEffect(() => {
    if (!simulation.current) return
    if (!centerOffset) return
    simulation.current.setCenterOffset(centerOffset)
  }, [centerOffset?.y, centerOffset?.x])

  const dpi = devicePixelRatio || 1

  return (
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
  )
}
