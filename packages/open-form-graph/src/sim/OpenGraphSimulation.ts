import {
  Simulation,
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceRadial,
} from "d3-force"
import {
  GraphData,
  NodeState,
  RawGraphData,
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
  getParents,
  getNodeDepth,
} from "@/util/graph"
import { GraphConfig } from "@/_interfaces"
import { DEFAULT_GRAPH_CONFIG, VOID_DETACH_ID } from "@/provider"
import { isSimNode } from "@/util/types"
import { loadHTMLImageElement } from "@/util/img"
import { TransformCanvas } from "./TransformCanvas"
import { circle, img, rect } from "@/util/canvas"
import { color, dim } from "@/util/color"
import { scaleLinear, scaleLog } from "d3-scale"
import { getPrunedData } from "@/util/data"
import { Transform, HighlightStyle } from "./_types"
import { IOpenGraphSimulation, OpenGraphEventEmitter } from "./_interfaces"
import { distance, getAngle, getRadialPoint } from "@/util/math"
import { red } from "@/util/highlights"
import { asymmetricLinks } from "./asymmetric-link"

const RADIAL_FORCES = false

// TODO: potentially implement strategy to retrieve radius based
// on number of nodes per depth
const INITIAL_RADIUS = 100
const INCREMENTAL = 100
function getRadius(depth: number) {
  if (depth === 0) return INITIAL_RADIUS
  return INCREMENTAL * depth + INITIAL_RADIUS
}

interface OpenGraphSimulationProps {
  width: number
  height: number
  config?: GraphConfig
  rootImageSources?: RootNodeImageSources
  canvas: HTMLCanvasElement
  theme?: ThemeMode
  loadNodeImage?: (node: SimNode) => Promise<string | undefined>
  translate?: { x: number; y: number }
}

// Types for render layers
interface RenderLayer<T> {
  regular: T[]
  highlighted: T[]
}

export class OpenGraphSimulation implements IOpenGraphSimulation {
  width: number
  height: number
  config: GraphConfig
  rootImageSources: RootNodeImageSources
  canvas: HTMLCanvasElement
  transformCanvas: TransformCanvas
  theme: ThemeMode

  public emitter: OpenGraphEventEmitter

  private translate: { x: number; y: number } = { x: 0, y: 0 }

  private data: GraphData = { nodes: [], links: [] }
  private prunedData: GraphData = { nodes: [], links: [] }
  private subGraph: GraphData = { nodes: [], links: [] }
  private rootId: string = ""
  private simulation: Simulation<SimNode, SimLink> | null = null
  private clusterSizeRange: [number, number] = [0, 1]
  private maxDepth: number = 0

  private isTicking: boolean = false
  private tickCount = 0

  private loadNodeImage?: (node: SimNode) => Promise<string | undefined>
  private imageCache: Map<string, HTMLImageElement> = new Map()
  private rootImages: HTMLImageElement[] = []
  private hideThumbnails: boolean = false
  private noInteraction: boolean = false

  public selectedNode: SimNode | null = null
  public hoveredNode: SimNode | null = null

  public highlights: HighlightStyle[] = []

  // Render layers for proper z-ordering
  private renderLayers: {
    links: RenderLayer<SimLink>
    nodes: RenderLayer<SimNode>
  } = {
    links: { regular: [], highlighted: [] },
    nodes: { regular: [], highlighted: [] },
  }

  constructor(props: OpenGraphSimulationProps) {
    this.emitter = new OpenGraphEventEmitter()

    this.theme = props.theme || "light"
    this.width = props.width
    this.height = props.height
    this.config = props.config || DEFAULT_GRAPH_CONFIG
    this.rootImageSources = props.rootImageSources || []
    this.canvas = props.canvas

    this.loadNodeImage = props.loadNodeImage

    this.translate = props.translate || { x: 0, y: 0 }

    this.transformCanvas = new TransformCanvas(this.canvas, {
      onUpdate: this.handleTransform,
      onClick: this.handleClick,
      onMove: this.handleMove,
    })

    this.rootImageSources.forEach((src, idx) => {
      if (src && !this.imageCache.get(src)) {
        loadHTMLImageElement(src).then(img => {
          this.imageCache.set(src, img)
          this.rootImages[idx] = img
        })
      }
    })
  }

