import {
  Simulation,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
} from "d3-force"
import {
  GraphData,
  NodeState,
  RawGraphData,
  RGB,
  RootNodeImageSources,
  SimLink,
  SimNode,
  ThemeMode,
} from "@/_types"
import {
  hasOnlyLeafs,
  getChildren,
  getClusterSize,
  getNodeSubgraph,
  getNodeId,
} from "@/util/graph"
import { GraphConfig } from "@/_interfaces"
import { DEFAULT_GRAPH_CONFIG } from "@/provider"
import { isSimNode } from "@/util/types"
import { loadImage } from "@/util/img"
import { TransformCanvas } from "./TransformCanvas"
import { circle, img, rect } from "@/util/canvas"
import { color, dim } from "@/util/color"
import { scaleLinear, scaleLog } from "d3-scale"
import { getPrunedData } from "@/util/data"

interface OpenGraphSimulationProps {
  width: number
  height: number
  config?: GraphConfig
  rootImageSources?: RootNodeImageSources
  canvas: HTMLCanvasElement
  theme?: ThemeMode
  onHoveredNodeChange?: (node: SimNode | null) => void
  onSelectedNodeChange?: (node: SimNode | null) => void
}

export class OpenGraphSimulation {
  width: number
  height: number
  config: GraphConfig
  rootImageSources: RootNodeImageSources
  canvas: HTMLCanvasElement
  transformCanvas: TransformCanvas
  theme: ThemeMode

  private data: GraphData = { nodes: [], links: [] }
  private prunedData: GraphData = { nodes: [], links: [] }
  private subGraph: GraphData = { nodes: [], links: [] }
  private rootId: string = ""
  private simulation: Simulation<SimNode, SimLink> | null = null
  private clusterSizeRange: [number, number] = [0, 1]

  private imageCache: Map<string, HTMLImageElement> = new Map()
  private rootImages: HTMLImageElement[] = []
  private hideThumbnails: boolean = false
  private noInteraction: boolean = false

  private selectedNode: SimNode | null = null
  onSelectedNodeChange?: (node: SimNode | null) => void
  private hoveredNode: SimNode | null = null
  onHoveredNodeChange?: (node: SimNode | null) => void

  private highlights: string[] = []

  constructor(props: OpenGraphSimulationProps) {
    this.theme = props.theme || "light"
    this.width = props.width
    this.height = props.height
    this.config = props.config || DEFAULT_GRAPH_CONFIG
    this.rootImageSources = props.rootImageSources || []
    this.canvas = props.canvas

    this.onHoveredNodeChange = props.onHoveredNodeChange
    this.onSelectedNodeChange = props.onSelectedNodeChange

    this.transformCanvas = new TransformCanvas(this.canvas, {
      onUpdate: this.onDraw,
      onClick: this.handleClick,
      onMove: this.handleMove,
    })

    this.rootImageSources.forEach((src, idx) => {
      if (src && !this.imageCache.get(src)) {
        loadImage(src).then(img => {
          this.imageCache.set(src, img)
          this.rootImages[idx] = img
        })
      }
    })
  }

  private getNodeAtPosition = (cx: number, cy: number): SimNode | null => {
    const transform = this.transformCanvas.transform
    const { x: tx, y: ty, scale } = transform
    const x = (cx - tx) / scale
    const y = (cy - ty) / scale
    for (let node of this.data.nodes) {
      const r = this.getNodeSize(node.id) / 2
      if (node.x == null || node.y == null) continue
      const dx = node.x - x
      const dy = node.y - y
      if (dx * dx + dy * dy < r * r) {
        return node
      }
    }
    return null
  }

  private getNodeScreenPosition = (node: SimNode): { x: number; y: number } => {
    const _x = node.x || 0
    const _y = node.y || 0
    const transform = this.transformCanvas.transform
    const x = this.width / 2 - _x * transform.scale
    const y = this.height / 2 - _y * transform.scale
    return { x, y }
  }

