import {
  Transform,
  Point,
  TransformListener,
  MouseListener,
  Focus,
} from "./_types"

const MIN_ZOOM = 0.1
const MAX_ZOOM = 10
const CLICK_THRESHOLD = 5
const ANIMATION_SPEED = 0.07
const ANIMATION_THRESHOLD = { x: 0.5, y: 0.5, scale: 0.001 }
const MOMENTUM_DAMPING = 0.92
const MIN_VELOCITY = 0.5

export class TransformCanvas {
  private canvas: HTMLCanvasElement
  private transform: Transform = { x: 0, y: 0, scale: 1 }
  private targetTransform: Transform = { x: 0, y: 0, scale: 1 }
  private isAnimating = false
  private animationFrame: number | null = null
  private focus: Focus | null = null
  private offset: Point = { x: 0, y: 0 }

  private isDragging = false
  private dragStart: Point | null = null
  private hasMoved = false
  private lastPointerPos: Point = { x: 0, y: 0 }
  private lastMovePos: Point = { x: 0, y: 0 }

  private velocity: Point = { x: 0, y: 0 }
  private lastDragTime: number = 0
  private momentumFrame: number | null = null

  private touchStart: Point | null = null
  private pinchStartDist: number | null = null
  private pinchStartScale: number = 1

  private noInteraction: boolean = false
  private dpr: number = 1
  private resizeObserver: ResizeObserver | null = null
  private mediaQueryList: MediaQueryList | null = null

  onUpdate?: TransformListener
  onClick?: MouseListener
  onMove?: MouseListener

  constructor(
    canvas: HTMLCanvasElement,
    options?: {
      onUpdate?: TransformListener
      onClick?: MouseListener
      onMove?: MouseListener
      offset?: Point
    }
  ) {
    this.canvas = canvas
    this.onUpdate = options?.onUpdate
    this.onClick = options?.onClick
    this.onMove = options?.onMove
    this.offset = options?.offset || { x: 0, y: 0 }
    this.dpr = window.devicePixelRatio || 1

    this.bindEventHandlers()
    this.attachEventListeners()
    this.setupDPRMonitoring()
  }