  private get center() {
    return {
      x: this.width / 2,
      y: this.height / 2,
    }
  }

  private getNodeAtPosition = (cx: number, cy: number): SimNode | null => {
    const dpi = devicePixelRatio || 1
    const realX = cx * dpi
    const realY = cy * dpi
    const transform = this.transformCanvas.getTransform()
    const { x: tx, y: ty, scale } = transform
    const x = (realX - tx) / scale - this.translate.x
    const y = (realY - ty) / scale - this.translate.y
    for (let node of this.data.nodes) {
      const r = this.getNodeSize(node.id) / 2
      if (node.x == null || node.y == null) continue
      const dx = node.x - x
      const dy = node.y - y
      if (dx * dx + dy * dy < r * r) {
        if (!this.prunedData.nodes.find(n => n.id === node.id)) continue
        return node
      }
    }
    return null
  }

  public getNodeScreenPosition = (node: SimNode): { x: number; y: number } => {
    const transform = this.transformCanvas.getTransform()
    const scale = transform.scale
    const x = this.translate.x + transform.x + (node.x || 0) * scale
    const y = this.translate.y + transform.y + (node.y || 0) * scale
    return {
      x,
      y,
    }
  }

  public getNodeCanvasPosition = (node: SimNode): { x: number; y: number } => {
    const _x = node.x || 0
    const _y = node.y || 0
    const transform = this.transformCanvas.getTransform()
    const x = this.center.x - _x * transform.scale
    const y = this.center.y - _y * transform.scale
    return { x, y }
  }

  handleClick = (x: number, y: number) => {
    const node = this.getNodeAtPosition(x, y)
    this.handleClickNode(node)
  }

  handleClickNode = (
    node: SimNode | null,
    options: { noToggle: boolean } = { noToggle: false }
  ) => {
    let wasOpened = false
    if (node) {
      if (node.id === this.rootId) {
        this.selectedNode = null
        this.emitter.emit("selected-node-changed", null)
        this.subGraph = {
          nodes: [],
          links: [],
        }
        this.updateRenderLayers()
        this.updateScene()
        return
      }
      if (node.state) {
        const children = getChildren(node.id, this.data.links)
        if (children.length > 0 && !options?.noToggle) {
          if (this.selectedNode?.id !== node.id) {
            if (node.state.collapsed) {
              wasOpened = true
            }
            node.state.collapsed = false
          } else {
            node.state.collapsed = !node.state.collapsed
          }
          if (!node.state.collapsed) {
            children.forEach(childId => {
              const childNode = this.data.nodes.find(n => n.id === childId)
              if (childNode && isSimNode(childNode)) {
                const dist = distance(
                  { x: node.x || this.center.x, y: node.y || this.center.y },
                  {
                    x: childNode.x || this.center.x,
                    y: childNode.y || this.center.y,
                  }
                )
                if (dist > 10) {
                  childNode.x = (node.x || this.center.x) + Math.random() * 50
                  childNode.y = (node.y || this.center.y) + Math.random() * 50
                }
              }
            })
          }
        }
      }
      // if the node is not collapsed, we need to expand its parents
      if (!node.state?.collapsed) {
        const parents = getParents(node.id, this.data.links)
        parents.forEach(parentId => {
          const parentNode = this.data.nodes.find(n => n.id === parentId)
          if (parentNode && isSimNode(parentNode) && parentNode.state) {
            parentNode.state.collapsed = false
          }
        })
      }
      this.subGraph = getNodeSubgraph(
        node.id,
        this.data.nodes,
        this.data.links,
        this.rootId
      )
    }
    if (this.selectedNode?.id !== node?.id) {
      this.selectedNode = node
      this.emitter.emit("selected-node-changed", node)
      this.updateRenderLayers()
    }
    if (node) {
      this.restart(wasOpened ? 0.05 : 0)
    } else if (!node && this.selectedNode) {
      // Handle deselection
      this.selectedNode = null
      this.emitter.emit("selected-node-changed", null)
      this.subGraph = {
        nodes: [],
        links: [],
      }
      this.updateRenderLayers()
      this.updateScene()
    }
  }

