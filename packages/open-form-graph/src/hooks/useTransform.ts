import { MutableRefObject, useCallback, useEffect, useRef } from "react"

export interface Transform {
  x: number
  y: number
  scale: number
}

interface UseTransformProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
  onUpdate?: (transform: Transform) => void
  onClick?: (x: number, y: number) => void
  onMove?: (x: number, y: number) => void
}

const MIN_ZOOM = 0.1
const MAX_ZOOM = 10

export function useTransform(props: UseTransformProps) {
  const { onUpdate, canvasRef, onClick, onMove } = props

  const transform = useRef<Transform>({ x: 0, y: 0, scale: 1 })
  const targetTransform = useRef<Transform>({ x: 0, y: 0, scale: 1 })

  const zoomFocus = useRef({ x: 0, y: 0 }) // mouse pos at zoom center

  const isAnimating = useRef(false)
  const animationFrame = useRef<number | null>(null)

  const isDragging = useRef(false)
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const moved = useRef(false)
  const CLICK_THRESHOLD = 5
  const lastMousePos = useRef({ x: 0, y: 0 })
  const lastMoveMousePos = useRef({ x: 0, y: 0 })

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const animateTransform = useCallback(() => {
    const speed = 0.05
    const prev = transform.current
    const target = targetTransform.current

    const next: Transform = {
      x: lerp(prev.x, target.x, speed),
      y: lerp(prev.y, target.y, speed),
      scale: lerp(prev.scale, target.scale, speed),
    }

    const done =
      Math.abs(next.x - target.x) < 0.5 &&
      Math.abs(next.y - target.y) < 0.5 &&
      Math.abs(next.scale - target.scale) < 0.001

    if (done) {
      transform.current = { ...target }
      isAnimating.current = false
    } else {
      transform.current = next
      isAnimating.current = true
    }

    onUpdate?.(transform.current)

    if (isAnimating.current) {
      animationFrame.current = requestAnimationFrame(animateTransform)
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
      zoomFocus.current = { x: mouseX, y: mouseY }

      const scaleFactor = e.deltaY > 0 ? 0.95 : 1.05
      const newScale = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, targetTransform.current.scale * scaleFactor)
      )

      const { x, y, scale } = transform.current
      const dx = mouseX - x
      const dy = mouseY - y
      const scaleChange = newScale / scale

      const newX = mouseX - dx * scaleChange
      const newY = mouseY - dy * scaleChange

      targetTransform.current = { x: newX, y: newY, scale: newScale }

      if (!isAnimating.current) {
        isAnimating.current = true
        animationFrame.current = requestAnimationFrame(animateTransform)
      }
    },
    [animateTransform, canvasRef]
  )

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDragging.current = true
    moved.current = false
    dragStart.current = { x: e.clientX, y: e.clientY }
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        onMove?.(x, y)
        lastMoveMousePos.current = { x: e.clientX, y: e.clientY }
      }
      if (!isDragging.current || !dragStart.current) return
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      if (Math.abs(dx) > CLICK_THRESHOLD || Math.abs(dy) > CLICK_THRESHOLD) {
        moved.current = true

        const deltaX = e.clientX - lastMousePos.current.x
        const deltaY = e.clientY - lastMousePos.current.y

        transform.current.x += deltaX
        transform.current.y += deltaY
        targetTransform.current.x += deltaX
        targetTransform.current.y += deltaY

        lastMousePos.current = { x: e.clientX, y: e.clientY }

        onUpdate?.(transform.current)
      }
    },
    [onUpdate, onMove]
  )

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return
      isDragging.current = false
      if (!moved.current && onClick) {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (rect) {
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          onClick(x, y)
        }
      }
      dragStart.current = null
      moved.current = false
    },
    [onClick]
  )

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
      isAnimating.current = false
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp, canvasRef])

  const resetZoom = useCallback(() => {
    transform.current = { x: 0, y: 0, scale: 1 }
    targetTransform.current = { x: 0, y: 0, scale: 1 }
    onUpdate?.(transform.current)
  }, [onUpdate])

  const transformTo = useCallback(
    (update: Partial<Transform>) => {
      targetTransform.current = { ...transform.current, ...update }
      if (!isAnimating.current) {
        isAnimating.current = true
        animationFrame.current = requestAnimationFrame(animateTransform)
      }
    },
    [animateTransform]
  )

  const trackCursor = useCallback(() => {
    if (onMove && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = lastMoveMousePos.current.x - rect.left
      const y = lastMoveMousePos.current.y - rect.top
      onMove(x, y)
    }
  }, [onMove, canvasRef.current])

  return {
    resetZoom,
    transformTo,
    transform,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    trackCursor,
  }
}