  handleClick = (x: number, y: number) => {
    const node = this.getNodeAtPosition(x, y)
    if (node) {
      if (node.id === this.rootId) {
        this.selectedNode = null
        this.onSelectedNodeChange?.(null)
        this.subGraph = {
          nodes: [],
          links: [],
        }
        return
      }
      if (node.state) {
        const children = getChildren(node.id, this.data.links)
        if (children.length > 0) {
          if (this.selectedNode?.id !== node.id) {
            node.state.collapsed = false
          } else {
            node.state.collapsed = !node.state.collapsed
          }
          if (!node.state.collapsed) {
            children.forEach(childId => {
              const childNode = this.data.nodes.find(n => n.id === childId)
              if (childNode && isSimNode(childNode)) {
                if (!childNode.x || childNode.x === 0)
                  childNode.x =
                    (node.x || this.width / 2) + Math.random() * 50 - 5
                if (!childNode.y || childNode.y === 0)
                  childNode.y =
                    (node.y || this.height / 2) + Math.random() * 50 - 5
              }
            })
          }
        }
      }
      this.restart()
      this.subGraph = getNodeSubgraph(
        node.id,
        this.data.nodes,
        this.data.links,
        this.rootId
      )
      const nodePos = this.getNodeScreenPosition(node)
      this.transformCanvas.transformTo({ x: nodePos.x, y: nodePos.y })
    }
    if (this.selectedNode?.id !== node?.id) {
      this.selectedNode = node
      this.onSelectedNodeChange?.(node)
    }
  }

  handleMove = (x: number, y: number) => {
    const node = this.getNodeAtPosition(x, y)
    if (this.hoveredNode === node) return
    this.hoveredNode = node
    this.onHoveredNodeChange?.(node)
    this.canvas.style.cursor = node ? "pointer" : "default"
    this.onDraw()
  }

  initialize = (data: RawGraphData, rootId: string) => {
    this.rootId = rootId
    const _links = data.links.map(l => ({ ...l }))
    const _nodes = data.nodes.map(n => ({
      ...n,
      state: {
        collapsed:
          hasOnlyLeafs(n.id, _links) && getChildren(n.id, _links).length > 1,
      } as NodeState,
      clusterSize: getClusterSize(n.id, _links),
    }))

    // if rootId is not in the nodes, add it
    if (!data.nodes.find(n => n.id === rootId)) {
      _nodes.push({
        id: this.rootId,
        state: { collapsed: false, image: undefined },
        clusterSize: 1,
      })
      const targetIds = new Set(_links.map(link => link.target))
      const rootNodes = _nodes.filter(node => !targetIds.has(node.id))
      for (const node of rootNodes) {
        _links.push({
          source: rootId,
          target: node.id,
        })
      }
    }
    this.data = { nodes: _nodes, links: _links }
    this.loadNodeImages()
    this.restart()
  }

  restart = () => {
    this.setSelectedNode(null)
    this.prunedData = getPrunedData(
      this.rootId,
      this.data.nodes,
      this.data.links
    )
    this.clusterSizeRange = this.prunedData.nodes
      .filter(n => n.state?.collapsed)
      .reduce(
        (acc, node) => [
          Math.min(acc[0], node.clusterSize || 1),
          Math.max(acc[1], node.clusterSize || 1),
        ],
        [Infinity, -Infinity] as [number, number]
      )
    this.simulation = forceSimulation<SimNode, SimLink>(this.prunedData.nodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(this.prunedData.links)
          .id(d => d.id)
          .distance(l => {
            if (isSimNode(l.target) && !l.target?.state?.collapsed)
              return this.config.nodeSize
            return this.config.nodeSize * 3
          })
          .strength(l => {
            return 0.6
            /* const num = Math.min(
              this.prunedData.links.filter(x => x.source.id === l.source.id)
                .length,
              this.prunedData.links.filter(x => x.source.id === l.target.id)
                .length
            )
            return 1 / Math.max(num * 0.3, 1)*/
          })
      )
      .force(
        "charge",
        forceManyBody().strength(() => {
          return -130
        })
      )
      .force(
        "center",
        forceCenter(this.width / 2, this.height / 2).strength(0.01)
      )
    this.simulation.on("tick", this.onDraw)
    this.simulation.on("end", this.onEnd)
  }

