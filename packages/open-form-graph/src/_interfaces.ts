import { ForceGraphMethods } from "react-force-graph-2d"
import { ForceGraphMethods as ForceGraphMethods3D } from "react-force-graph-3d"
import { GraphData, Link, Node } from "./_types.js"

export interface GraphConfig {
  debug: false
  nodeSize: number
  minClusterSize: number
  maxClusterSize: number
  minZoom: number
  maxZoom: number
  theme: {
    dark: [number, number, number]
    light: [number, number, number]
  }
}

export interface LayoutConfig {
  velocityDecay: number
  alphaDecay: number
  alphaMin: number
  dagLevelDistance: number
}

type _ForceGraphMethods = ForceGraphMethods<Node, Link> | ForceGraphMethods3D<Node, Link>

export interface OpenFormGraphApi {
  ref: React.MutableRefObject<_ForceGraphMethods | undefined>
  rootId: string
  data: GraphData
  onClickNode: (node: Node) => void
  hasNodeChildren: (nodeId: string) => boolean
  clusterSizeRange: [number, number]
  graphLevelRange: [number, number]
  setLayoutConfig: React.Dispatch<React.SetStateAction<LayoutConfig>>
  layoutConfig: LayoutConfig
  selectedNode: Node | null
  setSelectedNode: (node: Node | null) => void
  highlights: GraphData
  theme: "dark" | "light"
  setTheme: (theme: "dark" | "light") => void
  config: GraphConfig
  setConfig: React.Dispatch<React.SetStateAction<GraphConfig>>
  getNodeSize: (nodeId: string) => number
  getNodeForce: (nodeId: string) => number
}
