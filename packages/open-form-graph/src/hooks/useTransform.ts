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
  // NEW: Keep a full target transform for smooth animation of x/y/scale
  const targetTransform = useRef<Transform>({ x: 0, y: 0, scale: 1 })

  const zoomFocus = useRef({ x: 0, y: 0 }) // mouse pos at zoom center

  const isAnimating = useRef(false)
  const animationFrame = useRef<number | null>(null)

  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })

  // Lerp helper
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  // Animation step for both zoom and transformTo
  const animateTransform = useCallback(() => {
    // Tweak speed here
    const speed = 0.1
    const prev = transform.current
    const target = targetTransform.current

    // Animate each property towards its target
    const next: Transform = {
      x: lerp(prev.x, target.x, speed),
      y: lerp(prev.y, target.y, speed),
      scale: lerp(prev.scale, target.scale, speed),
    }

    // If close enough to target, snap and stop animating
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

  // Wheel/zoom logic
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      zoomFocus.current = { x: mouseX, y: mouseY }

      const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1
      const newScale = Math.max(
        0.1,
        Math.min(5, targetTransform.current.scale * scaleFactor)
      )

      // Adjust x/y to zoom around mouse
      const { x, y, scale } = transform.current
      const dx = mouseX - x
      const dy = mouseY - y
      const scaleChange = newScale / scale

      // Compute new target x/y so zoom centers on mouse
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

  // Drag logic
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
      targetTransform.current.x += deltaX
      targetTransform.current.y += deltaY

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

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp, canvasRef])

  // Reset zoom & pan
  const resetZoom = useCallback(() => {
    transform.current = { x: 0, y: 0, scale: 1 }
    targetTransform.current = { x: 0, y: 0, scale: 1 }
    onUpdate?.(transform.current)
  }, [onUpdate])

  // The new animated transformTo!
  const transformTo = useCallback(
    (update: Partial<Transform>) => {
      // Animate to new target, not an instant jump
      targetTransform.current = { ...transform.current, ...update }
      if (!isAnimating.current) {
        isAnimating.current = true
        animationFrame.current = requestAnimationFrame(animateTransform)
      }
    },
    [animateTransform]
  )

  return {
    resetZoom,
    transformTo,
    transform,
  }
}
