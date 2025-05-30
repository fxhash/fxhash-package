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
  onSelectedNodeChange?: (node: SimNode | null) => void
  onHoveredNodeChange?: (node: SimNode | null) => void
}

export interface OpenFormGraphApi {
  rootId: string
  rootImageSources: RootNodeImageSources
  setSelectedNode: Dispatch<SimNode | null>
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
  setSelectedNode: () => {},
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
  onSelectedNodeChange,
  onHoveredNodeChange,
}: OpenFormGraphProviderProps) {
  const selectedNodeRef = useRef<SimNode | null>(null)
  const hoveredNodeRef = useRef<SimNode | null>(null)
  const [hideThumbnails, setHideThumbnails] = useState(false)
  const [_theme, setTheme] = useState<ThemeMode>(theme)

  const transformRef = useRef<Transform>({ x: 0, y: 0, scale: 1 })
  const targetTransformRef = useRef<Transform>({ x: 0, y: 0, scale: 1 })
  const isAnimatingRef = useRef<boolean>(false)
  const animationFrameRef = useRef<number | null>(null)

  const setSelectedNode = useCallback(
    (n: SimNode | null) => {
      if (n !== selectedNodeRef.current) {
        selectedNodeRef.current = n
        onSelectedNodeChange?.(n)
      }
    },
    [onSelectedNodeChange]
  )

  const setHoveredNode = useCallback(
    (n: SimNode | null) => {
      if (n !== hoveredNodeRef.current) {
        hoveredNodeRef.current = n
        onHoveredNodeChange?.(n)
      }
    },
    [onHoveredNodeChange]
  )

  const contextValue: OpenFormGraphApi = useMemo(() => {
    return {
      rootId,
      selectedNodeRef,
      setSelectedNode,
      hoveredNodeRef,
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
    setSelectedNode,
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
