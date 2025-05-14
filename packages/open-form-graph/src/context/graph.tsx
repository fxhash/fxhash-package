import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react"
import { ForceGraphMethods, NodeObject, LinkObject } from "react-force-graph-2d"
import { scaleLinear } from "d3-scale"
import { GraphConfig, OpenFormGraphApi } from "@/_interfaces"
import { RawNode, RawLink, Link, GraphData, Node } from "@/_types"
import { preloadImage } from "@/util/img"
import { DEFAULT_GRAPH_CONFIG } from "./constants"
import { normalize } from "@/util/math"
import { collectChildren } from "@/util/data"

interface OpenFormGraphProviderProps {
  config?: Partial<GraphConfig>
  theme: "dark" | "light"
  children: ReactNode
  data: {
    nodes: RawNode[]
    links: RawLink[]
  }
  rootId: string
}

const OpenFormGraphContext = createContext<OpenFormGraphApi | undefined>(
  undefined
)

export function OpenFormGraphProvider({
  config = {},
  theme = "light",
  data,
  rootId: _rootId,
  children,
}: OpenFormGraphProviderProps) {
  const [rootId, setRootId] = useState<string>(_rootId)
  const [_config, setConfig] = useState<GraphConfig>({
    ...DEFAULT_GRAPH_CONFIG,
    ...config,
  })
  const [_theme, setTheme] = useState<"dark" | "light">(theme)

  const [layoutConfig, setLayoutConfig] = useState({
    velocityDecay: 0.33,
    alphaDecay: 0.17,
    alphaMin: 0.00005,
    dagLevelDistance: 100,
  })
  const ref = useRef<
    ForceGraphMethods<NodeObject<Node>, LinkObject<Node, Link>> | undefined
  >()

  const graphData = useMemo<GraphData>(() => {
    const _nodes = [...data.nodes].map(n => {
      const enhancedNode: Node = {
        ...n,
        clusterSize: data.nodes.length,
        collapsed: n.id !== rootId,
        childLinks: [],
        level: undefined,
        hide: false,
      }

      if ("imgSrc" in n && typeof n.imgSrc === "string") {
        enhancedNode.image = preloadImage(n.imgSrc, ref)
      }

      return enhancedNode
    })

    const nodesById: Record<string, Node> = Object.fromEntries(
      _nodes.map(node => [node.id, node])
    )

    const transformedLinks = data.links.map(l => ({
      source: nodesById[l.source],
      target: nodesById[l.target],
    }))

    // If the root node id does not exist, create one
    if (!nodesById[rootId]) {
      const rootNode: Node = {
        id: rootId,
        label: "Root Node",
        clusterSize: data.nodes.length,
        collapsed: false,
        childLinks: [],
        level: 0,
        hide: false,
      }

      _nodes.push(rootNode)
      nodesById[rootId] = rootNode

      const targetIds = new Set(transformedLinks.map(link => link.target.id))
      const innerRootNodes = _nodes.filter(
        node => node.id !== rootId && !targetIds.has(node.id)
      )

      const newRootLinks = innerRootNodes.map(node => ({
        source: rootNode,
        target: node,
      }))

      return {
        nodes: _nodes,
        links: [...transformedLinks, ...newRootLinks],
      }
    }

    // If root node exists, proceed with original logic
    return {
      nodes: _nodes,
      links: transformedLinks,
    }
  }, [data, rootId])

  const nodesById = useMemo<Record<string, Node>>(() => {
    const nodesById = Object.fromEntries(
      graphData.nodes.map(node => [node.id, node])
    )

    graphData.nodes.forEach(node => {
      node.childLinks = []
    })
    graphData.links.forEach(link =>
      nodesById[link.source.id]?.childLinks.push(link)
    )

    const root = nodesById[rootId]
    const queue = [root]
    while (queue.length > 0) {
      const node = queue.shift()!
      const childNodes = node.childLinks.map(link => link.target)
      for (const child of childNodes) {
        if (child.level === undefined) {
          child.level = (node?.level || 0) + 1
          queue.push(child)
        }
      }
    }

    graphData.nodes.forEach(node => {
      if (node.id === rootId) {
        node.collapsed = false
        return
      }

      const childNodes = node.childLinks.map(link => link.target)

      const shouldCollapse = childNodes.every(
        child => child.childLinks.length === 0
      )
      node.collapsed = shouldCollapse

      function countDescendants(n: Node): number {
        const children = n.childLinks.map(link => link.target)
        if (children.length === 0) return 0
        return (
          children.length +
          children.map(countDescendants).reduce((a, b) => a + b, 0)
        )
      }

      node.clusterSize = countDescendants(node)
      if (node.clusterSize === 0) node.collapsed = false
    })

    return nodesById
  }, [graphData.links, graphData.nodes, rootId])

  const hasNodeChildren = useCallback(
    (nodeId: string) => nodesById[nodeId]?.childLinks.length > 0,
    [nodesById]
  )

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null
    const n = graphData.nodes.find(n => n.id === selectedNodeId)
    if (n) return n
    return null
  }, [graphData.nodes, selectedNodeId])

  const breadthFirstSearch = (
    startNodeId: string,
    rootId: string
  ): { nodes: Node[]; links: Link[] } => {
    const startNode = nodesById[startNodeId]
    const resultNodes: Node[] = [startNode]
    const visited = new Set<string>([startNode.id])
    let currentNode = startNode
    let pathToRoot: Node[] = []

    while (currentNode.id !== rootId) {
      let foundParent = false

      for (const link of graphData.links) {
        const sourceId = link.source.id
        const targetId = link.target.id

        if (targetId === currentNode.id) {
          const parentNode = nodesById[sourceId]
          if (parentNode && !visited.has(parentNode.id)) {
            pathToRoot.push(parentNode)
            visited.add(parentNode.id)
            currentNode = parentNode
            foundParent = true
            break
          }
        }
      }

      if (!foundParent || currentNode.id === rootId) break
    }

    const rootNode = nodesById[rootId]
    if (rootNode && !visited.has(rootId)) {
      pathToRoot.push(rootNode)
      visited.add(rootId)
    }

    resultNodes.push(...pathToRoot)

    graphData.links.forEach(link => {
      const sourceId = link.source.id
      const targetId = link.target.id

      if (sourceId === startNode.id) {
        const childNode = nodesById[targetId]
        if (childNode && !visited.has(childNode.id)) {
          resultNodes.push(childNode)
          visited.add(childNode.id)
        }
      }
    })

    const resultLinks = graphData.links.filter(link => {
      const sourceId =
        typeof link.source === "object" ? link.source.id : link.source
      const targetId =
        typeof link.target === "object" ? link.target.id : link.target

      return visited.has(sourceId) && visited.has(targetId)
    })

    return { nodes: resultNodes, links: resultLinks }
  }

  const highlights = useMemo(() => {
    if (!selectedNodeId) {
      return { nodes: [], links: [] }
    }

    const node = nodesById[selectedNodeId]
    if (!node) {
      return { nodes: [], links: [] }
    }

    const pathHighlights = breadthFirstSearch(node.id, rootId)
    const children = collectChildren(node, 25)

    return {
      nodes: [...pathHighlights.nodes, ...children.nodes],
      links: [...pathHighlights.links, ...children.links],
    }
  }, [selectedNodeId, nodesById, rootId, breadthFirstSearch])

  const prunedTree = useMemo(() => {
    const visibleNodes: Node[] = []
    const visibleLinks: Link[] = []
    ;(function traverseTree(node = nodesById[rootId]) {
      visibleNodes.push(node)
      if (node.collapsed) return
      visibleLinks.push(...node.childLinks)
      node.childLinks.map(link => link.target).forEach(traverseTree)
    })()
    visibleNodes.sort((a, b) => {
      const aHighlighted = highlights.nodes.includes(a)
      const bHighlighted = highlights.nodes.includes(b)

      if (aHighlighted && !bHighlighted) return -1
      if (!aHighlighted && bHighlighted) return 1
      if (a.collapsed && !b.collapsed) return 1
      if (!a.collapsed && b.collapsed) return -1
      return 0
    })

    return { nodes: visibleNodes, links: visibleLinks }
  }, [nodesById, rootId, highlights])

  // Modified handleNodeClick that uses the memoized highlights
  const handleNodeClick = useCallback(
    (nodeId: string) => {
      const node = nodesById[nodeId]
      if (node.id === rootId) {
        setSelectedNodeId(null)
        return
      }

      if (selectedNode?.id !== node.id) {
        node.collapsed = false
      } else {
        node.collapsed = !node.collapsed
      }

      if (node.collapsed) {
        if (selectedNode) {
          function collapseFrom(node: Node) {
            const childNodes = node.childLinks.map(link => link.target)
            const shouldCollapse = childNodes.every(
              child => child.childLinks.length === 0
            )
            node.collapsed = shouldCollapse
            childNodes.forEach(collapseFrom)
            if (node.clusterSize === 0) node.collapsed = false
          }

          collapseFrom(selectedNode)
        }
        setSelectedNodeId(null)
        // No need to explicitly set highlights here as they will be updated via useMemo
      } else {
        // Expand the children nodes
        const children = collectChildren(node, 25)
        children.nodes.forEach(n => {
          n.collapsed = false
        })

        setSelectedNodeId(node.id)
        // No need to explicitly set highlights here as they will be updated via useMemo
      }
    },
    [rootId, selectedNode, collectChildren, nodesById, setSelectedNodeId]
  )

  useEffect(() => {
    setLayoutConfig(prev => ({
      ...prev,
      dagLevelDistance: scaleLinear()
        .domain([0, data.nodes.length])
        .range([_config.minDagLevelDistance, _config.maxDagLevelDistance])(
        prunedTree.nodes.length
      ),
    }))
  }, [prunedTree.nodes.length, data.nodes.length, _config])

  const allSizes = graphData.nodes
    .filter(n => n.collapsed)
    .map(n => n.clusterSize || 1)
  const minClusterSize = Math.min(...allSizes)
  const maxClusterSize = Math.max(...allSizes)

  const allLevels = graphData.nodes.map(n => n.level || 0)
  const minNodeLevel = Math.min(...allLevels)
  const maxNodeLevel = Math.max(...allLevels)

  const getNodeSize = useCallback(
    (nodeId: string) => {
      const n = nodesById[nodeId]
      if (!n) return 0
      if (!n.collapsed && hasNodeChildren(n.id)) return _config.nodeSize
      if (!n.collapsed || n.id === rootId) return _config.nodeSize
      return normalize(
        n.clusterSize,
        minClusterSize,
        maxClusterSize,
        _config.minClusterSize / 2,
        _config.maxClusterSize / 2
      )
    },
    [
      _config,
      minClusterSize,
      maxClusterSize,
      rootId,
      hasNodeChildren,
      nodesById,
    ]
  )

  const getNodeForce = useCallback(
    (nodeId: string) => {
      const n = nodesById[nodeId]
      if (!n) return 0
      if (selectedNode?.id === n.id) return _config.nodeSize * 1.5
      if (!n.collapsed && hasNodeChildren(n.id)) return _config.nodeSize * 2
      if (!n.collapsed || n.id === rootId) return _config.nodeSize * 0.75
      return normalize(
        n.clusterSize,
        minClusterSize,
        maxClusterSize,
        _config.minClusterSize / 2,
        _config.maxClusterSize / 2
      )
    },
    [
      _config,
      minClusterSize,
      maxClusterSize,
      rootId,
      hasNodeChildren,
      selectedNode,
      nodesById,
    ]
  )

  const contextValue: OpenFormGraphApi = {
    rootId,
    data: prunedTree,
    onClickNode: handleNodeClick,
    hasNodeChildren,
    clusterSizeRange: [minClusterSize, maxClusterSize],
    graphLevelRange: [minNodeLevel, maxNodeLevel],
    layoutConfig,
    setLayoutConfig,
    selectedNode,
    setSelectedNodeId,
    selectedNodeId,
    highlights,
    ref,
    theme: _theme,
    setTheme,
    config: _config,
    setConfig,
    getNodeSize,
    getNodeForce,
    search: breadthFirstSearch,
  }

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
