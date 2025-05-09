import { scaleSequential } from "d3-scale"
import { interpolateInferno } from "d3-scale-chromatic"

export const debugColor = scaleSequential(interpolateInferno)

export const DEBUG = false

export const NODE_SIZE = 15
export const NODE_WIDTH = NODE_SIZE
export const NODE_HEIGHT = NODE_SIZE

export const MIN_CLUSTER_SIZE = 5
export const MAX_CLUSTER_SIZE = 15

export const MIN_ZOOM = 0.2
export const MAX_ZOOM = 10

const OPACITY = 0.15

export const DARK = [255, 255, 255] as [number, number, number]
export const LIGHT = [0, 0, 0] as [number, number, number]

export const STROKE_COLOR_DARK = `rgba(255,255,255,1)`
export const STROKE_COLOR_LIGHT = `rgba(0,0,0,1)`
export const STROKE_COLOR_DARK_OPACITY = `rgba(255,255,255,${OPACITY})`
export const STROKE_COLOR_LIGHT_OPACITY = `rgba(0,0,0,${OPACITY})`


