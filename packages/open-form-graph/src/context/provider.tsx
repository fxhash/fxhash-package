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

interface OpenFormGraphProviderProps {
  rootId: string
  rootImageSources: RootNodeImageSources
  theme: ThemeMode
  children: ReactNode
  config?: GraphConfig
  data: RawGraphData
}

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
  selectedNodeRef: MutableRefObject<SimNode | null>
  hoveredNodeRef: MutableRefObject<SimNode | null>
  transformRef: MutableRefObject<Transform>
  targetTransformRef: MutableRefObject<Transform>
  isAnimatingRef: MutableRefObject<boolean>
  animationFrameRef: MutableRefObject<number | null>
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
  selectedNodeRef: { current: null },
  hoveredNodeRef: { current: null },
  transformRef: { current: { x: 0, y: 0, scale: 1 } },
  targetTransformRef: { current: { x: 0, y: 0, scale: 1 } },
  isAnimatingRef: { current: false },
  animationFrameRef: { current: null },
})

export function OpenFormGraphProvider({
  theme = "light",
  rootId,
  children,
  rootImageSources = [],
  config = DEFAULT_GRAPH_CONFIG,
  data,
}: OpenFormGraphProviderProps) {
  const selectedNodeRef = useRef<SimNode | null>(null)
  const [selectedNode, _setSelectedNode] = useState<SimNode | null>(null)
  const hoveredNodeRef = useRef<SimNode | null>(null)
  const [hoveredNode, _setHoveredNode] = useState<SimNode | null>(null)
  const [hideThumbnails, setHideThumbnails] = useState(false)
  const [_theme, setTheme] = useState<ThemeMode>(theme)

  const transformRef = useRef<Transform>({ x: 0, y: 0, scale: 1 })
  const targetTransformRef = useRef<Transform>({ x: 0, y: 0, scale: 1 })
  const isAnimatingRef = useRef<boolean>(false)
  const animationFrameRef = useRef<number | null>(null)

  const setSelectedNode = useCallback(
    (n: SimNode | null) => {
      if (n !== selectedNode) {
        selectedNodeRef.current = n
        _setSelectedNode(n)
      }
    },
    [_setSelectedNode, selectedNode]
  )

  const setHoveredNode = useCallback(
    (n: SimNode | null) => {
      if (n !== hoveredNode) {
        hoveredNodeRef.current = n
        _setHoveredNode(n)
      }
    },
    [_setHoveredNode, hoveredNode]
  )

  const contextValue: OpenFormGraphApi = useMemo(() => {
    return {
      rootId,
      selectedNodeRef,
      selectedNode,
      setSelectedNode,
      hoveredNodeRef,
      hoveredNode,
      setHoveredNode,
      hideThumbnails,
      setHideThumbnails,
      rootImageSources: rootImageSources,
      theme: _theme,
      setTheme,
      config,
      data,
      transformRef,
      targetTransformRef,
      isAnimatingRef,
      animationFrameRef,
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
    transformRef,
    targetTransformRef,
    isAnimatingRef,
    animationFrameRef,
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
