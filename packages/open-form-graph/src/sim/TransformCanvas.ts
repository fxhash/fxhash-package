const MIN_ZOOM = 0.1
const MAX_ZOOM = 10
const CLICK_THRESHOLD = 5

type Transform = { x: number; y: number; scale: number }
type Point = { x: number; y: number }
type TransformListener = (t: Transform) => void
type MouseListener = (x: number, y: number) => void

type Focus = () => Transform

export class TransformCanvas {
  canvas: HTMLCanvasElement
  transform: Transform = { x: 0, y: 0, scale: 1 }
  targetTransform: Transform = { x: 0, y: 0, scale: 1 }
  isAnimating = false
  animationFrame: number | null = null

  isDragging = false
  dragStart: Point | null = null
  moved = false
  lastMousePos: Point = { x: 0, y: 0 }
  lastMoveMousePos: Point = { x: 0, y: 0 }
  zoomFocus: Point = { x: 0, y: 0 }

  onUpdate?: TransformListener
  onClick?: MouseListener
  onMove?: MouseListener

  noInteraction: boolean = false

  touchStart: Point | null = null
  lastTouchPos: Point = { x: 0, y: 0 }
  pinchStartDist: number | null = null
  pinchStartScale: number = 1

  focus: Focus | null = null

  constructor(
    canvas: HTMLCanvasElement,
    options?: {
      onUpdate?: TransformListener
      onClick?: MouseListener
      onMove?: MouseListener
    }
  ) {
    this.canvas = canvas
    this.onUpdate = options?.onUpdate
    this.onClick = options?.onClick
    this.onMove = options?.onMove

    this.handleWheel = this.handleWheel.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)