  private bindEventHandlers() {
    this.handleWheel = this.handleWheel.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleCanvasClick = this.handleCanvasClick.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  private attachEventListeners() {
    this.canvas.addEventListener("wheel", this.handleWheel, { passive: false })
    this.canvas.addEventListener("mousedown", this.handleMouseDown)
    this.canvas.addEventListener("click", this.handleCanvasClick)
    window.addEventListener("mousemove", this.handleMouseMove)
    window.addEventListener("mouseup", this.handleMouseUp)

    this.canvas.addEventListener("touchstart", this.handleTouchStart, {
      passive: false,
    })
    this.canvas.addEventListener("touchmove", this.handleTouchMove, {
      passive: false,
    })
    this.canvas.addEventListener("touchend", this.handleTouchEnd, {
      passive: false,
    })
    this.canvas.addEventListener("touchcancel", this.handleTouchEnd, {
      passive: false,
    })
  }

  private setupDPRMonitoring() {
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateDPR()
      })
      this.resizeObserver.observe(this.canvas)
    }

    const updateDPRFromMediaQuery = () => {
      this.updateDPR()
    }

    const dpr = window.devicePixelRatio || 1
    this.mediaQueryList = window.matchMedia(`(resolution: ${dpr}dppx)`)

    if (this.mediaQueryList.addEventListener) {
      this.mediaQueryList.addEventListener("change", updateDPRFromMediaQuery)
    }
  }

  private updateDPR() {
    const newDPR = window.devicePixelRatio || 1
    if (newDPR !== this.dpr) {
      const oldDPR = this.dpr
      this.dpr = newDPR

      const scale = newDPR / oldDPR
      this.transform.x *= scale
      this.transform.y *= scale
      this.targetTransform.x *= scale
      this.targetTransform.y *= scale

      this.onUpdate?.(this.transform)

      if (this.mediaQueryList) {
        const updateDPRFromMediaQuery = () => {
          this.updateDPR()
        }

        if (this.mediaQueryList.removeEventListener) {
          this.mediaQueryList.removeEventListener(
            "change",
            updateDPRFromMediaQuery
          )
        }
        this.mediaQueryList = window.matchMedia(`(resolution: ${newDPR}dppx)`)

        if (this.mediaQueryList.addEventListener) {
          this.mediaQueryList.addEventListener(
            "change",
            updateDPRFromMediaQuery
          )
        }
      }
    }
  }

  public toCanvasCoords(clientX: number, clientY: number): Point {
    const rect = this.canvas.getBoundingClientRect()
    return {
      x: (clientX - rect.left) * this.dpr,
      y: (clientY - rect.top) * this.dpr,
    }
  }

  private toCSSCoords(clientX: number, clientY: number): Point {
    const rect = this.canvas.getBoundingClientRect()
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  private startMomentum() {
    if (
      Math.abs(this.velocity.x) > MIN_VELOCITY ||
      Math.abs(this.velocity.y) > MIN_VELOCITY
    ) {
      if (!this.momentumFrame) {
        this.momentumFrame = requestAnimationFrame(this.applyMomentum)
      }
    }
  }

  private applyMomentum = () => {
    this.transform.x += this.velocity.x
    this.transform.y += this.velocity.y
    this.targetTransform.x = this.transform.x
    this.targetTransform.y = this.transform.y

    this.velocity.x *= MOMENTUM_DAMPING
    this.velocity.y *= MOMENTUM_DAMPING

    if (
      Math.abs(this.velocity.x) > MIN_VELOCITY ||
      Math.abs(this.velocity.y) > MIN_VELOCITY
    ) {
      this.onUpdate?.(this.transform)
      this.momentumFrame = requestAnimationFrame(this.applyMomentum)
    } else {
      this.velocity = { x: 0, y: 0 }
      this.momentumFrame = null
      this.targetTransform = { ...this.transform }
    }
  }

  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t
  }

  private animateTransform = () => {
    const target = this.focus?.() || this.targetTransform
    const prev = this.transform

    const next: Transform = {
      x: this.lerp(prev.x, target.x, ANIMATION_SPEED / this.dpr),
      y: this.lerp(prev.y, target.y, ANIMATION_SPEED / this.dpr),
      scale: this.lerp(prev.scale, target.scale, ANIMATION_SPEED / this.dpr),
    }

    const done =
      Math.abs(next.x - target.x) < ANIMATION_THRESHOLD.x &&
      Math.abs(next.y - target.y) < ANIMATION_THRESHOLD.y &&
      Math.abs(next.scale - target.scale) < ANIMATION_THRESHOLD.scale

    if (done) {
      this.transform = { ...target }
      this.stopAnimation()
    } else {
      this.transform = next
      this.onUpdate?.(this.transform)
      this.animationFrame = requestAnimationFrame(this.animateTransform)
    }
  }

  private startAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true
      this.animationFrame = requestAnimationFrame(this.animateTransform)
    }
  }

  private stopAnimation() {
    this.isAnimating = false
    this.focus = null
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
  }

  private interruptAnimation() {
    this.targetTransform = { ...this.transform }
    if (this.isAnimating) {
      this.stopAnimation()
    }
    if (this.momentumFrame) {
      cancelAnimationFrame(this.momentumFrame)
      this.momentumFrame = null
      this.velocity = { x: 0, y: 0 }
    }
  }

  private handleWheel(e: WheelEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (this.noInteraction) return

    if (this.momentumFrame) {
      cancelAnimationFrame(this.momentumFrame)
      this.momentumFrame = null
      this.velocity = { x: 0, y: 0 }
    }

    if (this.focus) {
      this.interruptAnimation()
      this.focus = null
    }

    const canvasCoords = this.toCanvasCoords(e.clientX, e.clientY)
    const scaleFactor = e.deltaY > 0 ? 0.95 : 1.05

    const newScale = Math.max(
      MIN_ZOOM,
      Math.min(MAX_ZOOM, this.targetTransform.scale * scaleFactor)
    )

    const { x: currentX, y: currentY, scale: currentScale } = this.transform

    const worldX =
      (canvasCoords.x - currentX - this.offset.x * currentScale) / currentScale
    const worldY =
      (canvasCoords.y - currentY - this.offset.y * currentScale) / currentScale

    const newX = canvasCoords.x - worldX * newScale - this.offset.x * newScale
    const newY = canvasCoords.y - worldY * newScale - this.offset.y * newScale

    this.targetTransform = {
      x: newX,
      y: newY,
      scale: newScale,
    }

    this.startAnimation()
  }

  private handleMouseDown(e: MouseEvent) {
    if (this.noInteraction) return

    this.interruptAnimation()
    this.isDragging = true
    this.hasMoved = false
    this.dragStart = { x: e.clientX, y: e.clientY }
    this.lastPointerPos = { x: e.clientX, y: e.clientY }
  }

  private handleMouseMove(e: MouseEvent) {
    if (this.noInteraction) return

    this.lastMovePos = { x: e.clientX, y: e.clientY }

    const cssCoords = this.toCSSCoords(e.clientX, e.clientY)
    this.onMove?.(cssCoords.x, cssCoords.y)

    if (!this.isDragging || !this.dragStart) return

    const dx = e.clientX - this.dragStart.x
    const dy = e.clientY - this.dragStart.y

    if (Math.abs(dx) > CLICK_THRESHOLD || Math.abs(dy) > CLICK_THRESHOLD) {
      this.hasMoved = true

      const deltaX = (e.clientX - this.lastPointerPos.x) * this.dpr
      const deltaY = (e.clientY - this.lastPointerPos.y) * this.dpr

      this.transform.x += deltaX
      this.transform.y += deltaY
      this.targetTransform.x = this.transform.x
      this.targetTransform.y = this.transform.y

      const now = Date.now()
      const dt = now - this.lastDragTime
      if (dt > 0 && dt < 100) {
        this.velocity.x = (deltaX / dt) * 16
        this.velocity.y = (deltaY / dt) * 16
      }

      this.lastPointerPos = { x: e.clientX, y: e.clientY }
      this.lastDragTime = now
      this.onUpdate?.(this.transform)
    }
  }

  private handleMouseUp(e: MouseEvent) {
    if (this.isDragging && this.hasMoved) {
      this.startMomentum()
    }
    this.isDragging = false
    this.dragStart = null
  }

  private handleCanvasClick(e: MouseEvent) {
    if (this.noInteraction || this.hasMoved) return

    const cssCoords = this.toCSSCoords(e.clientX, e.clientY)
    this.onClick?.(cssCoords.x, cssCoords.y)
  }

  private handleTouchStart(e: TouchEvent) {
    if (this.noInteraction) return
    e.preventDefault()

    this.interruptAnimation()

    if (e.touches.length === 1) {
      const touch = e.touches[0]
      this.isDragging = true
      this.hasMoved = false
      this.touchStart = { x: touch.clientX, y: touch.clientY }
      this.lastPointerPos = { x: touch.clientX, y: touch.clientY }
      this.lastMovePos = { x: touch.clientX, y: touch.clientY }
    } else if (e.touches.length === 2) {
      this.isDragging = false
      const [t1, t2] = Array.from(e.touches)
      this.pinchStartDist = Math.hypot(
        t2.clientX - t1.clientX,
        t2.clientY - t1.clientY
      )
      this.pinchStartScale = this.targetTransform.scale
    }
  }

  private handleTouchMove(e: TouchEvent) {
    if (this.noInteraction) return
    e.preventDefault()

    if (e.touches.length === 1 && this.isDragging && this.touchStart) {
      const touch = e.touches[0]
      const dx = touch.clientX - this.touchStart.x
      const dy = touch.clientY - this.touchStart.y

      if (Math.abs(dx) > CLICK_THRESHOLD || Math.abs(dy) > CLICK_THRESHOLD) {
        this.hasMoved = true

        const deltaX = (touch.clientX - this.lastPointerPos.x) * this.dpr
        const deltaY = (touch.clientY - this.lastPointerPos.y) * this.dpr

        this.transform.x += deltaX
        this.transform.y += deltaY
        this.targetTransform.x = this.transform.x
        this.targetTransform.y = this.transform.y

        const now = Date.now()
        const dt = now - this.lastDragTime
        if (dt > 0 && dt < 100) {
          this.velocity.x = (deltaX / dt) * 16
          this.velocity.y = (deltaY / dt) * 16
        }

        this.lastPointerPos = { x: touch.clientX, y: touch.clientY }
        this.lastMovePos = { x: touch.clientX, y: touch.clientY }
        this.lastDragTime = now

        this.onUpdate?.(this.transform)

        const cssCoords = this.toCSSCoords(touch.clientX, touch.clientY)
        this.onMove?.(cssCoords.x, cssCoords.y)
      }
    } else if (e.touches.length === 2 && this.pinchStartDist != null) {
      const [t1, t2] = Array.from(e.touches)
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
      let scale = (dist / this.pinchStartDist) * this.pinchStartScale
      scale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale))

      const centerX = (t1.clientX + t2.clientX) / 2
      const centerY = (t1.clientY + t2.clientY) / 2
      const canvasCenter = this.toCanvasCoords(centerX, centerY)

      const {
        x: targetX,
        y: targetY,
        scale: targetScale,
      } = this.targetTransform
      const worldX = (canvasCenter.x - targetX) / targetScale
      const worldY = (canvasCenter.y - targetY) / targetScale

      const newX = canvasCenter.x - worldX * scale
      const newY = canvasCenter.y - worldY * scale

      this.targetTransform = {
        x: newX,
        y: newY,
        scale,
      }

      this.startAnimation()
    }
  }

  private handleTouchEnd(e: TouchEvent) {
    if (this.noInteraction) return

    if (e.touches.length === 0) {
      if (this.isDragging && this.hasMoved) {
        this.startMomentum()
      } else if (
        this.isDragging &&
        !this.hasMoved &&
        this.onClick &&
        this.touchStart
      ) {
        const cssCoords = this.toCSSCoords(this.touchStart.x, this.touchStart.y)
        this.onClick(cssCoords.x, cssCoords.y)
      }
      this.isDragging = false
      this.touchStart = null
      this.hasMoved = false
      this.pinchStartDist = null
      this.velocity = { x: 0, y: 0 }
    } else if (e.touches.length === 1) {
      const touch = e.touches[0]
      this.isDragging = true
      this.hasMoved = false
      this.touchStart = { x: touch.clientX, y: touch.clientY }
      this.lastPointerPos = { x: touch.clientX, y: touch.clientY }
      this.pinchStartDist = null
      this.velocity = { x: 0, y: 0 }
      this.lastDragTime = Date.now()
    }
  }

  resetZoom() {
    this.targetTransform = { x: 0, y: 0, scale: 1 }
    this.startAnimation()
  }

  transformTo(update: Partial<Transform>) {
    this.targetTransform = { ...this.targetTransform, ...update }
    this.startAnimation()
  }

  public getTransformationFromWorld(
    worldX: number,
    worldY: number,
    newScale?: number
  ) {
    const scale = newScale ?? this.transform.scale

    const x =
      this.canvas.width / 2 +
      this.offset.x * this.dpr -
      worldX * scale -
      (this.canvas.width / 2 + this.offset.x * this.dpr) * scale
    const y =
      this.canvas.height / 2 +
      this.offset.y * this.dpr -
      worldY * scale -
      (this.canvas.height / 2 + this.offset.y * this.dpr) * scale

    return { x, y, scale }
  }

  public transformToWorld(worldX: number, worldY: number, newScale?: number) {
    const transform = this.getTransformationFromWorld(worldX, worldY, newScale)
    this.transformTo(transform)
  }

  trackCursor() {
    const cssCoords = this.toCSSCoords(this.lastMovePos.x, this.lastMovePos.y)
    this.onMove?.(cssCoords.x, cssCoords.y)
  }

  setNoInteraction(noInteraction: boolean) {
    this.noInteraction = noInteraction
    if (noInteraction) {
      this.isDragging = false
      this.dragStart = null
    }
  }

  focusOn(focus: Focus | null) {
    this.focus = focus
    if (focus) {
      const _focus = focus
      this.focus = () => {
        const worldFocus = _focus()
        const transform = this.getTransformationFromWorld(
          worldFocus?.x!,
          worldFocus?.y!,
          worldFocus?.scale
        )
        return transform
      }
      this.startAnimation()
    }
  }

  destroy() {
    this.stopAnimation()

    if (this.momentumFrame) {
      cancelAnimationFrame(this.momentumFrame)
      this.momentumFrame = null
    }

    this.canvas.removeEventListener("wheel", this.handleWheel)
    this.canvas.removeEventListener("mousedown", this.handleMouseDown)
    this.canvas.removeEventListener("click", this.handleCanvasClick)
    this.canvas.removeEventListener("touchstart", this.handleTouchStart)
    this.canvas.removeEventListener("touchmove", this.handleTouchMove)
    this.canvas.removeEventListener("touchend", this.handleTouchEnd)
    this.canvas.removeEventListener("touchcancel", this.handleTouchEnd)
    window.removeEventListener("mousemove", this.handleMouseMove)
    window.removeEventListener("mouseup", this.handleMouseUp)

    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }

    if (this.mediaQueryList) {
      const updateDPRFromMediaQuery = () => {
        this.updateDPR()
      }

      if (this.mediaQueryList.removeEventListener) {
        this.mediaQueryList.removeEventListener(
          "change",
          updateDPRFromMediaQuery
        )
      }
      this.mediaQueryList = null
    }
  }

  getTransform(): Readonly<Transform> {
    return { ...this.transform }
  }

  getTargetTransform(): Readonly<Transform> {
    return { ...this.targetTransform }
  }
  getFocus(): Readonly<Focus | null> {
    return this.focus ? { ...this.focus } : null
  }
  setOffset(offset: Point) {
    this.offset = offset
  }
}
