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
import { Transform } from "@/hooks/useTransform"
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
}

export interface OpenFormGraphApi {
  rootId: string
  rootImageSources: RootNodeImageSources
  setSelectedNode: Dispatch<SimNode | null>
  setHoveredNode: Dispatch<SimNode | null>
  theme: ThemeMode
  hideThumbnails: boolean
  setHideThumbnails?: Dispatch<boolean>
  config: GraphConfig
  data: RawGraphData
  simulation: MutableRefObject<OpenGraphSimulation | null>
  selectedNode: SimNode | null
  hoveredNode: SimNode | null
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
})

export function OpenFormGraphProvider({
  theme = "light",
  rootId,
  children,
  rootImageSources = [],
  config = DEFAULT_GRAPH_CONFIG,
  data,
}: OpenFormGraphProviderProps) {
  const simulation = useRef<OpenGraphSimulation | null>(null)
  const [selectedNode, setSelectedNode] = useState<SimNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null)
  const [hideThumbnails, setHideThumbnails] = useState(false)

  const contextValue: OpenFormGraphApi = useMemo(() => {
    return {
      rootId,
      selectedNode,
      setSelectedNode: n => {
        setSelectedNode(n)
        simulation.current?.setSelectedNode(n)
      },
      hoveredNode,
      setHoveredNode,
      hideThumbnails,
      setHideThumbnails,
      rootImageSources,
      theme,
      config,
      data,
      simulation,
    }
  }, [
    rootId,
    selectedNode,
    setSelectedNode,
    hoveredNode,
    setHoveredNode,
    hideThumbnails,
    setHideThumbnails,
    rootImageSources,
    config,
    data,
    simulation,
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
