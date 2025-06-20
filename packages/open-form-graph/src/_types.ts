import { SimulationNodeDatum, SimulationLinkDatum } from "d3-force"

export type RootNodeImageSources = [string?, string?]

export type RawNode = {
  id: string
  label?: string
  imgSrc?: string
  status?: string
  signed?: boolean
}

export type NestedRawNode<N extends RawNode> = {
  children: NestedRawNode<N>[]
} & N

export type RawLink = {
  source: string
  target: string
}

export type Link = {
  source: Node
  target: Node
}

export type Node = {
  collapsed: boolean
  hide: boolean
  clusterSize: number
  level?: number
  childLinks: Link[]
  image?: HTMLImageElement
} & RawNode

export type RawGraphData = { nodes: RawNode[]; links: RawLink[] }
export type GraphData = { nodes: SimNode[]; links: SimLink[] }

export type ThemeMode = "dark" | "light"
export type RGB = [number, number, number]
export type ColorTransform = (rgb: RGB) => RGB

export type NodeState = {
  collapsed?: boolean
  image?: HTMLImageElement
}

export type SimNode = {
  state?: NodeState
  clusterSize?: number
  depth?: number
} & RawNode &
  SimulationNodeDatum

export type SimLink = {} & SimulationLinkDatum<SimNode>
