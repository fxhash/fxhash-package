import { RGB } from "@/_types"

export type Transform = { x: number; y: number; scale: number }
export type Point = { x: number; y: number }
export type TransformListener = (t: Transform) => void
export type MouseListener = (x: number, y: number) => void
export type Focus = () => Transform
export type SimpleHighlight = string
export type CustomHighlight = {
  id: string
  linkFrom?: string
  linkTo?: string
  nodeColor?: string
  strokeStyle?: string
  strokeWidth?: number
}
export type Highlight = SimpleHighlight | CustomHighlight
