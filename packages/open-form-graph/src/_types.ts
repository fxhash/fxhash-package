export type RawNode = {
  id: string
  label: string
  imgSrc?: string
}

export type RawLink = {
  source: string
  target: string
}


export type Link = {
  source: Node
  target: Node
}

export type Node = {
  id: string
  collapsed: boolean
  hide: boolean
  clusterSize: number
  level?: number
  childLinks: Link[]
  image?: HTMLImageElement
} & RawNode

export type RawGraphData = { nodes: RawNode[]; links: RawLink[] }
export type GraphData = { nodes: Node[]; links: Link[] }

export type RGB = [number, number, number];
export type ColorTransform = (rgb: RGB) => RGB;