  get visiblityScale() {
    return scaleLog().domain(this.clusterSizeRange).range([3, 1.5]).clamp(true)
  }

  get color() {
    return color(
      this.theme === "light" ? this.config.theme.dark : this.config.theme.light
    )
  }
  get colorContrast() {
    return color(
      this.theme === "light" ? this.config.theme.light : this.config.theme.dark
    )
  }

  getNodeSize = (nodeId: string): number => {
    const { nodeSize } = this.config
    if (nodeId === this.rootId) return nodeSize * 2
    const node = this.data.nodes.find(n => n.id === nodeId)
    const isCollapsed = !!node?.state?.collapsed
    if (isCollapsed) {
      const scale = scaleLinear()
        .domain(this.clusterSizeRange)
        .range([nodeSize, nodeSize * 3])
      return scale(node.clusterSize || 1)
    }
    const isSelected = this.selectedNode?.id === nodeId
    return isSelected ? nodeSize * 2 : nodeSize
  }

  onDraw = () => {
    const context = this.canvas?.getContext("2d")
    const transform = this.transformCanvas.transform
    if (!context) return
    const dpi = devicePixelRatio || 1
    context.save()
    context.scale(dpi, dpi)
    context.clearRect(0, 0, this.width, this.height)
    context.translate(transform.x, transform.y)
    context.scale(transform.scale, transform.scale)
    context.save()

    const isLight = this.theme === "light"
    this.prunedData.links.forEach(l => {
      const _dim =
        !!this.selectedNode &&
        !this.subGraph.links.find(
          sl =>
            getNodeId(sl.source) === getNodeId(l.source) &&
            getNodeId(sl.target) === getNodeId(l.target)
        )

      const stroke = _dim
        ? this.color(dim(0.09, isLight))()
        : this.color(dim(0.18, isLight))()
      context.globalAlpha = 0.5
      context.strokeStyle = stroke
      context.lineWidth = _dim ? 0.3 : 0.8
      context.beginPath()
      const sx = (isSimNode(l.source) && l.source.x) || 0
      const sy = (isSimNode(l.source) && l.source.y) || 0
      context.moveTo(sx, sy)
      const tx = (isSimNode(l.target) && l.target.x) || 0
      const ty = (isSimNode(l.target) && l.target.y) || 0
      context.lineTo(tx, ty)
      context.stroke()
      context.closePath()
    })

    context.globalAlpha = 1
    this.prunedData.nodes.forEach(node => {
      const x = node.x || 0
      const y = node.y || 0
      const isSelected = this.selectedNode?.id === node.id
      const isHovered = this.hoveredNode?.id === node.id
      const isCollapsed = !!node.state?.collapsed
      const _dim =
        !!this.selectedNode && !this.subGraph?.nodes.some(n => n.id === node.id)
      const fill = _dim
        ? this.color(dim(0.075, isLight))()
        : isCollapsed
          ? this.color(dim(0.18, isLight))()
          : isHovered
            ? this.color(dim(0.4, isLight))()
            : this.color()
      const stroke = this.colorContrast()
      const blue = [94, 112, 235] as RGB
      const red = [238, 125, 121] as RGB
      const highlightedStroke = _dim
        ? color(red)(dim(0.4, isLight))()
        : color(red)()
      const size = this.getNodeSize(node.id)
      const highlighted = this.highlights.includes(node.id)
      if (node.id === this.rootId) {
        circle(context, x, y, size / 2, {
          stroke: false,
          strokeStyle: stroke,
          lineWidth: isSelected ? 1 : 0.2,
          fill: true,
          fillStyle: this.color(dim(0.18, isLight))(),
        })
        if (this.rootImages) {
          const _idx = Math.min(isLight ? 0 : 1, this.rootImages.length - 1)
          const _img = this.rootImages[_idx]
          const _imgSize = size * 0.55
          if (_img) {
            img(
              context,
              _img,
              x - _imgSize / 2,
              y - _imgSize / 2,
              _imgSize,
              _imgSize,
              0,
              _dim ? 0.1 : 1
            )
          }
        }
      } else {
        if (isCollapsed) {
          if (highlighted) {
            const _size = size + 4
            circle(context, x, y, _size / 2, {
              stroke: true,
              strokeStyle: highlightedStroke,
              lineWidth: 1,
              fill: false,
              fillStyle: fill,
            })
          }
          circle(context, x, y, size / 2, {
            stroke: true,
            strokeStyle: stroke,
            lineWidth: isSelected ? 1 : 0.2,
            fill: true,
            fillStyle: fill,
          })
          const showLabel =
            transform.scale >= this.visiblityScale(node.clusterSize || 1)
              ? 1
              : 0

          if (showLabel) {
            context.font = `${14 / transform.scale}px Sans-Serif`
            context.textAlign = "center"
            context.textBaseline = "middle"
            context.fillStyle = this.color(dim(_dim ? 0.2 : 0.5, isLight))()
            context.fillText((node.clusterSize || 1).toString(), x, y)
          }
        } else {
          if (highlighted) {
            const _size = size + 4
            rect(context, x - _size / 2, y - _size / 2, _size, _size, {
              stroke: true,
              strokeStyle: highlightedStroke,
              lineWidth: 1,
              fill: false,
              fillStyle: fill,
              borderRadius: 1,
            })
          }
          rect(context, x - size / 2, y - size / 2, size, size, {
            stroke: true,
            strokeStyle: stroke,
            lineWidth: isSelected ? 0.3 : 0.2,
            fill: true,
            fillStyle: fill,
            borderRadius: 1,
          })
          if (node.state?.image && !this.hideThumbnails) {
            const _size = size - 1
            img(
              context,
              node.state?.image,
              x - _size / 2,
              y - _size / 2,
              _size,
              _size,
              1,
              _dim ? 0.1 : 1
            )
          }
        }
      }
    })

    context.restore()
    context.restore()
    this.transformCanvas.trackCursor()
  }