  updateScene = () => {
    if (this.isTicking) return
    this.onDraw()
  }

  handleMove = (x: number, y: number) => {
    const node = this.getNodeAtPosition(x, y)
    if (this.hoveredNode === node) return
    this.hoveredNode = node
    this.emitter.emit("hovered-node-changed", node)
    this.canvas.style.cursor = node ? "pointer" : "default"
    this.updateScene()
  }

  handleTransform = (t: Transform) => {
    this.emitter.emit("transform-changed", t)
    this.updateScene()
  }

  initialize = (data: RawGraphData, rootId: string) => {
    this.rootId = rootId
    const _links = data.links.map(l => ({ ...l }))
    const _nodes = data.nodes
      .map(n => {
        const existingData = this.data.nodes.find(x => x.id === n.id)
        const parents = getParents(n.id, _links)
        const parentNode = this.data.nodes.find(p => p.id === parents[0])
        const clusterSize = getClusterSize(n.id, _links)
        const depth = getNodeDepth(n.id, _links)
        const circlePos = getRadialPoint(
          getRadius(depth),
          this.center.x,
          this.center.y
        )

        const x =
          depth > 0 ? null : existingData?.x || parentNode?.x || circlePos.x
        const y =
          depth > 0 ? null : existingData?.y || parentNode?.y || circlePos.y
        return {
          ...n,
          state: {
            collapsed:
              hasOnlyLeafs(n.id, _links) &&
              getChildren(n.id, _links).length > 1,
            ...existingData?.state,
          } as NodeState,
          clusterSize,
          depth,
          // we either use:
          // - the existing position
          // - the parent node position
          // - or a random position around the center
          x,
          y,
        }
      })
      .sort((a, b) => a.depth - b.depth)
    _nodes.forEach((n, i, arr) => {
      const existingData = _nodes.find(x => x.id === n.id)
      const parents = getParents(n.id, _links)
      const parentNode = _nodes.find(p => p.id === parents[0])
      const depth = n.depth
      const parentAngle =
        depth > 0
          ? getAngle(
              this.center.x,
              this.center.y,
              parentNode?.x!,
              parentNode?.y!
            )
          : undefined

      const circlePos = getRadialPoint(
        getRadius(depth),
        this.center.x,
        this.center.y,
        parentAngle
      )
      const x =
        depth > 0
          ? existingData?.x || circlePos.x
          : existingData?.x || circlePos.x
      const y =
        depth > 0
          ? existingData?.y || circlePos.y
          : existingData?.y || circlePos.y

      _nodes[i].x = x
      _nodes[i].y = y
    })

    // if rootId is not in the nodes, add it
    if (!data.nodes.find(n => n.id === this.rootId)) {
      _nodes.push({
        id: this.rootId,
        state: { collapsed: false, image: undefined },
        depth: -1,
        clusterSize: 1,
        x: this.center.x,
        y: this.center.y,
      })
    }

    // We create a VOID_DETACH_ID node to allow connecting new mints to it
    // this will detach the new mints on the root from the rest of the root
    // nodes in case there is a larger cluster
    _nodes.push({
      id: VOID_DETACH_ID,
      state: { collapsed: false, image: undefined },
      depth: -1,
      clusterSize: 1,
      x: this.center.x,
      y: this.center.y,
    })

    _links.push({
      source: this.rootId,
      target: VOID_DETACH_ID,
    })

    const targetIds = new Set(_links.map(link => link.target))
    // all nodes without a target in the links are root nodes
    const rootNodes = _nodes.filter(node => !targetIds.has(node.id))
    for (const node of rootNodes) {
      const highlight = this.highlights.find(h => h.id === node.id)
      // highlights can be specified to detach the nodes from the root
      // usefull for detaching new mints from the root node
      if (highlight?.isDetached) {
        _links.push({
          source: VOID_DETACH_ID,
          target: node.id,
        })
      }
      // otherwise, we connect them to the root node
      else {
        _links.push({
          source: this.rootId,
          target: node.id,
        })
      }
    }

    this.maxDepth = Math.max(..._nodes.map(n => n.depth || 0))

    this.data = { nodes: _nodes as SimNode[], links: _links }
    this.loadNodeImages()
    this.restart()
    const selectedNode = this.selectedNode
    if (selectedNode && this.getNodeById(selectedNode.id)) {
      this.handleClickNode(this.getNodeById(selectedNode.id), {
        noToggle: true,
      })
    } else {
      this.setSelectedNode(null)
    }
  }