    // Attach events
    canvas.addEventListener("wheel", this.handleWheel, { passive: false })
    canvas.addEventListener("mousedown", this.handleMouseDown)
    window.addEventListener("mousemove", this.handleMouseMove)
    window.addEventListener("mouseup", this.handleMouseUp)

    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)

    canvas.addEventListener("touchstart", this.handleTouchStart, {
      passive: false,
    })
    canvas.addEventListener("touchmove", this.handleTouchMove, {
      passive: false,
    })
    canvas.addEventListener("touchend", this.handleTouchEnd, { passive: false })
    canvas.addEventListener("touchcancel", this.handleTouchEnd, {
      passive: false,
    })
  }

  lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
  }

  animateTransform = () => {
    const speed = 0.05
    const prev = this.transform
    const target = this.focus?.() || this.targetTransform

    const next: Transform = {
      x: this.lerp(prev.x, target.x, speed),
      y: this.lerp(prev.y, target.y, speed),
      scale: this.lerp(prev.scale, target.scale, speed),
    }

    const done =
      Math.abs(next.x - target.x) < 0.5 &&
      Math.abs(next.y - target.y) < 0.5 &&
      Math.abs(next.scale - target.scale) < 0.001

    if (done) {
      this.transform = { ...target }
      this.isAnimating = false
      this.focus = null
    } else {
      this.transform = next
      this.isAnimating = true
    }

    this.onUpdate?.(this.transform)

    if (this.isAnimating) {
      this.animationFrame = requestAnimationFrame(this.animateTransform)
    } else {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
        this.animationFrame = null
      }
    }
  }

  handleWheel(e: WheelEvent) {
    if (this.noInteraction) return
    if (this.isAnimating) {
      this.isAnimating = false
      this.focus = null
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
        this.animationFrame = null
      }
    }
    e.preventDefault()
    const rect = this.canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    this.zoomFocus = { x: mouseX, y: mouseY }

    const scaleFactor = e.deltaY > 0 ? 0.95 : 1.05
    const newScale = Math.max(
      MIN_ZOOM,
      Math.min(MAX_ZOOM, this.targetTransform.scale * scaleFactor)
    )

    const { x, y, scale } = this.transform
    const dx = mouseX - x
    const dy = mouseY - y
    const scaleChange = newScale / scale

    const newX = mouseX - dx * scaleChange
    const newY = mouseY - dy * scaleChange

    this.targetTransform = { x: newX, y: newY, scale: newScale }

    if (!this.isAnimating) {
      this.isAnimating = true
      this.animationFrame = requestAnimationFrame(this.animateTransform)
    }
  }

  handleMouseDown(e: MouseEvent) {
    if (this.noInteraction) return
    if (this.isAnimating) {
      this.isAnimating = false
      this.focus = null
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
        this.animationFrame = null
      }
    }
    this.isDragging = true
    this.moved = false
    this.dragStart = { x: e.clientX, y: e.clientY }
    this.lastMousePos = { x: e.clientX, y: e.clientY }
  }

  handleMouseMove(e: MouseEvent) {
    if (this.noInteraction) return
    const rect = this.canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    this.lastMoveMousePos = { x: e.clientX, y: e.clientY }
    this.onMove?.(x, y)

    if (!this.isDragging || !this.dragStart) return

    const dx = e.clientX - this.dragStart.x
    const dy = e.clientY - this.dragStart.y

    if (Math.abs(dx) > CLICK_THRESHOLD || Math.abs(dy) > CLICK_THRESHOLD) {
      this.moved = true

      const deltaX = e.clientX - this.lastMousePos.x
      const deltaY = e.clientY - this.lastMousePos.y

      this.transform.x += deltaX
      this.transform.y += deltaY
      this.targetTransform.x += deltaX
      this.targetTransform.y += deltaY

      this.lastMousePos = { x: e.clientX, y: e.clientY }

      this.onUpdate?.(this.transform)
    }
  }

  handleMouseUp(e: MouseEvent) {
    this.isDragging = false
    this.dragStart = null
    this.moved = false
    if (this.noInteraction) return
    if (!this.moved && this.onClick) {
      const rect = this.canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      this.onClick(x, y)
    }
  }

  handleTouchStart(e: TouchEvent) {
    if (this.noInteraction) return
    if (this.isAnimating) {
      this.isAnimating = false
      this.focus = null
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
        this.animationFrame = null
      }
    }
    if (e.touches.length === 1) {
      const rect = this.canvas.getBoundingClientRect()
      const touch = e.touches[0]
      this.isDragging = true
      this.moved = false
      this.touchStart = { x: touch.clientX, y: touch.clientY }
      this.lastTouchPos = { x: touch.clientX, y: touch.clientY }
      this.lastMoveMousePos = { x: touch.clientX, y: touch.clientY }
    } else if (e.touches.length === 2) {
      this.isDragging = false
      const [t1, t2] = [e.touches[0], e.touches[1]]
      this.pinchStartDist = Math.hypot(
        t2.clientX - t1.clientX,
        t2.clientY - t1.clientY
      )
      this.pinchStartScale = this.targetTransform.scale
      const rect = this.canvas.getBoundingClientRect()
      this.zoomFocus = {
        x: (t1.clientX + t2.clientX) / 2 - rect.left,
        y: (t1.clientY + t2.clientY) / 2 - rect.top,
      }
    }
  }

  handleTouchMove(e: TouchEvent) {
    if (this.noInteraction) return
    e.preventDefault()
    const rect = this.canvas.getBoundingClientRect()
    if (e.touches.length === 1 && this.touchStart) {
      const touch = e.touches[0]
      const dx = touch.clientX - this.touchStart.x
      const dy = touch.clientY - this.touchStart.y

      if (Math.abs(dx) > CLICK_THRESHOLD || Math.abs(dy) > CLICK_THRESHOLD) {
        this.moved = true

        const deltaX = touch.clientX - this.lastTouchPos.x
        const deltaY = touch.clientY - this.lastTouchPos.y

        this.transform.x += deltaX
        this.transform.y += deltaY
        this.targetTransform.x += deltaX
        this.targetTransform.y += deltaY

        this.lastTouchPos = { x: touch.clientX, y: touch.clientY }
        this.lastMoveMousePos = { x: touch.clientX, y: touch.clientY }
        this.onUpdate?.(this.transform)
        this.onMove?.(touch.clientX - rect.left, touch.clientY - rect.top)
      }
    } else if (e.touches.length === 2 && this.pinchStartDist != null) {
      const [t1, t2] = [e.touches[0], e.touches[1]]
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
      let scale = (dist / this.pinchStartDist) * this.pinchStartScale
      scale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale))

      const { x, y, scale: prevScale } = this.transform
      const dx = this.zoomFocus.x - x
      const dy = this.zoomFocus.y - y
      const scaleChange = scale / prevScale
      const newX = this.zoomFocus.x - dx * scaleChange
      const newY = this.zoomFocus.y - dy * scaleChange

      this.targetTransform = { x: newX, y: newY, scale }
      if (!this.isAnimating) {
        this.isAnimating = true
        this.animationFrame = requestAnimationFrame(this.animateTransform)
      }
    }
  }

  handleTouchEnd(e: TouchEvent) {
    if (this.noInteraction) return
    if (e.touches.length === 0) {
      if (this.isDragging && !this.moved && this.onClick && this.touchStart) {
        const rect = this.canvas.getBoundingClientRect()
        this.onClick(
          this.touchStart.x - rect.left,
          this.touchStart.y - rect.top
        )
      }
      this.isDragging = false
      this.touchStart = null
      this.moved = false
      this.pinchStartDist = null
    } else if (e.touches.length === 1) {
      const touch = e.touches[0]
      this.isDragging = true
      this.touchStart = { x: touch.clientX, y: touch.clientY }
      this.lastTouchPos = { x: touch.clientX, y: touch.clientY }
      this.pinchStartDist = null
    }
  }

  resetZoom() {
    this.transform = { x: 0, y: 0, scale: 1 }
    this.targetTransform = { x: 0, y: 0, scale: 1 }
    this.onUpdate?.(this.transform)
  }

  transformTo(update: Partial<Transform>) {
    this.targetTransform = { ...this.transform, ...update }
    if (!this.isAnimating) {
      this.isAnimating = true
      this.animationFrame = requestAnimationFrame(this.animateTransform)
    }
  }

  trackCursor() {
    const rect = this.canvas.getBoundingClientRect()
    const x = this.lastMoveMousePos.x - rect.left
    const y = this.lastMoveMousePos.y - rect.top
    this.onMove?.(x, y)
  }

  destroy() {
    this.canvas.removeEventListener("wheel", this.handleWheel)
    this.canvas.removeEventListener("mousedown", this.handleMouseDown)
    this.canvas.removeEventListener("touchstart", this.handleTouchStart)
    this.canvas.removeEventListener("touchmove", this.handleTouchMove)
    this.canvas.removeEventListener("touchend", this.handleTouchEnd)
    this.canvas.removeEventListener("touchcancel", this.handleTouchEnd)
    window.removeEventListener("mousemove", this.handleMouseMove)
    window.removeEventListener("mouseup", this.handleMouseUp)
    this.isAnimating = false
    this.focus = null
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
  }

  setNoInteraction = (noInteraction: boolean) => {
    this.noInteraction = noInteraction
  }

  focusOn = (focus: Focus | null) => {
    this.focus = focus
  }
}