  private onEnd = () => {}

  private loadNodeImages = () => {
    this.data.nodes.forEach((node: any) => {
      if (node.imgSrc && !this.imageCache.get(node.imgSrc)) {
        loadImage(node.imgSrc).then(img => {
          this.imageCache.set(node.imgSrc!, img)
          node.state = node.state || {}
          node.state.image = img
        })
      }
    })
  }

  destroy = () => {
    this.simulation?.stop()
    this.simulation?.on("tick", null)
    this.simulation?.on("end", null)
    this.transformCanvas.destroy()
  }

  resize = (width: number, height: number) => {
    this.width = width
    this.height = height
    this.onDraw()
  }

  setTheme = (theme: ThemeMode) => {
    this.theme = theme
    this.onDraw()
  }

  setHideThumbnails = (hide: boolean) => {
    this.hideThumbnails = hide
    this.onDraw()
  }

  setSelectedNode = (node: SimNode | null) => {
    this.selectedNode = node
    // sort the selected node to the end of the array
    this.prunedData.nodes.sort((a, b) => {
      if (a.id === this.selectedNode?.id) return 1
      if (b.id === this.selectedNode?.id) return -1
      return 0
    })
  }

  setHighlights = (highlights: string[]) => {
    this.highlights = highlights
  }

  setNoInteraction = (noInteraction: boolean) => {
    this.noInteraction = noInteraction
    this.transformCanvas.setNoInteraction(noInteraction)
  }
}
