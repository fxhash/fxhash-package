import {
  Simulation,
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceRadial,
  forceCollide,
} from "d3-force"
import {
  Dictionary,
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
  getAllParentsUntil,
} from "@/util/graph"
import { GraphConfig } from "@/_interfaces"
import { DEFAULT_GRAPH_CONFIG, VOID_DETACH_ID, VOID_EMIT_ID } from "@/provider"
import { isSimNode } from "@/util/types"
import { loadHTMLImageElement } from "@/util/img"
import { TransformCanvas } from "./TransformCanvas"
import { circle, img, rect } from "@/util/canvas"
import { color, dim } from "@/util/color"
import { scaleLinear, scaleLog } from "d3-scale"
import { getPrunedData, NodeVisibility } from "@/util/data"
import { Transform, HighlightStyle, Point } from "./_types"
import { IOpenGraphSimulation, OpenGraphEventEmitter } from "./_interfaces"
import { getAngle, getRadialPoint } from "@/util/math"
import { red } from "@/util/highlights"
import { asymmetricLinks } from "./asymmetric-link"
import { quickHash } from "@/util/hash"
import groupBy from "lodash.groupby"

const RADIAL_FORCES = false
const RENDER_EMITTER_NODES = false

// TODO: potentially implement strategy to retrieve radius based
// on number of nodes per depth
const INITIAL_RADIUS = 300
const INCREMENTAL = 200
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
  lockedNodeId?: string
  highlights?: HighlightStyle[]
  nodeVisibility?: NodeVisibility
}

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

  private rawData?: RawGraphData

  public emitter: OpenGraphEventEmitter

  private translate: { x: number; y: number } = { x: 0, y: 0 }

  private data: GraphData = { nodes: [], links: [] }
  private prunedData: GraphData = { nodes: [], links: [] }
  private subGraph: GraphData = { nodes: [], links: [] }
  private rootId: string = ""
  private simulation: Simulation<SimNode, SimLink> | null = null
  private clusterSizeRange: [number, number] = [0, 1]
  private emitterClusterSizeRange: [number, number] = [0, 1]
  private maxDepth: number = 0

  private isTicking: boolean = false
  private isDrawing: boolean = false
  private tickCount = 0

  private loadNodeImage?: (node: SimNode) => Promise<string | undefined>
  private imageCache: Map<string, HTMLImageElement> = new Map()
  private rootImages: HTMLImageElement[] = []
  private hideThumbnails: boolean = false
  private noInteraction: boolean = false

  public lockedNodeId?: string
  public selectedNode: SimNode | null = null
  public hoveredNode: SimNode | null = null

  public highlights: HighlightStyle[] = []

  nodeVisibility: NodeVisibility = "all"
  private secondaryNodes: Dictionary = new Map()
  private emittedNodes: Array<string> = []

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

    this.lockedNodeId = props.lockedNodeId

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

    this.nodeVisibility = props.nodeVisibility || "all"
    this.highlights = props.highlights || []
  }

  private get center() {
    return {
      x: 0,
      y: 0,
    }
  }

  private get origin() {
    const dpi = devicePixelRatio || 1
    return {
      x: (this.translate.x + this.width / 2) * dpi,
      y: (this.translate.y + this.height / 2) * dpi,
    }
  }

  private getNodeAtPosition = (cx: number, cy: number): SimNode | null => {
    const transform = this.transformCanvas.getTransform()
    const { x: tx, y: ty, scale } = transform
    const dpi = devicePixelRatio || 1

    const canvasX = cx * dpi
    const canvasY = cy * dpi

    const scaledX = (canvasX - tx) / scale
    const scaledY = (canvasY - ty) / scale

    const graphX = scaledX - this.origin.x
    const graphY = scaledY - this.origin.y

    const candidates: SimNode[] = []

    for (let node of this.data.nodes) {
      const r = this.getNodeSize(node.id) / 2
      if (node.x == null || node.y == null) continue
      const dx = node.x - graphX
      const dy = node.y - graphY
      if (dx * dx + dy * dy < r * r) {
        // only consider nodes that are in the pruned data (visible)
        if (!this.prunedData.nodes.find(n => n.id === node.id)) continue
        candidates.push(node)
      }
    }

    if (candidates.length === 0) return null
    if (candidates.length === 1) return candidates[0]

    for (let i = this.renderLayers.nodes.highlighted.length - 1; i >= 0; i--) {
      const node = this.renderLayers.nodes.highlighted[i]
      if (candidates.find(c => c.id === node.id)) {
        return node
      }
    }

    for (let node of this.renderLayers.nodes.regular) {
      if (candidates.find(c => c.id === node.id)) {
        return node
      }
    }

    return candidates[0]
  }

  public getNodeScreenPosition = (node: SimNode): { x: number; y: number } => {
    const transform = this.transformCanvas.getTransform()
    const x = transform.x + (node.x || 0 + this.origin.x) * transform.scale
    const y = transform.y + (node.y || 0 + this.origin.y) * transform.scale
    return { x, y }
  }

  public getNodeCanvasPosition = (node: SimNode): { x: number; y: number } => {
    const _x = node.x || 0
    const _y = node.y || 0
    const transform = this.transformCanvas.getTransform()
    const x = this.origin.x - _x * transform.scale
    const y = this.origin.y - _y * transform.scale
    return { x, y }
  }

  public screenToWorld(_x: number, _y: number) {
    const transform = this.transformCanvas.getTransform()
    const { x: tx, y: ty, scale } = transform
    const dpi = devicePixelRatio || 1

    const canvasX = _x * dpi
    const canvasY = _y * dpi

    const scaledX = (canvasX - tx) / scale
    const scaledY = (canvasY - ty) / scale

    const x = scaledX - this.origin.x
    const y = scaledY - this.origin.y
    return { x, y }
  }

  public worldToScreen(worldX: number, worldY: number) {
    const transform = this.transformCanvas.getTransform()
    const { x: tx, y: ty, scale } = transform
    const dpi = devicePixelRatio || 1

    const scaledX = (worldX + this.origin.x) * scale
    const scaledY = (worldY + this.origin.y) * scale

    const canvasX = scaledX + tx
    const canvasY = scaledY + ty

    const screenX = canvasX / dpi
    const screenY = canvasY / dpi

    return { x: screenX, y: screenY }
  }

  handleClick = (x: number, y: number) => {
    let node = this.getNodeAtPosition(x, y)
    if (node?.state?.sessionNode) return
    // when we have lockedNodeId, we will always select that node
    // instead of deselection
    if (this.lockedNodeId && !node) {
      node = this.getNodeById(this.lockedNodeId)
    }
    if (node === this.selectedNode) return
    if (node?.state?.emitterNode && RENDER_EMITTER_NODES) {
      this.emitNodeAt(node.depth || 0)
      this.transformCanvas.focusOn(() => {
        const t = this.transformCanvas.getTransform()
        const _node = this.getNodeById(node.id)
        return { x: _node?.x!, y: _node?.y!, scale: t.scale }
      })
    } else {
      this.handleClickNode(node)
    }
  }

  emitNodeAt = (depth: number) => {
    const nodes =
      this.secondaryNodes[depth].filter(
        (n: SimNode) => !this.emittedNodes.includes(n.id)
      ) || []
    const randomIndex = Math.floor(Math.random() * nodes.length)
    if (randomIndex < 0 || randomIndex >= nodes.length) return
    const depthNode = this.emitterNodes[depth]
    const node = nodes[randomIndex]
    node.x = depthNode.x
    node.y = depthNode.y

    const parents = getAllParentsUntil(node.id, this.data.links, this.rootId)

    // add to emitted nodes
    this.emittedNodes.push(node.id)
    node.state.collapsed = false
    if (parents.length > 0) {
      parents.forEach(parentId => {
        const parentNode = this.data.nodes.find(n => n.id === parentId)
        if (parentNode) {
          if (parentNode.state) {
            parentNode.state.collapsed = false
          }
        }
      })
      this.emittedNodes.push(...parents)
    }
    console.log("Emitting node at depth", depth, ":", node.id)
    this.updateHighlights()
  }

  handleClickNode = (
    node: SimNode | null,
    options: {
      noToggle?: boolean
      triggerFocus?: boolean
      triggerRestart?: boolean
    } = {
      noToggle: false,
      triggerFocus: false,
      triggerRestart: false,
    }
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
        if (children.length > 0) {
          if (this.selectedNode?.id !== node.id) {
            if (node.state.collapsed) {
              wasOpened = true
            }
            node.state.collapsed = false
          } else if (!options.noToggle) {
            node.state.collapsed = !node.state.collapsed
          }
          /*
          if (!node.state.collapsed) {
            // distance from parent to cluster center
            const clusterDistance = 100
            const clusterRadius = 50

            const parentX = node.x || this.center.x
            const parentY = node.y || this.center.y

            const dirX = parentX - this.center.x
            const dirY = parentY - this.center.y
            const length = Math.sqrt(dirX * dirX + dirY * dirY) || 1

            const normX = dirX / length
            const normY = dirY / length

            const clusterX = parentX + normX * clusterDistance
            const clusterY = parentY + normY * clusterDistance

            // we place the children in a circle around the cluster center
            // which is n units away from the parent
            children.forEach(childId => {
              const childNode = this.data.nodes.find(n => n.id === childId)
              if (childNode && isSimNode(childNode)) {
                const angle = Math.random() * 2 * Math.PI
                const radius = Math.random() * clusterRadius
                childNode.x = clusterX + Math.cos(angle) * radius
                childNode.y = clusterY + Math.sin(angle) * radius
              }
            })
          }
          */
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
      if (this.selectedNode?.id !== node?.id) {
        this.selectedNode = node
        this.emitter.emit("selected-node-changed", node)
        this.updateRenderLayers()
      }
      this.restart(wasOpened || options.triggerRestart ? 0.05 : 0)
      if (wasOpened || options?.triggerFocus) {
        this.transformCanvas.focusOn(() => {
          const t = this.transformCanvas.getTransform()
          const _node = this.getNodeById(node.id)
          return { x: _node?.x!, y: _node?.y!, scale: t.scale }
        })
      }
    } else if (!node && this.selectedNode) {
      // handle deselection
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

  updateEmitterNodes() {
    this.emitterNodes.forEach((node, depth) => {
      const notEmittedNodes = (this.secondaryNodes[depth] || []).filter(
        (n: SimNode) => this.emittedNodes.indexOf(n.id) === -1
      )
      node.clusterSize = notEmittedNodes.length
    })
    this.emitterClusterSizeRange = this.emitterNodes.reduce(
      (acc, node) => [
        Math.min(acc[0], node.clusterSize || 1),
        Math.max(acc[1], node.clusterSize || 1),
      ],
      [Infinity, -Infinity] as [number, number]
    )
  }

  get emitterNodes() {
    return (
      this.data.nodes
        .filter(n => n.state?.emitterNode)
        .sort((a, b) => (a.depth || 0) - (b.depth || 0)) || []
    )
  }

  updateScene = () => {
    if (this.isTicking) return
    this.onDraw()
  }

  handleMove = (x: number, y: number) => {
    if (this.transformCanvas.getIsDragging()) return
    const world = this.screenToWorld(x, y)
    // TODO: Implement custom find node?
    const node = this.simulation?.find(world.x, world.y, 10) || null
    if (node?.state?.sessionNode) return
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

  updateHighlights = () => {
    //this.transformCanvas.resetFocus()
    // for detached highlights we need to create the session nodes and
    // links accordingly
    const detachedHighlights = this.highlights.filter(h => h.isDetached)
    const validSessionIds = new Set<string>()
    let focusSessionNode: null | SimNode = null
    detachedHighlights.forEach(h => {
      const highlightedNode = this.data.nodes.find(n => n.id === h.id)
      if (!highlightedNode) return
      const existingLink = this.data.links.find(l => {
        return isSimNode(l.target) ? l.target.id === h.id : l.target === h.id
      })
      if (!existingLink) return
      const id = isSimNode(existingLink.source)
        ? existingLink.source.id
        : existingLink.source.toString()
      const parentNode = this.getNodeById(id)
      if (!parentNode) return
      // session id is either provided or is the parent node
      const _sessionId = h.sessionId || parentNode.id
      const sessionId = parentNode.state?.sessionNode
        ? parentNode.id
        : `${VOID_DETACH_ID}-${_sessionId}`
      validSessionIds.add(sessionId)
      let sessionNode = this.data.nodes.find(n => n.id === sessionId)
      if (!sessionNode) {
        const depth = (highlightedNode?.depth || 1) + 1
        const angle = getAngle(
          this.rootNode?.x!,
          this.rootNode?.y!,
          parentNode?.x!,
          parentNode?.y!
        )
        const circlePos = getRadialPoint(
          getRadius(depth),
          this.rootNode?.x!,
          this.rootNode?.y!,
          angle
        )
        sessionNode = {
          id: sessionId,
          state: { collapsed: false, image: undefined, sessionNode: true },
          depth,
          clusterSize: 1,
          x: circlePos.x,
          y: circlePos.y,
        }
        this.data.nodes.push(sessionNode)
        // connect the session node to the parent node
        this.data.links.push({ target: sessionNode, source: parentNode })
      }
      // remove the existing link from the parent to the highlighted node
      const existingLinkIndex = this.data.links.findIndex(
        l => l === existingLink
      )
      this.data.links.splice(existingLinkIndex, 1)
      // add the link between the session node and the highlighted node
      this.data.links.push({
        target: highlightedNode,
        source: sessionNode,
      })
      // TODO: maybe should be centralized,
      // initialize function also sets the collapsed state
      //
      // OPEN THE TREE
      // highlightedNodes and their parents should never be collapsed
      const parents = getAllParentsUntil(
        highlightedNode.id,
        this.data.links,
        this.rootId
      )
      parents.forEach(parentId => {
        const node = this.data.nodes.find(n => n.id === parentId)
        if (node?.state) {
          node.state.collapsed = false
        }
      })
      if (highlightedNode.state) {
        highlightedNode.state.collapsed = false
      }
      // We focus on the first session node we find
      if (!focusSessionNode) {
        focusSessionNode = sessionNode
      }
    })

    // we need to cleanup the session nodes if they are not part of
    // the highlights anymore
    const sessionNodesToRemove = this.data.nodes.filter(
      n => n.state?.sessionNode && !validSessionIds.has(n.id)
    )
    sessionNodesToRemove.forEach(sessionNode => {
      const childLinks = this.data.links.filter(
        l => isSimNode(l.source) && l.source.id === sessionNode.id
      )
      const incomingLink = this.data.links.find(
        l => isSimNode(l.target) && l.target.id === sessionNode.id
      )
      const parentNode = incomingLink
        ? isSimNode(incomingLink.source)
          ? incomingLink.source
          : this.getNodeById(incomingLink.source.toString())
        : null
      this.data.links = this.data.links.filter(
        l =>
          !(isSimNode(l.source) && l.source.id === sessionNode.id) &&
          !(isSimNode(l.target) && l.target.id === sessionNode.id)
      )
      if (parentNode) {
        childLinks.forEach(link => {
          const targetNode = isSimNode(link.target)
            ? link.target
            : this.getNodeById(link.target.toString())
          if (targetNode) {
            this.data.links.push({
              source: parentNode,
              target: targetNode,
            })
          }
        })
      }
      const index = this.data.nodes.findIndex(n => n.id === sessionNode.id)
      if (index !== -1) this.data.nodes.splice(index, 1)
    })

    /* CREATE EMITTER NODES for VISIBLITY MODE "MINE"*/

    const isHighlighted = (nodeId: string) =>
      this.highlights.find(h => h.id === nodeId)

    const isChildHighlighted = (nodeId: string) => {
      const children = getChildren(nodeId, this.data.links)
      const _highlighted = children.some(isHighlighted)
      if (_highlighted) {
        return true
      } else {
        return children.some(isHighlighted)
      }
    }

    const nodesWithoutHighlight = [...this.data.nodes].filter(n => {
      if (n.state?.sessionNode) return false
      if (n.id === this.rootId) return false
      if (n.state?.emitterNode) return false
      if (isHighlighted(n.id)) return false
      if (isChildHighlighted(n.id)) return false
      return true
    })

    this.secondaryNodes = groupBy(nodesWithoutHighlight, n => n.depth || 0)

    // since we are modifing the graph, in case there is a selection we need
    // to recalculate the subgraph
    if (this.selectedNode) {
      this.subGraph = getNodeSubgraph(
        this.selectedNode.id,
        this.data.nodes,
        this.data.links,
        this.rootId
      )
    }
    // update the cluster size of the emitter nodes
    this.updateEmitterNodes()
    this.restart()
    // when there is no selectio we focus on the first session node we found
    // TODO: We could calcluate a point between all session nodes to focus the
    // camera on
    if (focusSessionNode) {
      this.transformCanvas.focusOn(() => {
        if (!focusSessionNode) return null
        const t = this.transformCanvas.getTransform()
        const _node = this.getNodeById(focusSessionNode.id)
        if (!_node) return null
        return { x: _node?.x!, y: _node?.y!, scale: t.scale }
      })
    } else {
      this.transformCanvas.focusOn(() => {
        if (!this.rootNode) return null
        const t = this.transformCanvas.getTransform()
        return { x: this.rootNode.x!, y: this.rootNode.y!, scale: t.scale }
      })
    }
  }

  setNodeVisibility = (visibility: NodeVisibility) => {
    if (this.nodeVisibility === visibility) return
    this.nodeVisibility = visibility
    this.updateHighlights()
  }

  initialize = (data: RawGraphData, rootId: string) => {
    this.emittedNodes = []
    this.rawData = data
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
            // TODO: this should maybe be centralized since highlights
            // also influence this state
            collapsed:
              hasOnlyLeafs(n.id, _links) &&
              getChildren(n.id, _links).length > 30,
            ...existingData?.state,
          } as NodeState,
          clusterSize,
          depth,
          x,
          y,
        }
      })
      .sort((a, b) => a.depth - b.depth)
    // we make a second pass to position nodes based on their parents
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
    // TODO: also if the root not is not created it should be flagged
    // in the state with rootNode: true
    if (!data.nodes.find(n => n.id === this.rootId)) {
      _nodes.push({
        id: this.rootId,
        state: { collapsed: false, image: undefined, rootNode: true },
        depth: -1,
        clusterSize: 1,
        x: this.center.x,
        y: this.center.y,
      })
    }

    // connect all nodes without a source in the links to the root node
    const targetIds = new Set(_links.map(link => link.target))
    const rootNodes = _nodes.filter(node => !targetIds.has(node.id))
    for (const node of rootNodes) {
      _links.push({
        source: this.rootId,
        target: node.id,
      })
    }

    this.maxDepth = Math.max(..._nodes.map(n => n.depth || 0))
    // create emitter nodes for each depth
    for (let i = 0; i <= this.maxDepth; i++) {
      const parentId = i === 0 ? this.rootId : `${VOID_EMIT_ID}-${i - 1}`
      const emitterId = `${VOID_EMIT_ID}-${i}`

      let pos = this.center

      if (i > 0) {
        const parentNode = _nodes.find(n => n.id === parentId)
        const parentAngle = getAngle(
          this.center.x,
          this.center.y,
          parentNode?.x!,
          parentNode?.y!
        )

        pos = getRadialPoint(
          getRadius(i),
          this.center.x,
          this.center.y,
          parentAngle
        )
      }

      _nodes.push({
        id: emitterId,
        state: { collapsed: false, emitterNode: true },
        depth: i,
        clusterSize: 1,
        x: pos.x,
        y: pos.y,
      })
      if (i < this.maxDepth) {
        _links.push({
          source: parentId,
          target: emitterId,
        })
      }
    }

    this.data = { nodes: _nodes as SimNode[], links: _links }
    this.loadNodeImages()
    //  this.restart()
    this.updateHighlights()
    this.triggerSelected(true)
  }

  get lockedNode() {
    return this.lockedNodeId ? this.getNodeById(this.lockedNodeId) : null
  }

  triggerSelected = (triggerFocus: boolean = false) => {
    if (this.selectedNode) {
      this.handleClickNode(this.selectedNode, {
        noToggle: true,
        triggerFocus,
      })
    } else if (this.lockedNode) {
      this.handleClickNode(this.lockedNode, {
        noToggle: true,
        triggerFocus,
        triggerRestart: true,
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
      this.highlights,
      { nodeVisibility: this.nodeVisibility, emittedNodes: this.emittedNodes }
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
    if (this.simulation) {
      this.simulation.stop()
      this.simulation.on("tick", null)
      this.simulation.on("end", null)
    }
    this.simulation = forceSimulation<SimNode, SimLink>(this.prunedData.nodes)
      .alpha(this.simulation ? alpha : 0.5)
      .force(
        "collide",
        forceCollide(n => {
          if (
            (n.state?.emitterNode && this.nodeVisibility === "all") ||
            !RENDER_EMITTER_NODES
          )
            return 0
          return this.getNodeSize(n.id) / 2
        })
      )
      .force(
        "link",
        asymmetricLinks<SimNode, SimLink>(this.prunedData.links)
          .id(d => d.id)
          .distance(l => {
            const size = this.getNodeSize(
              isSimNode(l.target) ? l.target.id : l.target.toString()
            )
            if (isSimNode(l.target)) {
              const state = l.target?.state
              if (state?.emitterNode) {
                if (isSimNode(l.source) && l.source.id === this.rootId) {
                  // TODO: potentially use a different distance for root emitter nodes
                  return 100
                }
                return 1
              }
              if (!state?.collapsed) {
                return size
              }
            }

            return size * 3
          })
          .strength(l => {
            return [0.66, 0.08]
          })
      )
      .force(
        "charge",
        forceManyBody<SimNode>().strength(node => {
          if (isSimNode(node) && node.state?.emitterNode) return -80
          return -150
        })
      )
      .force("center", forceCenter(this.center.x, this.center.y).strength(0.05))
      .restart()

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

  handleTick = () => {
    this.isTicking = true
    this.onDraw()
    this.tickCount++
  }

  setTranslate({ x, y }: { x: number; y: number }) {
    this.translate = { x, y }
    this.transformCanvas.setOffset(this.translate)
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
    if (node?.state?.sessionNode) return 5
    const isEmitterNode = node?.state?.emitterNode
    if (isEmitterNode) {
      if (node.clusterSize === 0) {
        return 5
      }
      const scale = scaleLinear()
        .domain(this.emitterClusterSizeRange)
        .range([nodeSize, nodeSize * 3])
      return scale(node.clusterSize || 1)
    }
    const isCollapsed = !!node?.state?.collapsed
    if (isCollapsed || isEmitterNode) {
      const scale = scaleLinear()
        .domain(this.clusterSizeRange)
        .range([nodeSize, nodeSize * 3])
      return scale(node.clusterSize || 1)
    }
    const isSelected = this.selectedNode?.id === nodeId
    const isLiquidated =
      node?.status === "LIQUIDATED" || node?.status === "REGENERATED"
    const _size = isLiquidated ? nodeSize * 0.2 : nodeSize
    return isSelected ? _size * 4 : _size * sizeScale
  }

  private updateRenderLayers() {
    const isHighlighted = (id: string) => {
      const highlight = this.highlights.find(h => h.id === id)
      return (
        (!this.selectedNode && highlight?.onTop) ||
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

    const isLinkInSubgraph = (link: SimLink) => {
      if (!this.selectedNode) return false
      const sourceId = isSimNode(link.source) ? link.source.id : link.source
      const targetId = isSimNode(link.target) ? link.target.id : link.target

      return this.subGraph.links.some(l => {
        const lSourceId = getNodeId(l.source)
        const lTargetId = getNodeId(l.target)
        return (
          (lSourceId === sourceId && lTargetId === targetId) ||
          (lSourceId === targetId && lTargetId === sourceId)
        )
      })
    }

    const isLinkInHighlights = (link: SimLink) => {
      const sourceId = isSimNode(link.source) ? link.source.id : link.source
      const targetId = isSimNode(link.target) ? link.target.id : link.target
      return (
        !this.selectedNode &&
        !!this.highlights.find(
          h => h.isDetached && (h.id === sourceId || h.id === targetId)
        )
      )
    }

    this.prunedData.links.forEach(link => {
      const inSubgraph = isLinkInSubgraph(link)
      const inHighlights = isLinkInHighlights(link)
      if (inSubgraph || inHighlights) {
        this.renderLayers.links.highlighted.push(link)
      } else {
        this.renderLayers.links.regular.push(link)
      }
    })
    this.renderLayers.links.highlighted.sort((a, b) => {
      const inSubgraphA = isLinkInSubgraph(a)
      const inSubgraphB = isLinkInSubgraph(b)
      if (inSubgraphA || inSubgraphB) return 2
      return -1
    })
    this.renderLayers.nodes.highlighted.sort((a, b) => {
      const highlightA = this.highlights.find(h => h.id === a.id)
      const highlightB = this.highlights.find(h => h.id === b.id)
      if (
        this.subGraph.nodes.find(n => n.id === a.id) ||
        this.subGraph.nodes.find(n => n.id === b.id)
      )
        return 2
      if (a.id === this.selectedNode?.id || b.id === this.selectedNode?.id)
        return 2
      if (highlightA?.onTop || highlightB?.onTop) return 1
      return -1
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

    if (isSimNode(link.target)) {
      if (this.nodeVisibility === "all" || !RENDER_EMITTER_NODES) {
        if (
          link.target.state?.emitterNode ||
          (isSimNode(link.source) && link.source.state?.emitterNode)
        ) {
          return
        }
      }
      const isSourceNode = this.data.links.some(
        l =>
          isSimNode(l.source) &&
          isSimNode(link.target) &&
          l.source.id === link.target.id
      )
      if (
        link.target.state?.emitterNode &&
        link.target.clusterSize === 0 &&
        !isSourceNode
      ) {
        return
      }
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

    if (highlight?.linkColor) {
      const gradient = ctx.createLinearGradient(sx, sy, tx, ty)
      gradient.addColorStop(0, stroke)
      gradient.addColorStop(1, color(highlight.linkColor)())
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

  private renderNode(
    ctx: CanvasRenderingContext2D,
    node: SimNode,
    options: {
      dim: boolean
      transform: Transform
    }
  ) {
    const x = node.x || 0
    const y = node.y || 0
    const isSelected = this.selectedNode?.id === node.id
    const isHovered = this.hoveredNode?.id === node.id
    const isCollapsed = !!node.state?.collapsed
    const isLiquidated =
      node.status === "LIQUIDATED" || node.status === "REGENERATED"
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
    } else if (node.state?.emitterNode) {
      if (!RENDER_EMITTER_NODES) return
      this.renderEmitterNode(ctx, x, y, nodeSize, node, _dim)
    } else if (node.state?.sessionNode) {
      this.renderSessionNode(ctx, x, y, nodeSize)
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

  private renderEmitterNode(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    node: SimNode,
    dimmed: boolean
  ) {
    if (this.nodeVisibility === "all") return
    if (node.clusterSize === 0) return
    const isLight = this.theme === "light"
    circle(ctx, x, y, size / 2, {
      stroke: true,
      strokeStyle: this.colorContrast(),
      lineWidth: 0.2,
      fill: true,
      fillStyle: "#0000ff", // this.color(dim(0.18, isLight))(),
    })
    const transform = this.transformCanvas.getTransform()
    const clusterSize = node.clusterSize || 1
    const showLabel =
      transform.scale - 0.5 >= this.visiblityScale(clusterSize) ? 1 : 0
    if (showLabel) {
      ctx.font = `${14 / transform.scale}px Sans-Serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = this.colorContrast()
      ctx.fillText(clusterSize.toString(), x, y)
      ctx.font = `${10 / transform.scale}px Sans-Serif`
      ctx.fillText("click to emit", x, y + 5)
    }
  }

  private renderSessionNode(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) {
    const isLight = this.theme === "light"
    circle(ctx, x, y, size / 2, {
      stroke: true,
      strokeStyle: this.colorContrast(),
      lineWidth: 0.2,
      fill: true,
      fillStyle: this.color(dim(0.18, isLight))(),
    })
  }

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

    rect(ctx, x - _size / 2, y - _size / 2, _size, _size, {
      stroke: highlighted || isHovered,
      strokeStyle: isHovered ? fill : highlightedStroke,
      lineWidth: 1,
      fill: this.hideThumbnails || isLiquidated || !image,
      fillStyle: fill,
      borderRadius: 1,
    })

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

  onDraw = () => {
    this.isDrawing = true
    const context = this.canvas?.getContext("2d")
    const transform = this.transformCanvas.getTransform()
    if (!context) {
      this.isDrawing = false
      return
    }

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
    context.translate(this.origin.x, this.origin.y)
    context.save()

    const dimmedByHighlights = (nodeId: string) => {
      if (this.nodeVisibility === "all") return false
      if (nodeId === this.rootId) return false
      if (this.nodeVisibility === "locked") {
        const node = this.getNodeById(nodeId)
        return !(node?.status === "LOCKED" || node?.status === "EVOLVED")
      }
      return !this.highlights.find(n => n.id === nodeId)
    }

    const hasSelection = !!this.selectedNode

    this.renderLayers.links.regular.forEach(link => {
      const sourceId = isSimNode(link.source)
        ? link.source.id
        : link.source.toString()
      const targetId = isSimNode(link.target)
        ? link.target.id
        : link.target.toString()

      const _dim = hasSelection
        ? !this.subGraph.links.find(
            sl =>
              getNodeId(sl.source) === sourceId &&
              getNodeId(sl.target) === targetId
          )
        : dimmedByHighlights(sourceId) || dimmedByHighlights(targetId)

      this.renderLink(context, link, { dim: _dim, hasSelection })
    })

    context.globalAlpha = 1
    this.renderLayers.nodes.regular.forEach(node => {
      const _dim = hasSelection
        ? !this.subGraph.nodes.some(n => n.id === node.id)
        : dimmedByHighlights(node.id)
      this.renderNode(context, node, { dim: _dim, transform })
    })

    this.renderLayers.links.highlighted.forEach(link => {
      const sourceId = isSimNode(link.source)
        ? link.source.id
        : link.source.toString()
      const targetId = isSimNode(link.target)
        ? link.target.id
        : link.target.toString()

      const _dim = hasSelection
        ? !this.subGraph.links.find(
            sl =>
              getNodeId(sl.source) === sourceId &&
              getNodeId(sl.target) === targetId
          )
        : dimmedByHighlights(sourceId) || dimmedByHighlights(targetId)

      const highlight = this.highlights.find(
        h => h.id === sourceId || h.id === targetId
      )

      this.renderLink(context, link, { dim: _dim, hasSelection, highlight })
    })

    context.globalAlpha = 1
    this.renderLayers.nodes.highlighted.forEach(node => {
      const _dim = hasSelection
        ? !this.subGraph.nodes.some(n => n.id === node.id)
        : dimmedByHighlights(node.id)
      this.renderNode(context, node, { dim: _dim, transform })
    })

    // this.drawDebugDepthCircles(context)

    context.restore()
    context.restore()
    // this.drawDebug(context)
    this.transformCanvas.trackCursor()
    this.isDrawing = false
  }

  private drawDebug(context: CanvasRenderingContext2D) {
    const transform = this.transformCanvas.getTransform()
    context.font = `${14}px Sans-Serif`
    context.textAlign = "left"
    context.fillStyle = "#000000"
    context.fillText(
      `${transform.x}, ${transform.y}, ${transform.scale}`,
      0,
      15
    )
    const center = this.worldToScreen(this.rootNode?.x!, this.rootNode?.y!)
    context.fillText(`${center.x}, ${center.y}`, 0, 30)
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
        const html = this.imageCache.get(node.imgSrc)
        node.state = node.state || {}
        node.state.image = html
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

  setNodeImage = (nodeId: string, src: string) => {
    const node = this.getNodeById(nodeId)
    if (!node) return
    const load = async () => {
      const html = this.imageCache.get(src) || (await loadHTMLImageElement(src))
      this.imageCache.set(src, html)
      node.state = node.state || {}
      node.state.image = html
      if (!this.isTicking && !this.isDrawing) {
        this.updateScene()
      }
    }
    load()
  }

  setHideThumbnails = (hide: boolean) => {
    this.hideThumbnails = hide
    this.updateScene()
  }

  setSelectedNode = (node: SimNode | null) => {
    this.selectedNode = node
    this.updateRenderLayers()
    this.updateScene()
  }

  private _highlightHash?: string

  setHighlights = (highlights: HighlightStyle[]) => {
    const hash = quickHash(JSON.stringify(highlights))
    if (hash === this._highlightHash) return
    this._highlightHash = hash
    this.highlights = highlights
    this.updateHighlights()
    // this.triggerSelected()
  }

  setNoInteraction = (noInteraction: boolean) => {
    this.noInteraction = noInteraction
    this.transformCanvas.setNoInteraction(this.noInteraction)
    this.updateScene()
  }

  getNodeById = (nodeId: string): SimNode | null => {
    return this.data.nodes.find(n => n.id === nodeId) || null
  }

  setLockedNodeId = (nodeId?: string | null) => {
    this.lockedNodeId = nodeId || undefined
  }

  // DEBUG
  handleClickDebug = (x: number, y: number) => {
    const p = this.screenToWorld(x, y)
    this.circles.push(p)
    //    this.transformCanvas.transformToWorld(p.x, p.y)

    this.transformCanvas.focusOn(() => {
      const circle = this.circles[this.circles.length - 1]
      return {
        x: circle.x,
        y: circle.y,
        scale: this.transformCanvas.getTransform().scale,
      }
    })
    this.updateScene()
  }

  circles: Array<Point> = []

  onDrawDebug = () => {
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
    context.translate(this.origin.x, this.origin.y)
    context.save()

    this.circles.map(c => {
      circle(context, c.x, c.y, 5, {
        fill: true,
        fillStyle: "#ff0000",
        stroke: false,
      })
    })
    circle(context, 0, 0, 5, {
      fill: true,
      fillStyle: "#ff0000",
      stroke: false,
    })

    context.restore()
    context.restore()
  }
}
