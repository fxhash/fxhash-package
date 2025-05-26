import { MutableRefObject, useCallback, useEffect, useRef } from "react"

export interface Transform {
  x: number
  y: number
  scale: number
}

interface UseTransformProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  onUpdate?: (transform: Transform) => void
}

export function useTransform(props: UseTransformProps) {
  const { onUpdate, canvasRef } = props
  const transform = useRef<Transform>({ x: 0, y: 0, scale: 1 })

  const targetScale = useRef(transform.current.scale)
  const zoomFocus = useRef({ x: 0, y: 0 }) // mouse pos at zoom center

  const isZooming = useRef(false) // true while animating
  const animationFrame = useRef<number | null>(null)

  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })

  const animateZoom = useCallback(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    // adjust for smoother/faster (0.15-0.4 works well)
    const scaleSpeed = 0.1
    const { x: fx, y: fy } = zoomFocus.current

    const currentScale = transform.current.scale
    const nextScale = lerp(currentScale, targetScale.current, scaleSpeed)

    if (Math.abs(nextScale - targetScale.current) < 0.001) {
      transform.current.scale = targetScale.current
      isZooming.current = false
    } else {
      transform.current.scale = nextScale
      isZooming.current = true
    }

    const scaleChange = transform.current.scale / currentScale
    transform.current.x = fx - (fx - transform.current.x) * scaleChange
    transform.current.y = fy - (fy - transform.current.y) * scaleChange

    onUpdate?.(transform.current)

    if (isZooming.current) {
      animationFrame.current = requestAnimationFrame(animateZoom)
    } else {
      animationFrame.current = null
    }
  }, [onUpdate])

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Record focal point for zoom adjustment
      zoomFocus.current = { x: mouseX, y: mouseY }

      // Zoom logic: set a new target scale
      const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1
      const nextTargetScale = Math.max(
        0.1,
        Math.min(5, targetScale.current * scaleFactor)
      )
      targetScale.current = nextTargetScale

      if (!isZooming.current) {
        isZooming.current = true
        animationFrame.current = requestAnimationFrame(animateZoom)
      }
    },
    [animateZoom, canvasRef]
  )

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDragging.current = true
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return

      const deltaX = e.clientX - lastMousePos.current.x
      const deltaY = e.clientY - lastMousePos.current.y

      transform.current.x += deltaX
      transform.current.y += deltaY

      lastMousePos.current = { x: e.clientX, y: e.clientY }

      onUpdate?.(transform.current)
    },
    [onUpdate]
  )

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.addEventListener("wheel", handleWheel, { passive: false })
    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      canvas.removeEventListener("wheel", handleWheel)
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)

      // Cancel animation on unmount
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp, canvasRef])

  const resetZoom = useCallback(() => {
    transform.current = { x: 0, y: 0, scale: 1 }
    targetScale.current = 1
    onUpdate?.(transform.current)
  }, [onUpdate])

  return {
    resetZoom,
    transform,
  }
}
