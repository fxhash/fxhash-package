import { SimulationNodeDatum, SimulationLinkDatum } from "d3-force"
import groupBy from "lodash.groupby"
import { MappedArray } from "@fxhash/utils"
import { getLinkId, isSimNode } from "."

export type Dictionary = ReturnType<typeof groupBy>

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
export type GraphData = {
  nodes: MappedArray<SimNode, "id", "collapsed" | "groupNode">
  links: MappedArray<SimLink, "targetId" | "linkId", "sourceId">
}

export function newGraphData(data?: {
  nodes?: SimNode[]
  links?: SimLink[]
}): GraphData {
  return {
    nodes: new MappedArray(
      {
        id: {
          getKey: node => node.id,
          multi: false,
        },
        collapsed: {
          getKey: node => (!!node.state?.collapsed).toString(),
          multi: true,
        },
        groupNode: {
          getKey: node => (!!node.state?.groupNode).toString(),
          multi: true,
        },
      },
      data?.nodes
    ),
    links: new MappedArray(
      {
        targetId: {
          getKey: link =>
            (isSimNode(link.target) ? link.target.id : link.target).toString(),
          multi: false,
        },
        linkId: {
          getKey: link => getLinkId(link),
          multi: false,
        },
        sourceId: {
          getKey: link =>
            (isSimNode(link.source) ? link.source.id : link.source).toString(),
          multi: true,
        },
      },
      data?.links
    ),
  }
}

export type ThemeMode = "dark" | "light"
export type RGB = [number, number, number]
export type ColorTransform = (rgb: RGB) => RGB

export type NodeState = {
  collapsed?: boolean
  image?: HTMLImageElement
  // TODO: Node state should get a type instead of those boolean flags
  sessionNode?: boolean
  emitterNode?: boolean
  rootNode?: boolean
  groupNode?: boolean
  groupContent?: string[]
}

export type SimNode = {
  state?: NodeState
  clusterSize?: number
  depth?: number
} & RawNode &
  SimulationNodeDatum

export type SimLink = {} & SimulationLinkDatum<SimNode>
