import {
  Simulation,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceRadial,
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
  getParents,
  getNodeDepth,
} from "@/util/graph"
import { GraphConfig } from "@/_interfaces"
import { DEFAULT_GRAPH_CONFIG, VOID_ROOT_ID } from "@/provider"
import { isCustomHighlight, isSimNode } from "@/util/types"
import { loadImage } from "@/util/img"
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

const RADIAL_FORCES = true
const RADIUS = 300

interface OpenGraphSimulationProps {
  width: number
  height: number
  config?: GraphConfig
  rootImageSources?: RootNodeImageSources
  canvas: HTMLCanvasElement
  theme?: ThemeMode
  translate?: { x: number; y: number }
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

  private imageCache: Map<string, HTMLImageElement> = new Map()
  private rootImages: HTMLImageElement[] = []
  private hideThumbnails: boolean = false
  private noInteraction: boolean = false

  public selectedNode: SimNode | null = null
  public hoveredNode: SimNode | null = null

  public highlights: HighlightStyle[] = []

  constructor(props: OpenGraphSimulationProps) {
    this.emitter = new OpenGraphEventEmitter()

    this.theme = props.theme || "light"
    this.width = props.width
    this.height = props.height
    this.config = props.config || DEFAULT_GRAPH_CONFIG
    this.rootImageSources = props.rootImageSources || []
    this.canvas = props.canvas

    this.translate = props.translate || { x: 0, y: 0 }

    this.transformCanvas = new TransformCanvas(this.canvas, {
      onUpdate: this.handleTransform,
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
    const transform = this.transformCanvas.transform
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
    const transform = this.transformCanvas.transform
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
    const transform = this.transformCanvas.transform
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
      this.restart(wasOpened ? 0.05 : 0)
      /*
      const nodePos = this.getNodeCanvasPosition(node)
      this.transformCanvas.transformTo({
        x: nodePos.x,
        y: nodePos.y,
      })

      this.transformCanvas.focusOn(() => {
        const nodePos = this.getNodeCanvasPosition(node)
        return {
          x: nodePos.x,
          y: nodePos.y,
          scale: this.transformCanvas.transform.scale,
        }
      })
      */
    }
    if (this.selectedNode?.id !== node?.id) {
      this.selectedNode = node
      this.emitter.emit("selected-node-changed", node)
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
    const _nodes = data.nodes.map(n => {
      const existingData = this.data.nodes.find(x => x.id === n.id)
      const parents = getParents(n.id, _links)
      const parentNode = this.data.nodes.find(p => p.id === parents[0])
      const clusterSize = getClusterSize(n.id, _links)
      const depth = getNodeDepth(n.id, _links)
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
        (depth + 1) * RADIUS,
        this.center.x,
        this.center.y,
        parentAngle
      )
      return {
        ...n,
        state: {
          collapsed:
            hasOnlyLeafs(n.id, _links) && getChildren(n.id, _links).length > 1,
          ...existingData?.state,
        } as NodeState,
        clusterSize,
        depth,
        // we either use:
        // - the existing position
        // - the parent node position
        // - or a random position around the center
        x: existingData?.x || parentNode?.x || circlePos.x,
        y: existingData?.y || parentNode?.y || circlePos.y,
      }
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
      const targetIds = new Set(_links.map(link => link.target))
      const rootNodes = _nodes.filter(node => !targetIds.has(node.id))
      for (const node of rootNodes) {
        _links.push({
          source: this.rootId,
          target: node.id,
        })
      }
    }
    this.maxDepth = Math.max(..._nodes.map(n => n.depth || 0))

    this.data = { nodes: _nodes, links: _links }
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
    this.prunedData = getPrunedData(
      this.rootId,
      this.data.nodes,
      this.data.links,
      this.highlights
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
      .alpha(this.simulation ? alpha : 1)
      // .force(
      //   "link",
      //   forceLink<SimNode, SimLink>(this.prunedData.links)
      //     .id(d => d.id)
      //     .distance(l => {
      //       const size = this.getNodeSize(
      //         isSimNode(l.target) ? l.target.id : l.target.toString()
      //       )
      //       if (isSimNode(l.target) && !l.target?.state?.collapsed) return size
      //       return size * 3
      //     })
      //     .strength(l => {
      //       // console.log("compute link strength")
      //       // console.log(l)

      //       // here we want to check

      //       const nb = this.prunedData.links.filter(
      //         inp => l.source.id !== "-1" && inp.source.id === l.source.id
      //       )
      //       // console.log(nb)

      //       return 0.6
      //       /* const num = Math.min(
      //         this.prunedData.links.filter(x => x.source.id === l.source.id)
      //           .length,
      //         this.prunedData.links.filter(x => x.source.id === l.target.id)
      //           .length
      //       )
      //       return 1 / Math.max(num * 0.3, 1)*/
      //     })
      // )
      .force(
        "link",
        asymmetricLinks(this.prunedData.links)
          .id(d => d.id)
          .distance(l => {
            const size = this.getNodeSize(
              isSimNode(l.target) ? l.target.id : l.target.toString()
            )
            if (isSimNode(l.target) && !l.target?.state?.collapsed) return size
            return size * 3
          })
          .strength(l => {
            return [0.6, 0.05]
          })
      )
      .force(
        "charge",
        forceManyBody<SimNode>().strength(node => {
          return -100
          const size = this.getNodeSize(node.id)
          return -Math.pow(size, 1.5) // non-linear scaling
        })
      )
      .force("center", forceCenter(this.center.x, this.center.y).strength(0.03))

    for (let i = 0; i < this.maxDepth; i++) {
      const depth = i
      const r = RADIUS * (depth + 1)
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

      if (RADIAL_FORCES) {
        this.simulation.force(
          `radial-${depth}`,
          forceRadial<SimNode>(r, x, y).strength(n => {
            if (n.id === this.rootId) return 0
            if (n.depth === 0) return 0
            if (n.depth === depth) return 0.5
            return 0
          })
        )
      }
    }
    this.simulation.on("tick", this.handleTick)
    this.simulation.on("end", this.onEnd)
  }

  handleTick = () => {
    this.isTicking = true
    this.onDraw()
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

  onDraw = () => {
    const context = this.canvas?.getContext("2d")
    const transform = this.transformCanvas.transform
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

    const isLight = this.theme === "light"
    this.prunedData.links.forEach(l => {
      const _dim =
        !!this.selectedNode &&
        !this.subGraph.links.find(
          sl =>
            getNodeId(sl.source) === getNodeId(l.source) &&
            getNodeId(sl.target) === getNodeId(l.target)
        )

      const highlight = this.highlights.find(h => {
        const sourceid = isSimNode(l.source) ? l.source.id : l.source
        const targetid = isSimNode(l.target) ? l.target.id : l.target
        if (isCustomHighlight(h)) {
          return h.id === sourceid || h.id === targetid
        } else {
          return h === sourceid || h === targetid
        }
      })

      let stroke = _dim
        ? this.color(dim(0.09, isLight))()
        : this.color(dim(0.18, isLight))()
      context.globalAlpha = highlight ? 1 : 0.5
      if (highlight?.linkColor) {
        stroke = color(highlight.linkColor)()
      }
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
      const isLiquidated = node.status === "LIQUIDATED"
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
      const nodeSize = this.getNodeSize(node.id)
      const highlight = this.highlights.find(h => {
        return h.id === node.id
      })
      const highlighted = !!highlight
      let highlightedStroke = _dim
        ? color(highlight?.strokeColor || red)(dim(0.4, isLight))()
        : color(highlight?.strokeColor || red)()
      if (node.id === this.rootId) {
        circle(context, x, y, nodeSize / 2, {
          stroke: false,
          strokeStyle: stroke,
          lineWidth: isSelected ? 1 : 0.2,
          fill: true,
          fillStyle: this.color(dim(0.18, isLight))(),
        })
        if (this.rootImages) {
          const _idx = Math.min(isLight ? 0 : 1, this.rootImages.length - 1)
          const _img = this.rootImages[_idx]
          const _imgSize = nodeSize * 0.55
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
            const _size = nodeSize + 4
            circle(context, x, y, _size / 2, {
              stroke: true,
              strokeStyle: highlightedStroke,
              lineWidth: 1,
              fill: false,
              fillStyle: fill,
            })
          }
          circle(context, x, y, nodeSize / 2, {
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
          const size = nodeSize
          const _size = size + 1
          // outline
          rect(context, x - _size / 2, y - _size / 2, _size, _size, {
            stroke: highlighted || isHovered,
            strokeStyle: isHovered ? fill : highlightedStroke,
            lineWidth: 0.5,
            fill: this.hideThumbnails || isLiquidated || !node.state?.image,
            fillStyle: fill,
            borderRadius: 1,
          })
          if (node.state?.image && !this.hideThumbnails && !isLiquidated) {
            const _size = size
            img(
              context,
              node.state?.image,
              x - _size / 2,
              y - _size / 2,
              _size,
              _size,
              1,
              _dim ? 0.1 : 1,
              fill
            )
          }
        }
      }

      context.font = `${14 / transform.scale}px Sans-Serif`
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.fillStyle = this.colorContrast()
      context.fillText((node.depth || 0).toString(), x, y)
    })
    for (let i = 0; i < this.maxDepth; i++) {
      const depth = i
      const r = RADIUS * (depth + 1)
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

    context.restore()
    context.restore()
    this.transformCanvas.trackCursor()
    //  this.emitter.emit("draw", this)
  }

  private onEnd = () => {
    this.isTicking = false
  }

  private loadNodeImages = () => {
    this.data.nodes.forEach((node: any) => {
      if (node.imgSrc && !this.imageCache.get(node.imgSrc)) {
        try {
          loadImage(node.imgSrc).then(img => {
            this.imageCache.set(node.imgSrc!, img)
            node.state = node.state || {}
            node.state.image = img
          })
        } catch (e) {
          console.error("Error loading image for node", node.id, e)
        }
      } else if (node.imgSrc && this.imageCache.get(node.imgSrc)) {
        node.state = node.state || {}
        node.state.image = this.imageCache.get(node.imgSrc)
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
    this.selectedNode = node
    // sort the selected node to the end of the array
    this.prunedData.nodes.sort((a, b) => {
      const getPriority = (node: SimNode) => {
        if (node.id === this.selectedNode?.id) return 2
        if (this.highlights.find(h => h.id === node.id)) return 1
        if (this.subGraph.nodes.find(n => n.id === node.id)) return 1
        return 0
      }

      return getPriority(a) - getPriority(b)
    })
    this.updateScene()
  }

  setHighlights = (highlights: HighlightStyle[]) => {
    this.highlights = highlights
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
