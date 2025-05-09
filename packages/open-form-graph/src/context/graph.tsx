import React, {
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
import { GraphDataApi } from "@/_interfaces"
import { RawNode, RawLink, Link, GraphData, Node } from "@/_types"

interface GraphDataProviderProps {
  theme: "dark" | "light"
  children: ReactNode
  data: {
    nodes: RawNode[]
    links: RawLink[]
  }
  rootId: string
}

const GraphDataContext = createContext<GraphDataApi | undefined>(undefined)

const imageCache = new Map<string, HTMLImageElement>()

function preloadImage(
  url: string,
  ref: React.MutableRefObject<ForceGraphMethods<Node, Link> | undefined>
): HTMLImageElement {
  if (imageCache.has(url)) return imageCache.get(url)!
  const img = new Image()
  img.src = url
  imageCache.set(url, img)
  img.onload = () => {
    // this is a hack to force the canvans to refresh
    ref?.current?.zoomToFit(1)
  }
  return img
}

export function GraphDataProvider({
  theme = "light",
  data,
  rootId,
  children,
}: GraphDataProviderProps) {
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
      }

      if ("imgSrc" in n && typeof n.imgSrc === "string") {
        enhancedNode.image = preloadImage(n.imgSrc, ref)
      }

      return enhancedNode
    })

    const nodesById: Record<string, Node> = Object.fromEntries(
      _nodes.map(node => [node.id, node])
    )

    return {
      nodes: _nodes,
      links: data.links.map(l => ({ source: nodesById[l.source], target: nodesById[l.target] })),
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
  }, [graphData, rootId])

  const [highlights, setHighlights] = useState<{ nodes: Node[], links: Link[] }>({ nodes: [], links: [] })

  const getPrunedTree = useCallback(() => {
    const visibleNodes: Node[] = []
    const visibleLinks: Link[] = []
      ; (function traverseTree(node = nodesById[rootId]) {
        visibleNodes.push(node)
        if (node.collapsed) return
        visibleLinks.push(...node.childLinks)
        node.childLinks
          .map(link => link.target)
          .forEach(traverseTree)
      })()
    visibleNodes.sort((a, b) => {
      const aHighlighted = highlights.nodes.includes(a);
      const bHighlighted = highlights.nodes.includes(b);

      if (aHighlighted && !bHighlighted) return -1;
      if (!aHighlighted && bHighlighted) return 1;
      if (a.collapsed && !b.collapsed) return 1;
      if (!a.collapsed && b.collapsed) return -1;
      return 0;
    });

    return { nodes: visibleNodes, links: visibleLinks }
  }, [nodesById, rootId, highlights])

  const hasNodeChildren = useCallback(
    (nodeId: string) => nodesById[nodeId]?.childLinks.length > 0,
    [nodesById]
  )

  const [prunedTree, setPrunedTree] = useState(getPrunedTree())
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const breadthFirstSearch = (startNode: Node, rootId: string): { nodes: Node[], links: any[] } => {
    const resultNodes: Node[] = [startNode];
    const visited = new Set<string>([startNode.id]);
    let currentNode = startNode;
    let pathToRoot: Node[] = [];

    while (currentNode.id !== rootId) {
      let foundParent = false;

      for (const link of graphData.links) {
        const sourceId = link.source.id
        const targetId = link.target.id

        if (targetId === currentNode.id) {
          const parentNode = nodesById[sourceId];
          if (parentNode && !visited.has(parentNode.id)) {
            pathToRoot.push(parentNode);
            visited.add(parentNode.id);
            currentNode = parentNode;
            foundParent = true;
            break;
          }
        }
      }

      if (!foundParent || currentNode.id === rootId) break;
    }

    const rootNode = nodesById[rootId];
    if (rootNode && !visited.has(rootId)) {
      pathToRoot.push(rootNode);
      visited.add(rootId);
    }

    resultNodes.push(...pathToRoot);

    graphData.links.forEach(link => {
      const sourceId = link.source.id
      const targetId = link.target.id

      if (sourceId === startNode.id) {
        const childNode = nodesById[targetId];
        if (childNode && !visited.has(childNode.id)) {
          resultNodes.push(childNode);
          visited.add(childNode.id);
        }
      }
    });

    const resultLinks = graphData.links.filter(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;

      return visited.has(sourceId) && visited.has(targetId);
    });

    return { nodes: resultNodes, links: resultLinks };
  };

  const handleNodeClick = useCallback(
    (node: Node) => {
      setSelectedNode(node)
      if (node === selectedNode) {
        node.collapsed = !node.collapsed
      }
      const highlights = breadthFirstSearch(node, rootId)
      setHighlights(highlights)
      setPrunedTree(getPrunedTree())
    },
    [getPrunedTree, graphData.links, nodesById, selectedNode]
  )

  useEffect(() => {
    setLayoutConfig(prev => ({
      ...prev,
      dagLevelDistance: scaleLinear()
        .domain([0, data.nodes.length])
        .range([80, 400])(prunedTree.nodes.length),
    }))
  }, [prunedTree.nodes.length, data.nodes.length])

  const allSizes = graphData.nodes
    .filter(n => n.collapsed)
    .map(n => n.clusterSize || 1)
  const minClusterSize = Math.min(...allSizes)
  const maxClusterSize = Math.max(...allSizes)

  const allLevels = graphData.nodes.map(n => n.level || 0)
  const minNodeLevel = Math.min(...allLevels)
  const maxNodeLevel = Math.max(...allLevels)

  const contextValue: GraphDataApi = {
    rootId,
    data: prunedTree,
    onClickNode: handleNodeClick,
    hasNodeChildren,
    clusterSizeRange: [minClusterSize, maxClusterSize],
    graphLevelRange: [minNodeLevel, maxNodeLevel],
    layoutConfig,
    setLayoutConfig,
    selectedNode,
    setSelectedNode,
    highlights,
    ref,
    theme: _theme,
    setTheme
  }

  return (
    <GraphDataContext.Provider value={contextValue} >
      {children}
    </GraphDataContext.Provider>
  )
}

export function useGraphDataContext(): GraphDataApi {
  const context = useContext(GraphDataContext)
  if (!context) {
    throw new Error(
      "useGraphDataContext must be used within a GraphDataProvider"
    )
  }
  return context
}