  restart = (alpha: number = 0.1) => {
    this.tickCount = 0
    this.prunedData = getPrunedData(
      this.rootId,
      this.data.nodes,
      this.data.links,
      this.highlights
    )
    this.updateRenderLayers()
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
      .alpha(this.simulation ? alpha : 0.5)
      .force(
        "link",
        asymmetricLinks<SimNode, SimLink>(this.prunedData.links)
          .id(d => d.id)
          .distance(l => {
            const size = this.getNodeSize(
              isSimNode(l.target) ? l.target.id : l.target.toString()
            )
            if (isSimNode(l.target) && !l.target?.state?.collapsed) return size
            return size * 3
          })
          .strength(l => {
            return [0.66, 0.08]
          })
      )
      .force(
        "charge",
        forceManyBody<SimNode>().strength(node => {
          return -100
        })
      )
      .force("center", forceCenter(this.center.x, this.center.y).strength(0.1))

    if (RADIAL_FORCES) {
      for (let i = 0; i < this.maxDepth; i++) {
        const depth = i
        const r = getRadius(depth)
        const x = this.center.x
        const y = this.center.y
        console.log(
          "Adding radial force for depth",
          depth,
          "with radius",
          r,
          x,
          y
        )

        this.simulation.force(
          `radial-${depth}`,
          forceRadial<SimNode>(r, x, y).strength(n => {
            if (n.id === this.rootId) return 0
            if (n.depth === 0) return 0
            if (n.depth === depth) return 0.01
            return 0
          })
        )
      }
    }
    this.simulation.on("tick", this.handleTick)
    this.simulation.on("end", this.onEnd)
  }

  get rootNode() {
    return this.data.nodes.find(n => n.id === this.rootId) || null
  }

  get detachNode() {
    return this.data.nodes.find(n => n.id === VOID_DETACH_ID) || null
  }

  handleTick = () => {
    this.isTicking = true
    this.onDraw()
    this.tickCount++
  }

  setTranslate({ x, y }: { x: number; y: number }) {
    this.translate = { x, y }
  }

  get visiblityScale() {
    return scaleLog()
      .domain(this.clusterSizeRange)
      .range([1.5, 0.9])
      .clamp(true)
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
    const highlight = this.highlights.find(h => h.id === nodeId)
    const sizeScale = highlight?.scale || 1
    if (nodeId === this.rootId) return nodeSize * 2 * sizeScale
    const node = this.data.nodes.find(n => n.id === nodeId)
    const isCollapsed = !!node?.state?.collapsed
    if (isCollapsed) {
      const scale = scaleLinear()
        .domain(this.clusterSizeRange)
        .range([nodeSize, nodeSize * 3])
      return scale(node.clusterSize || 1)
    }
    const isSelected = this.selectedNode?.id === nodeId
    const isLiquidated = node?.status === "LIQUIDATED"
    const _size = isLiquidated ? nodeSize * 0.2 : nodeSize
    return isSelected ? _size * 2 * sizeScale : _size * sizeScale
  }

