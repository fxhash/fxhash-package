import { useCallback } from "react"
import { useOpenFormGraph } from "@/context/graph"
import { scaleLog } from "d3-scale"
import * as THREE from "three"
import SpriteText from "three-spritetext"
import { useColor } from "./useColor"
import { NodeObject } from "react-force-graph-3d"
import { Node } from "@/_types"

export function useGraphNodesThree() {
  const {
    selectedNode,
    theme,
    clusterSizeRange,
    highlights,
    hasNodeChildren,
    getNodeSize,
  } = useOpenFormGraph()

  const { color, colorContrast } = useColor()
  const isLight = theme === "light"

  const visibilityScale = useCallback(
    (clusterSize: number, currentZoom: number) => {
      const minZoomRequired = scaleLog()
        .domain([1, clusterSizeRange[1]])
        .range([7.5, 1.8])
        .clamp(true)(clusterSize)

      return currentZoom >= minZoomRequired ? 1 : 0
    },
    [clusterSizeRange]
  )

  const nodeThreeObject = useCallback((node: NodeObject<Node>) => {
    const size = getNodeSize(node.id as string)
    const isSelected = selectedNode?.id === node.id
    const isHighlighted = highlights.nodes.find(n => n.id === node.id)

    let opacity = 1
    if (selectedNode && !isHighlighted) {
      opacity = 0.1
    }

    const nodeColor = node.collapsed
      ? colorContrast(opacity)
      : color(opacity)

    // Handle image nodes (expanded with image)
    if (node.imgSrc && !node.collapsed) {
      const texture = new THREE.TextureLoader().load(node.imgSrc)
      texture.colorSpace = THREE.SRGBColorSpace
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(size, size, 1)
      sprite.userData = { node }
      return sprite
    }

    // Collapsed = Sphere, Expanded = Box
    const geometry = node.collapsed && hasNodeChildren(node.id as string)
      ? new THREE.SphereGeometry(size / 2, 16, 16)
      : new THREE.BoxGeometry(size, size, size)

    const material = new THREE.MeshLambertMaterial({
      color: nodeColor,
      transparent: true,
      opacity,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.userData = { node }

    // Show label as SpriteText if collapsed and label is visible
    const showLabel = node.collapsed && visibilityScale(node.clusterSize, 1) // assume zoom = 1

    if (showLabel) {
      const label = new SpriteText(String(node.clusterSize))
      label.color = colorContrast(1)
      label.textHeight = size * 0.6
      const group = new THREE.Group()
      group.add(mesh)
      group.add(label)
      return group
    }

    return mesh
  }, [
    getNodeSize,
    selectedNode,
    highlights,
    hasNodeChildren,
    color,
    colorContrast,
    visibilityScale
  ])

  return {
    nodeThreeObject,
  }
}
