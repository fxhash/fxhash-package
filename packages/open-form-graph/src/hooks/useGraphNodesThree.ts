import { useCallback } from "react"
import { useOpenFormGraph } from "@/context/graph"
import { scaleLog } from "d3-scale"
import * as THREE from "three"
import SpriteText from "three-spritetext"
import { NodeObject } from "react-force-graph-3d"
import { Node } from "@/_types"
import { useColor } from "./useColor"

function rgbToHex(rgb: string): string {
  const result = rgb.match(/\d+/g)
  if (!result || result.length < 3) return "#000000"
  const [r, g, b] = result.map(n => parseInt(n).toString(16).padStart(2, "0"))
  return `#${r}${g}${b}`
}

export function useGraphNodesThree() {
  const {
    selectedNode,
    clusterSizeRange,
    highlights,
    hasNodeChildren,
    getNodeSize,
    ref
  } = useOpenFormGraph()

  const { color } = useColor()

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
    console.log((ref?.current as any)?.camera())
    const size = getNodeSize(node.id as string)
    const isSelected = selectedNode?.id === node.id
    const isHighlighted = highlights.nodes.find(n => n.id === node.id)

    let opacity = 1
    if (selectedNode && !isHighlighted) {
      opacity = 0.1
    }

    if (node.imgSrc && !node.collapsed) {
      const geometry = new THREE.PlaneGeometry(size, size)
      const material = new THREE.MeshLambertMaterial({
        color: 0x000000,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
      })
      const plane = new THREE.Mesh(geometry, material)
      plane.userData = { node }
      return plane
    }

    if (node.collapsed && hasNodeChildren(node.id as string)) {
      const geometry = new THREE.SphereGeometry(size / 2, 16, 16)
      const material = new THREE.MeshLambertMaterial({
        color: 0x000000,
        transparent: true,
        opacity,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.userData = { node }

      const showLabel = visibilityScale(node.clusterSize, 1)
      if (showLabel) {
        const label = new SpriteText(String(node.clusterSize))
        label.color = "#ffffff"
        label.textHeight = size * 0.6
        label.position.y = size
        const group = new THREE.Group()
        group.add(sphere)
        group.add(label)
        return group
      }

      return sphere
    }

    const rgbColor = color(opacity)
    const hex = rgbToHex(rgbColor)

    const geometry = new THREE.BoxGeometry(size, size, size)
    const material = new THREE.MeshLambertMaterial({
      color: hex,
      transparent: true,
      opacity,
    })

    const box = new THREE.Mesh(geometry, material)
    box.userData = { node }
    return box
  }, [
    getNodeSize,
    selectedNode,
    highlights,
    hasNodeChildren,
    visibilityScale,
    color,
  ])

  return {
    nodeThreeObject,
  }
}
