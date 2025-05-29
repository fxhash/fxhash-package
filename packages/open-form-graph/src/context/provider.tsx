import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  useMemo,
} from "react"
import {
  RawGraphData,
  RawLink,
  RawNode,
  RootNodeImageSources,
  SimNode,
  ThemeMode,
} from "@/_types"
import { GraphConfig } from "@/_interfaces"
import { DEFAULT_GRAPH_CONFIG } from "./constants"

export interface OpenFormGraphApi {
  rootId: string
  rootImageSources: RootNodeImageSources
  selectedNode: SimNode | null
  setSelectedNode: Dispatch<SimNode | null>
  hoveredNode: SimNode | null
  setHoveredNode: Dispatch<SimNode | null>
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  hideThumbnails: boolean
  setHideThumbnails?: Dispatch<boolean>
  config: GraphConfig
  data: RawGraphData
}

interface OpenFormGraphProviderProps {
  rootId: string
  rootImageSources: RootNodeImageSources
  theme: ThemeMode
  children: ReactNode
  config?: GraphConfig
  data: RawGraphData
}

const OpenFormGraphContext = createContext<OpenFormGraphApi>({
  rootId: "",
  rootImageSources: [],
  selectedNode: null,
  setSelectedNode: () => {},
  hoveredNode: null,
  setHoveredNode: () => {},
  theme: "light",
  setTheme: () => {},
  hideThumbnails: false,
  setHideThumbnails: () => {},
  config: DEFAULT_GRAPH_CONFIG,
  data: { nodes: [], links: [] },
})

export function OpenFormGraphProvider({
  theme = "light",
  rootId,
  children,
  rootImageSources = [],
  config = DEFAULT_GRAPH_CONFIG,
  data,
}: OpenFormGraphProviderProps) {
  const [hideThumbnails, setHideThumbnails] = useState(false)
  const [selectedNode, setSelectedNode] = useState<SimNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null)
  const [_theme, setTheme] = useState<ThemeMode>(theme)

  const contextValue: OpenFormGraphApi = useMemo(() => {
    return {
      rootId,
      selectedNode,
      setSelectedNode,
      hoveredNode,
      setHoveredNode,
      hideThumbnails,
      setHideThumbnails,
      rootImageSources: rootImageSources,
      theme: _theme,
      setTheme,
      config,
      data,
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
    _theme,
    setTheme,
    config,
    data,
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
