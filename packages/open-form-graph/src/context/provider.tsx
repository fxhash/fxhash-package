import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  useMemo,
  useRef,
  MutableRefObject,
  useCallback,
} from "react"
import {
  RawGraphData,
  RootNodeImageSources,
  SimNode,
  ThemeMode,
} from "@/_types"
import { GraphConfig } from "@/_interfaces"
import { DEFAULT_GRAPH_CONFIG } from "./constants"
import { OpenGraphSimulation } from "@/sim/OpenGraphSimulation"

interface OpenFormGraphProviderProps {
  rootId: string
  rootImageSources: RootNodeImageSources
  theme: ThemeMode
  children: ReactNode
  config?: GraphConfig
  data: RawGraphData
  onSelectedNodeChange?: (node: SimNode | null) => void
  onHoveredNodeChange?: (node: SimNode | null) => void
  lockedNodeId?: string
  hideThumbnails?: boolean
}

export interface OpenFormGraphApi {
  rootId: string
  rootImageSources: RootNodeImageSources
  setSelectedNode: Dispatch<SimNode | null>
  setHoveredNode: Dispatch<SimNode | null>
  theme: ThemeMode
  hideThumbnails: boolean
  setHideThumbnails: Dispatch<boolean>
  config: GraphConfig
  data: RawGraphData
  simulation: MutableRefObject<OpenGraphSimulation | null>
  selectedNode: SimNode | null
  hoveredNode: SimNode | null
  setSelectedNodeById: (nodeId: string) => void
  lockedNodeId?: string
}

const OpenFormGraphContext = createContext<OpenFormGraphApi>({
  rootId: "",
  rootImageSources: [],
  setSelectedNode: () => {},
  setHoveredNode: () => {},
  theme: "light",
  hideThumbnails: false,
  setHideThumbnails: () => {},
  config: DEFAULT_GRAPH_CONFIG,
  data: { nodes: [], links: [] },
  selectedNode: null,
  hoveredNode: null,
  simulation: { current: null },
  setSelectedNodeById: () => {},
})

export function OpenFormGraphProvider({
  theme = "light",
  rootId,
  children,
  rootImageSources = [],
  config = DEFAULT_GRAPH_CONFIG,
  data,
  lockedNodeId,
  hideThumbnails: _hideThumbnails = false,
}: OpenFormGraphProviderProps) {
  const simulation = useRef<OpenGraphSimulation | null>(null)
  const [selectedNode, _setSelectedNode] = useState<SimNode | null>(null)
  const [hoveredNode, _setHoveredNode] = useState<SimNode | null>(null)
  const [hideThumbnails, setHideThumbnails] = useState(_hideThumbnails)

  const setSelectedNode = useCallback(
    (node: SimNode | null) => {
      if (node === selectedNode) return
      _setSelectedNode(node)
      simulation.current?.setSelectedNode(node)
    },
    [_setSelectedNode, selectedNode]
  )

  const setSelectedNodeById = useCallback(
    (nodeId: string) => {
      if (nodeId === selectedNode?.id) return
      const node = simulation.current?.getNodeById(nodeId)
      if (node) {
        simulation.current?.handleClickNode(node)
      }
    },
    [setSelectedNode, selectedNode]
  )

  const setHoveredNode = useCallback(
    (node: SimNode | null) => {
      if (node === hoveredNode) return
      _setHoveredNode(node)
    },
    [_setHoveredNode, hoveredNode]
  )

  const contextValue: OpenFormGraphApi = useMemo(() => {
    return {
      rootId,
      selectedNode,
      setSelectedNode,
      setSelectedNodeById,
      hoveredNode,
      setHoveredNode,
      hideThumbnails,
      setHideThumbnails,
      rootImageSources,
      theme,
      config,
      data,
      simulation,
      lockedNodeId,
    }
  }, [
    rootId,
    selectedNode,
    setSelectedNode,
    setSelectedNodeById,
    hoveredNode,
    setHoveredNode,
    hideThumbnails,
    setHideThumbnails,
    rootImageSources,
    config,
    data,
    simulation,
    lockedNodeId,
  ])

  return (
    <OpenFormGraphContext.Provider value={contextValue}>
      {children}
    </OpenFormGraphContext.Provider>
  )
}

export function useOpenFormGraph(): OpenFormGraphApi {
  const context = useContext(OpenFormGraphContext)
  if (!context) {
    throw new Error(
      "useOpenFormGraph must be used within a OpenFormGraphProvider"
    )
  }
  return context
}
