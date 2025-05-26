import { useForceSimulation } from "@/hooks/useForceSimulation"

interface CustomOpenFormGraphProps {
  rootId: string
  width: number
  height: number
  data: {
    nodes: { id: string; label?: string; imgSrc?: string }[]
    links: { source: string; target: string }[]
  }
  onNodeClick?: (node: any) => void
}

export function CustomOpenFormGraph(props: CustomOpenFormGraphProps) {
  const { width, height, data, rootId } = props
  const { canvasRef } = useForceSimulation({ data, width, height, rootId })

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