  private updateRenderLayers() {
    const isHighlighted = (id: string) => {
      // Helper to determine if element should be highlighted
      const highlight = this.highlights.find(h => h.id === id)
      return (
        highlight?.onTop ||
        this.selectedNode?.id === id ||
        this.subGraph.nodes.find(n => n.id === id)
      )
    }

    this.renderLayers.nodes.regular = []
    this.renderLayers.nodes.highlighted = []

    this.prunedData.nodes.forEach(node => {
      if (isHighlighted(node.id)) {
        this.renderLayers.nodes.highlighted.push(node)
      } else {
        this.renderLayers.nodes.regular.push(node)
      }
    })

    this.renderLayers.links.regular = []
    this.renderLayers.links.highlighted = []

    this.prunedData.links.forEach(link => {
      const sourceId = isSimNode(link.source) ? link.source.id : link.source
      const targetId = isSimNode(link.target) ? link.target.id : link.target

      const inSubgraph =
        this.selectedNode &&
        this.subGraph.links.find(
          l =>
            getNodeId(l.source) === sourceId && getNodeId(l.target) === targetId
        )

      if (inSubgraph) {
        this.renderLayers.links.highlighted.push(link)
      } else {
        this.renderLayers.links.regular.push(link)
      }
    })
    this.renderLayers.nodes.highlighted.sort((a, b) => {
      // Sort highlighted nodes by priority
      if (a.id === this.selectedNode?.id) return 1
      if (b.id === this.selectedNode?.id) return -1
      return 0
    })
  }

  private renderLink(
    ctx: CanvasRenderingContext2D,
    link: SimLink,
    options: {
      dim: boolean
      hasSelection: boolean
      highlight?: HighlightStyle
    }
  ) {
    const sourceId = isSimNode(link.source) ? link.source.id : link.source
    const targetId = isSimNode(link.target) ? link.target.id : link.target

    let sourceNode = this.data.nodes.find(n => n.id === sourceId)

    // Skip void detach links
    if (targetId === VOID_DETACH_ID) return
    if (sourceId === VOID_DETACH_ID) {
      sourceNode = this.rootNode!
    }

    const isLight = this.theme === "light"
    const { dim: _dim, hasSelection, highlight } = options

    let stroke = _dim
      ? this.color(dim(0.09, isLight))()
      : hasSelection
        ? this.color(dim(0.4, isLight))()
        : this.color(dim(0.18, isLight))()

    ctx.globalAlpha = highlight ? 1 : 0.5

    const sx = (sourceNode && sourceNode.x) || 0
    const sy = (sourceNode && sourceNode.y) || 0
    const tx = (isSimNode(link.target) && link.target.x) || 0
    const ty = (isSimNode(link.target) && link.target.y) || 0

    // Create gradient if highlighted
    if (highlight?.linkColor) {
      const gradient = ctx.createLinearGradient(sx, sy, tx, ty)
      gradient.addColorStop(0, stroke) // Normal color at source
      gradient.addColorStop(1, color(highlight.linkColor)()) // Highlight color at target
      ctx.strokeStyle = gradient
    } else {
      ctx.strokeStyle = stroke
    }

    ctx.lineWidth = _dim ? 0.3 : 0.8
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.lineTo(tx, ty)
    ctx.stroke()
    ctx.closePath()
  }

  // Render a single node
  private renderNode(
    ctx: CanvasRenderingContext2D,
    node: SimNode,
    options: {
      dim: boolean
      transform: Transform
    }
  ) {
    if (node.id === VOID_DETACH_ID) return

    const x = node.x || 0
    const y = node.y || 0
    const isSelected = this.selectedNode?.id === node.id
    const isHovered = this.hoveredNode?.id === node.id
    const isCollapsed = !!node.state?.collapsed
    const isLiquidated = node.status === "LIQUIDATED"
    const isLight = this.theme === "light"
    const { dim: _dim, transform } = options

    const fill = _dim
      ? this.color(dim(0.075, isLight))()
      : isCollapsed
        ? this.color(dim(0.18, isLight))()
        : isHovered
          ? this.color(dim(0.4, isLight))()
          : this.color()

    const stroke = this.colorContrast()
    const nodeSize = this.getNodeSize(node.id)
    const highlight = this.highlights.find(h => h.id === node.id)
    const highlighted = !!highlight

    let highlightedStroke = _dim
      ? color(highlight?.strokeColor || red)(dim(0.4, isLight))()
      : color(highlight?.strokeColor || red)()

    if (node.id === this.rootId) {
      this.renderRootNode(ctx, x, y, nodeSize, _dim, isLight)
    } else if (isCollapsed) {
      this.renderCollapsedNode(ctx, x, y, nodeSize, {
        fill,
        stroke,
        highlighted,
        highlightedStroke,
        isSelected,
        dim: _dim,
        transform,
        clusterSize: node.clusterSize || 1,
        isLight,
      })
    } else {
      this.renderExpandedNode(ctx, x, y, nodeSize, {
        fill,
        stroke,
        highlighted,
        highlightedStroke,
        isHovered,
        isLiquidated,
        dim: _dim,
        image: node.state?.image,
      })
    }
  }

