import { ForceGraphMethods as ForceGraphMethods3D } from "react-force-graph-3d"
import { useCallback, useEffect, useRef, useState } from "react"
import { useOpenFormGraph } from "@/context/graph"
import { scaleLog } from "d3-scale"
import * as THREE from "three"
import SpriteText from "three-spritetext"
import { NodeObject } from "react-force-graph-3d"
import { Link, Node } from "@/_types"
import { useColor } from "./useColor"
import throttle from "lodash.throttle"

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


  const zoomRef = useRef(0)

  useEffect(() => {
    if (!ref.current) return
    const _ref = ref.current as ForceGraphMethods3D<Node, Link>

    const throttledDebounce = throttle(() => {
      // _ref.refresh()
    }, 30)

    const controls = _ref.controls() as any
    const handleChange = (e: any) => {
      zoomRef.current = e.target.object.position.z
      throttledDebounce()
    }

    controls.addEventListener("change", handleChange)

    return () => {
      controls.removeEventListener("change", handleChange)
      throttledDebounce.cancel()
    }
  }, [])

  const visibilityScale = useCallback(
    (clusterSize: number, currentZoom: number) => {
      const minZoomRequired = scaleLog()
        .domain([1, clusterSizeRange[1]])
        .range([1000, 300,])
        .clamp(true)(clusterSize)
      return currentZoom >= minZoomRequired ? 0 : 1
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

      const showLabel = visibilityScale(node.clusterSize, zoomRef.current)
      if (showLabel) {
        const label = new SpriteText(String(node.clusterSize))
        label.color = rgbToHex(color(1))
        label.textHeight = 10
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
