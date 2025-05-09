import { ForceGraphMethods } from "react-force-graph-2d"
import { GraphData, Link, Node } from "./_types.js"

export interface LayoutConfig {
  velocityDecay: number
  alphaDecay: number
  alphaMin: number
  dagLevelDistance: number
}

export interface GraphDataApi {
  ref: React.MutableRefObject<ForceGraphMethods<Node, Link> | undefined>
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
}
