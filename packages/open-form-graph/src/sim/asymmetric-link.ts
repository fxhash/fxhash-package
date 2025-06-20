import { SimulationNodeDatum, SimulationLinkDatum, Force } from "d3-force"

// Type definitions
export interface AsymmetricLink<
  NodeDatum extends SimulationNodeDatum = SimulationNodeDatum,
> extends SimulationLinkDatum<NodeDatum> {
  index?: number
}

export interface AsymmetricLinkForce<
  NodeDatum extends SimulationNodeDatum,
  LinkDatum extends AsymmetricLink<NodeDatum> = AsymmetricLink<NodeDatum>,
> extends Force<NodeDatum, LinkDatum> {
  links(): LinkDatum[]
  links(links: LinkDatum[]): this

  id(): (node: NodeDatum, i: number, nodes: NodeDatum[]) => string | number
  id(
    id: (node: NodeDatum, i: number, nodes: NodeDatum[]) => string | number
  ): this

  iterations(): number
  iterations(iterations: number): this

  strength(): (
    link: LinkDatum,
    i: number,
    links: LinkDatum[]
  ) => number | [number, number]
  strength(
    strength:
      | number
      | ((
          link: LinkDatum,
          i: number,
          links: LinkDatum[]
        ) => number | [number, number])
  ): this

  distance(): (link: LinkDatum, i: number, links: LinkDatum[]) => number
  distance(
    distance:
      | number
      | ((link: LinkDatum, i: number, links: LinkDatum[]) => number)
  ): this
}

// Helper functions
function constant<T>(x: T): () => T {
  return function () {
    return x
  }
}

function jiggle(random: () => number): number {
  return (random() - 0.5) * 1e-6
}

function index<NodeDatum extends SimulationNodeDatum>(
  d: NodeDatum
): string | number {
  return d.index!
}

function find<NodeDatum extends SimulationNodeDatum>(
  nodeById: Map<string | number, NodeDatum>,
  nodeId: string | number
): NodeDatum {
  const node = nodeById.get(nodeId)
  if (!node) throw new Error("node not found: " + nodeId)
  return node
}

// Main force function
export function asymmetricLinks<
  NodeDatum extends SimulationNodeDatum = SimulationNodeDatum,
  LinkDatum extends AsymmetricLink<NodeDatum> = AsymmetricLink<NodeDatum>,
>(links?: LinkDatum[]): AsymmetricLinkForce<NodeDatum, LinkDatum> {
  let id: (node: NodeDatum, i: number, nodes: NodeDatum[]) => string | number =
    index
  let strength: (
    link: LinkDatum,
    i: number,
    links: LinkDatum[]
  ) => number | [number, number] = defaultStrength
  let strengths: (number | [number, number])[]
  let distance: (link: LinkDatum, i: number, links: LinkDatum[]) => number =
    constant(30)
  let distances: number[]
  let nodes: NodeDatum[] | undefined
  let count: number[]
  let bias: number[]
  let random: (() => number) | undefined
  let iterations = 1

  if (links == null) links = []

  function defaultStrength(link: LinkDatum): number {
    return (
      1 /
      Math.min(
        count[(link.source as NodeDatum).index!],
        count[(link.target as NodeDatum).index!]
      )
    )
  }

  function force(alpha: number): void {
    for (let k = 0, n = links!.length; k < iterations; ++k) {
      for (let i = 0; i < n; ++i) {
        const link = links![i]
        const source = link.source as NodeDatum
        const target = link.target as NodeDatum

        let x =
          target.x! + target.vx! - source.x! - source.vx! || jiggle(random!)
        let y =
          target.y! + target.vy! - source.y! - source.vy! || jiggle(random!)
        let l = Math.sqrt(x * x + y * y)

        l = ((l - distances[i]) / l) * alpha
        x *= l
        y *= l

        const b = bias[i]
        const strengthValue = strengths[i]
        let s0: number, s1: number

        if (Array.isArray(strengthValue)) {
          ;[s0, s1] = strengthValue
        } else {
          s0 = s1 = strengthValue
        }

        target.vx! -= x * b * s0
        target.vy! -= y * b * s0
        source.vx! += x * (1 - b) * s1
        source.vy! += y * (1 - b) * s1
      }
    }
  }

  function initialize(): void {
    if (!nodes) return

    const n = nodes.length
    const m = links!.length
    const nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes!), d]))

    count = new Array(n).fill(0)

    for (let i = 0; i < m; ++i) {
      const link = links![i]
      link.index = i

      if (typeof link.source !== "object") {
        link.source = find(nodeById, link.source)
      }
      if (typeof link.target !== "object") {
        link.target = find(nodeById, link.target)
      }

      count[(link.source as NodeDatum).index!]++
      count[(link.target as NodeDatum).index!]++
    }

    bias = new Array(m)
    for (let i = 0; i < m; ++i) {
      const link = links![i]
      const sourceCount = count[(link.source as NodeDatum).index!]
      const targetCount = count[(link.target as NodeDatum).index!]
      bias[i] = sourceCount / (sourceCount + targetCount)
    }

    strengths = new Array(m)
    initializeStrength()
    distances = new Array(m)
    initializeDistance()
  }

  function initializeStrength(): void {
    if (!nodes) return

    for (let i = 0, n = links!.length; i < n; ++i) {
      strengths[i] = strength(links![i], i, links!)
    }
  }

  function initializeDistance(): void {
    if (!nodes) return

    for (let i = 0, n = links!.length; i < n; ++i) {
      distances[i] = +distance(links![i], i, links!)
    }
  }

  force.initialize = function (
    _nodes: NodeDatum[],
    _random: () => number
  ): void {
    nodes = _nodes
    random = _random
    initialize()
  }

  force.links = function (_?: LinkDatum[]): any {
    return arguments.length ? ((links = _!), initialize(), force) : links
  }

  force.id = function (
    _?: (node: NodeDatum, i: number, nodes: NodeDatum[]) => string | number
  ): any {
    return arguments.length ? ((id = _!), force) : id
  }

  force.iterations = function (_?: number): any {
    return arguments.length ? ((iterations = +_!), force) : iterations
  }

  force.strength = function (
    _?:
      | number
      | ((
          link: LinkDatum,
          i: number,
          links: LinkDatum[]
        ) => number | [number, number])
  ): any {
    return arguments.length
      ? ((strength = typeof _ === "function" ? _ : constant(+_!)),
        initializeStrength(),
        force)
      : strength
  }

  force.distance = function (
    _?: number | ((link: LinkDatum, i: number, links: LinkDatum[]) => number)
  ): any {
    return arguments.length
      ? ((distance = typeof _ === "function" ? _ : constant(+_!)),
        initializeDistance(),
        force)
      : distance
  }

  return force as AsymmetricLinkForce<NodeDatum, LinkDatum>
}
