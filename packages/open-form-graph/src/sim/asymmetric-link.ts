// @ts-nocheck

function constant(x) {
  return function () {
    return x
  }
}

function jiggle(random) {
  return (random() - 0.5) * 1e-6
}

function index(d) {
  return d.index
}

function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId)
  if (!node) throw new Error("node not found: " + nodeId)
  return node
}

export function asymmetricLinks(links) {
  var id = index,
    strength = defaultStrength,
    strengths,
    distance = constant(30),
    distances,
    nodes,
    count,
    bias,
    random,
    iterations = 1

  if (links == null) links = []

  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index])
  }

  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x, y, l, b, _s, s; i < n; ++i) {
        ;(link = links[i]), (source = link.source), (target = link.target)
        x = target.x + target.vx - source.x - source.vx || jiggle(random)
        y = target.y + target.vy - source.y - source.vy || jiggle(random)
        l = Math.sqrt(x * x + y * y)

        l = ((l - distances[i]) / l) * alpha
        x *= l
        y *= l

        target.vx -= x * (b = bias[i]) * (s = (_s = strengths[i])[0])
        target.vy -= y * b * s
        source.vx += x * (b = 1 - b) * (s = _s[1])
        source.vy += y * b * s
      }
    }
  }

  function initialize() {
    if (!nodes) return

    var i,
      n = nodes.length,
      m = links.length,
      nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])),
      link

    for (i = 0, count = new Array(n); i < m; ++i) {
      ;(link = links[i]), (link.index = i)
      if (typeof link.source !== "object")
        link.source = find(nodeById, link.source)
      if (typeof link.target !== "object")
        link.target = find(nodeById, link.target)
      count[link.source.index] = (count[link.source.index] || 0) + 1
      count[link.target.index] = (count[link.target.index] || 0) + 1
    }

    for (i = 0, bias = new Array(m); i < m; ++i) {
      ;(link = links[i]),
        (bias[i] =
          count[link.source.index] /
          (count[link.source.index] + count[link.target.index]))
    }

    ;(strengths = new Array(m)), initializeStrength()
    ;(distances = new Array(m)), initializeDistance()
  }

  function initializeStrength() {
    if (!nodes) return

    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = strength(links[i], i, links)
    }
  }

  function initializeDistance() {
    if (!nodes) return

    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links)
    }
  }

  force.initialize = function (_nodes, _random) {
    nodes = _nodes
    random = _random
    initialize()
  }

  force.links = function (_) {
    return arguments.length ? ((links = _), initialize(), force) : links
  }

  force.id = function (_) {
    return arguments.length ? ((id = _), force) : id
  }

  force.iterations = function (_) {
    return arguments.length ? ((iterations = +_), force) : iterations
  }

  force.strength = function (_) {
    return arguments.length
      ? ((strength = typeof _ === "function" ? _ : constant(+_)),
        initializeStrength(),
        force)
      : strength
  }

  force.distance = function (_) {
    return arguments.length
      ? ((distance = typeof _ === "function" ? _ : constant(+_)),
        initializeDistance(),
        force)
      : distance
  }

  return force
}
