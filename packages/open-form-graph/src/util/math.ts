type Point = { x: number; y: number }

export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return Math.sqrt(dx * dx + dy * dy)
}

export function getRadialPoint(
  r: number,
  cx: number,
  cy: number,
  angle: number = Math.random() * 2 * Math.PI
): Point {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

export function getAngle(cx: number, cy: number, x: number, y: number): number {
  return Math.atan2(y - cy, x - cx)
}
