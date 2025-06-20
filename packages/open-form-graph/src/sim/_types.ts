import { RGB } from "@/_types"

export type Transform = { x: number; y: number; scale: number }
export type Point = { x: number; y: number }
export type TransformListener = (t: Transform) => void
export type MouseListener = (x: number, y: number) => void
export type Focus = () => Transform | null
export type SimpleHighlight = string
export type CustomHighlight = {
  id: string
  linkFrom?: string
  linkTo?: string
  strokeColor?: RGB
  linkColor?: RGB
  scale?: number
  isDetached?: boolean
  onTop?: boolean
}
export type HighlightStyle = CustomHighlight