  // Render root node
  private renderRootNode(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    dimmed: boolean,
    isLight: boolean
  ) {
    circle(ctx, x, y, size / 2, {
      stroke: false,
      strokeStyle: this.colorContrast(),
      lineWidth: 0.2,
      fill: true,
      fillStyle: this.color(dim(0.18, isLight))(),
    })

    if (this.rootImages) {
      const _idx = Math.min(isLight ? 0 : 1, this.rootImages.length - 1)
      const _img = this.rootImages[_idx]
      const _imgSize = size * 0.55
      if (_img) {
        img(
          ctx,
          _img,
          x - _imgSize / 2,
          y - _imgSize / 2,
          _imgSize,
          _imgSize,
          0,
          dimmed ? 0.1 : 1
        )
      }
    }
  }

  // Render collapsed node
  private renderCollapsedNode(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    options: {
      fill: string
      stroke: string
      highlighted: boolean
      highlightedStroke: string
      isSelected: boolean
      dim: boolean
      transform: Transform
      clusterSize: number
      isLight: boolean
    }
  ) {
    const {
      fill,
      stroke,
      highlighted,
      highlightedStroke,
      isSelected,
      dim: _dim,
      transform,
      clusterSize,
      isLight,
    } = options

    if (highlighted) {
      const _size = size + 4
      circle(ctx, x, y, _size / 2, {
        stroke: true,
        strokeStyle: highlightedStroke,
        lineWidth: 1,
        fill: false,
        fillStyle: fill,
      })
    }

    circle(ctx, x, y, size / 2, {
      stroke: true,
      strokeStyle: stroke,
      lineWidth: isSelected ? 1 : 0.2,
      fill: true,
      fillStyle: fill,
    })

    const showLabel =
      transform.scale >= this.visiblityScale(clusterSize) ? 1 : 0

    if (showLabel) {
      ctx.font = `${14 / transform.scale}px Sans-Serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = this.color(dim(_dim ? 0.2 : 0.5, isLight))()
      ctx.fillText(clusterSize.toString(), x, y)
    }
  }

  // Render expanded node
  private renderExpandedNode(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    options: {
      fill: string
      stroke: string
      highlighted: boolean
      highlightedStroke: string
      isHovered: boolean
      isLiquidated: boolean
      dim: boolean
      image?: HTMLImageElement
    }
  ) {
    const {
      fill,
      highlighted,
      highlightedStroke,
      isHovered,
      isLiquidated,
      dim: _dim,
      image,
    } = options

    const _size = size + 1

    // Outline
    rect(ctx, x - _size / 2, y - _size / 2, _size, _size, {
      stroke: highlighted || isHovered,
      strokeStyle: isHovered ? fill : highlightedStroke,
      lineWidth: 0.5,
      fill: this.hideThumbnails || isLiquidated || !image,
      fillStyle: fill,
      borderRadius: 1,
    })

    // Image
    if (image && !this.hideThumbnails && !isLiquidated) {
      img(
        ctx,
        image,
        x - size / 2,
        y - size / 2,
        size,
        size,
        1,
        _dim ? 0.1 : 1,
        fill
      )
    }
  }

  // Main draw function - now much cleaner
  onDraw = () => {
    const context = this.canvas?.getContext("2d")
    const transform = this.transformCanvas.getTransform()
    if (!context) return

    const dpi = devicePixelRatio || 1
    context.save()
    context.scale(dpi, dpi)
    context.clearRect(0, 0, this.width, this.height)
    context.setTransform(
      transform.scale,
      0,
      0,
      transform.scale,
      transform.x,
      transform.y
    )
    context.translate(this.translate.x, this.translate.y)
    context.save()

    const hasSelection = !!this.selectedNode

    // Layer 1: Regular links (bottom layer)
    this.renderLayers.links.regular.forEach(link => {
      const sourceId = isSimNode(link.source) ? link.source.id : link.source
      const targetId = isSimNode(link.target) ? link.target.id : link.target

      const _dim =
        hasSelection &&
        !this.subGraph.links.find(
          sl =>
            getNodeId(sl.source) === sourceId &&
            getNodeId(sl.target) === targetId
        )

      this.renderLink(context, link, { dim: _dim, hasSelection })
    })

    // Layer 2: Regular nodes
    context.globalAlpha = 1
    this.renderLayers.nodes.regular.forEach(node => {
      const _dim =
        hasSelection && !this.subGraph.nodes.some(n => n.id === node.id)
      this.renderNode(context, node, { dim: _dim, transform })
    })

    // Layer 3: Highlighted links (above regular nodes)
    this.renderLayers.links.highlighted.forEach(link => {
      const sourceId = isSimNode(link.source) ? link.source.id : link.source
      const targetId = isSimNode(link.target) ? link.target.id : link.target

      const _dim =
        hasSelection &&
        !this.subGraph.links.find(
          sl =>
            getNodeId(sl.source) === sourceId &&
            getNodeId(sl.target) === targetId
        )

      const highlight = this.highlights.find(
        h => h.id === sourceId || h.id === targetId
      )

      this.renderLink(context, link, { dim: _dim, hasSelection, highlight })
    })

    // Layer 4: Highlighted nodes (top layer)
    context.globalAlpha = 1
    this.renderLayers.nodes.highlighted.forEach(node => {
      const _dim =
        hasSelection && !this.subGraph.nodes.some(n => n.id === node.id)
      this.renderNode(context, node, { dim: _dim, transform })
    })

    // Debug circles if needed
    // this.drawDebugDepthCircles(context)

    context.restore()
    context.restore()
    this.transformCanvas.trackCursor()
  }

  private drawDebugDepthCircles(context: CanvasRenderingContext2D) {
    const transform = this.transformCanvas.getTransform()
    for (let i = 0; i < this.maxDepth; i++) {
      const depth = i
      const r = getRadius(depth)
      const x = this.center.x
      const y = this.center.y
      circle(context, x, y, r, {
        fill: false,
        stroke: true,
        strokeStyle: "#00ff00",
      })
      context.font = `${40 / transform.scale}px Sans-Serif`
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.fillStyle = this.color()
      context.fillText(depth.toString(), x + r, y)
    }
  }

  private onEnd = () => {
    this.isTicking = false
  }

  private loadNodeImages = () => {
    this.data.nodes.forEach((node: any) => {
      // root node images are loaded separately
      if (node.id === this.rootId) return
      if (node.imgSrc && this.imageCache.get(node.imgSrc)) {
        node.state = node.state || {}
        node.state.image = this.imageCache.get(node.imgSrc)
        return
      }
      const loadImage = async () => {
        const src = this.loadNodeImage
          ? await this.loadNodeImage(node)
          : node.imgSrc
        if (!src) return
        const html =
          this.imageCache.get(src) || (await loadHTMLImageElement(src))
        this.imageCache.set(src, html)
        node.state = node.state || {}
        node.state.image = html
      }
      loadImage()
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
    this.updateScene()
  }

  setTheme = (theme: ThemeMode) => {
    this.theme = theme
    this.updateScene()
  }

  setHideThumbnails = (hide: boolean) => {
    this.hideThumbnails = hide
    this.updateScene()
  }

  setSelectedNode = (node: SimNode | null) => {
    console.log("Setting selected node", node?.id || "null")
    this.selectedNode = node
    this.updateRenderLayers()
    this.updateScene()
  }

  setHighlights = (highlights: HighlightStyle[]) => {
    this.highlights = highlights
    this.updateRenderLayers()
    this.updateScene()
  }

  setNoInteraction = (noInteraction: boolean) => {
    this.noInteraction = noInteraction
    this.transformCanvas.setNoInteraction(this.noInteraction)
    this.updateScene()
  }

  getNodeById = (nodeId: string): SimNode | null => {
    return this.data.nodes.find(n => n.id === nodeId) || null
  }
}
