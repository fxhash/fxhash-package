import { useForceSimulation } from "@/hooks/useForceSimulation"

interface CustomOpenFormGraphProps {
  width: number
  height: number
}

export function CustomOpenFormGraph(props: CustomOpenFormGraphProps) {
  const { width, height } = props
  const { canvasRef } = useForceSimulation({ width, height })

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
