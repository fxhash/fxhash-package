import { useOpenFormGraph } from "@/provider"
import { OpenGraphSimulation } from "@/sim/OpenGraphSimulation"
import { useEffect, useRef } from "react"

interface ClassCanvasProps {
  width: number
  height: number
}

export function ClassCanvas(props: ClassCanvasProps) {
  const { width, height } = props
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
    })
    simulation.current.initialize(data, rootId)
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

  const dpi = devicePixelRatio || 1

  return (
    <canvas
      ref={canvasRef}
      width={`${width * dpi}px`}
      height={`${height * dpi}px`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  )
}
