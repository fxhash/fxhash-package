export function circle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number = 5,
  options?: {
    fill?: boolean
    fillStyle?: string
    stroke?: boolean
    strokeStyle?: string
    lineWidth?: number
  }
) {
  const {
    fill = true,
    fillStyle,
    stroke = false,
    strokeStyle,
    lineWidth = 0.2,
  } = options || {}

  ctx.save()
  if (fillStyle !== undefined) ctx.fillStyle = fillStyle
  if (strokeStyle !== undefined) ctx.strokeStyle = strokeStyle
  if (lineWidth !== undefined) ctx.lineWidth = lineWidth

  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.closePath()

  if (fill) {
    ctx.fill()
  }

  if (stroke) {
    ctx.stroke()
  }

  ctx.restore()
}

export function rect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  options?: {
    fill?: boolean
    fillStyle?: string
    stroke?: boolean
    strokeStyle?: string
    lineWidth?: number
    borderRadius?: number
  }
) {
  const {
    fill = true,
    fillStyle,
    stroke = false,
    strokeStyle,
    lineWidth = 0.2,
    borderRadius = 0,
  } = options || {}

  ctx.save()

  if (fillStyle !== undefined) ctx.fillStyle = fillStyle
  if (strokeStyle !== undefined) ctx.strokeStyle = strokeStyle
  if (lineWidth !== undefined) ctx.lineWidth = lineWidth

  const r = Math.min(borderRadius, width / 2, height / 2)

  ctx.beginPath()

  if (r > 0) {
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + width - r, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + r)
    ctx.lineTo(x + width, y + height - r)
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
    ctx.lineTo(x + r, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
  } else {
    ctx.rect(x, y, width, height)
  }

  ctx.closePath()

  if (fill) {
    ctx.fill()
  }

  if (stroke) {
    ctx.stroke()
  }

  ctx.restore()
}

export function img(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  borderRadius: number = 0,
  opacity: number = 1.0,
  bgColor?: string
) {
  ctx.save()
  ctx.beginPath()
  if (borderRadius > 0) {
    const r = Math.min(borderRadius, width / 2, height / 2)
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + width - r, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + r)
    ctx.lineTo(x + width, y + height - r)
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height)
    ctx.lineTo(x + r, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
  } else {
    ctx.rect(x, y, width, height)
  }
  ctx.closePath()
  if (bgColor) {
    ctx.save()
    ctx.fillStyle = bgColor
    ctx.globalAlpha = 1.0
    ctx.fillRect(x, y, width, height)
    ctx.restore()
  }
  ctx.clip()
  ctx.globalAlpha = opacity
  ctx.drawImage(image, x, y, width, height)
  ctx.restore()
}

export function hexagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  options?: {
    fill?: boolean
    fillStyle?: string
    stroke?: boolean
    strokeStyle?: string
    lineWidth?: number
    rotation?: number
    borderRadius?: number
  }
) {
  const {
    fill = true,
    fillStyle,
    stroke = false,
    strokeStyle,
    lineWidth = 0.2,
    rotation = 0,
    borderRadius = 0,
  } = options || {}

  ctx.save()

  if (fillStyle !== undefined) ctx.fillStyle = fillStyle
  if (strokeStyle !== undefined) ctx.strokeStyle = strokeStyle
  if (lineWidth !== undefined) ctx.lineWidth = lineWidth

  const sides = 6
  const angleStep = (Math.PI * 2) / sides

  ctx.beginPath()

  const points = []
  for (let i = 0; i < sides; i++) {
    const angle = rotation + i * angleStep
    points.push({
      x: x + radius * Math.cos(angle),
      y: y + radius * Math.sin(angle),
    })
  }

  if (borderRadius > 0) {
    const maxBorderRadius = Math.min(borderRadius, radius / 3)

    for (let i = 0; i < sides; i++) {
      const current = points[i]
      const next = points[(i + 1) % sides]
      const prev = points[(i - 1 + sides) % sides]

      const toPrev = { x: prev.x - current.x, y: prev.y - current.y }
      const toNext = { x: next.x - current.x, y: next.y - current.y }

      const lenPrev = Math.sqrt(toPrev.x * toPrev.x + toPrev.y * toPrev.y)
      const lenNext = Math.sqrt(toNext.x * toNext.x + toNext.y * toNext.y)

      const normPrev = { x: toPrev.x / lenPrev, y: toPrev.y / lenPrev }
      const normNext = { x: toNext.x / lenNext, y: toNext.y / lenNext }

      const cpPrev = {
        x: current.x + normPrev.x * maxBorderRadius,
        y: current.y + normPrev.y * maxBorderRadius,
      }

      const cpNext = {
        x: current.x + normNext.x * maxBorderRadius,
        y: current.y + normNext.y * maxBorderRadius,
      }

      if (i === 0) {
        ctx.moveTo(cpPrev.x, cpPrev.y)
      } else {
        ctx.lineTo(cpPrev.x, cpPrev.y)
      }

      ctx.quadraticCurveTo(current.x, current.y, cpNext.x, cpNext.y)
    }
  } else {
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < sides; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
  }

  ctx.closePath()

  if (fill) {
    ctx.fill()
  }

  if (stroke) {
    ctx.stroke()
  }

  ctx.restore()
}
