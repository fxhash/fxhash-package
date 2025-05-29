import React, { useRef, useEffect } from "react"
import { RawGraphData, RootNodeImageSources, SimNode } from "@/_types"
import { GraphConfig } from "@/_interfaces"
import { ForceSimCanvas } from "@/Simulation/Simulation"
import { DEFAULT_GRAPH_CONFIG } from "@/provider"

interface ForceSimCanvasViewProps {
  width: number
  height: number
  data: RawGraphData
  config?: GraphConfig
  rootId: string
  rootImageSources: RootNodeImageSources
  theme?: "light" | "dark"
  onHoveredNodeChange?: (node: SimNode | null) => void
  onSelectedNodeChange?: (node: SimNode | null) => void
}

export const ForceSimCanvasView: React.FC<ForceSimCanvasViewProps> = ({
  width,
  height,
  data,
  config = DEFAULT_GRAPH_CONFIG,
  rootId,
  rootImageSources,
  theme = "light",
  onHoveredNodeChange,
  onSelectedNodeChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const simRef = useRef<ForceSimCanvas | null>(null)

  // (Re-)initialize simulation on mount and when key props change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    simRef.current = new ForceSimCanvas({
      canvas,
      width,
      height,
      data,
      config,
      rootId,
      rootImageSources,
      onHoveredNodeChange,
      onSelectedNodeChange,
    })

    return () => {
      simRef.current?.destroy()
      simRef.current = null
    }
  }, [
    width,
    height,
    data,
    config,
    rootId,
    rootImageSources,
    onHoveredNodeChange,
    onSelectedNodeChange,
  ])

  // Retina scaling
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpi = window.devicePixelRatio || 1
    canvas.width = width * dpi
    canvas.height = height * dpi
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      style={{
        width,
        height,
        display: "block",
        touchAction: "none",
        background: theme === "dark" ? "#111" : "#fff",
      }}
    />
  )
}
