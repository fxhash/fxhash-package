import { useOpenFormGraph } from "@/context/graph"
import { circle, rect, img, hexagon } from "@/util/canvas"
import { dim } from "@/util/color"
import { scaleLog } from "d3-scale"
import { useCallback } from "react"
import { NodeObject } from "react-force-graph-2d"
import { useColor } from "./useColor"
import { Node } from "@/_types"
import { VOID_ROOT_ID } from "@/context/constants"

export function useGraphNodes() {
  const {
    selectedNode,
    theme,
    clusterSizeRange,
    highlights,
    hasNodeChildren,
    config,
    getNodeSize,
    focusNodes,
  } = useOpenFormGraph()

  const { color, colorContrast } = useColor()

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

  const nodePointerAreaPaint = useCallback(
    (
      node: NodeObject<Node>,
      col: string,
      ctx: CanvasRenderingContext2D,
      scale: number
    ) => {
      const x = node.x || 0
      const y = node.y || 0
      const size = getNodeSize(node.id as string)
      const collapsed = node.collapsed && hasNodeChildren(node.id as string)
      const isSelected = selectedNode?.id === node.id
      if (collapsed) {
        circle(ctx, x, y, size, {
          stroke: true,
          strokeStyle: col,
          fill: true,
          fillStyle: col,
        })
      } else {
        rect(ctx, x - size / 2, y - size / 2, size, size, {
          stroke: true,
          strokeStyle: col,
          lineWidth: isSelected ? 1 : 0.2,
          fill: true,
          fillStyle: col,
          borderRadius: 1,
        })
      }
    },
    [getNodeSize, hasNodeChildren, selectedNode]
  )

  const renderNode = useCallback(
    (node: NodeObject<Node>, ctx: CanvasRenderingContext2D, scale: number) => {
      const isSelected = selectedNode?.id === node.id
      const isHighlighted = highlights.nodes.find(n => n.id === node.id)
      const size = getNodeSize(node.id as string)
      const fontSize = 12 / scale
      const isLight = theme === "light"

      const x = node.x || 0
      const y = node.y || 0

      let isDimmed = false
      let opacity = 0.3
      if (selectedNode && !isHighlighted) {
        opacity = 0.1
        isDimmed = true
      }

      const collapsed = node.collapsed && hasNodeChildren(node.id as string)
      if (collapsed) {
        circle(ctx, x, y, size, {
          stroke: true,
          strokeStyle: color(dim(opacity, isLight))(),
          fill: true,
          fillStyle: color(dim(isDimmed ? 0.1 : 0.2, isLight))(),
        })
        if (focusNodes.find(n => n.id === node.id)) {
          circle(ctx, x, y, size + 1, {
            stroke: true,
            strokeStyle: color(dim(opacity, isLight))(),
            fill: false,
          })
        }

        const showLabel = visibilityScale(node.clusterSize, scale)

        if (showLabel) {
          ctx.font = `${fontSize}px Sans-Serif`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillStyle = color(dim(isDimmed ? 0.1 : 0.4))()
          ctx.fillText(node.clusterSize.toString(), x, y)
        }
      } else {
        if (node.id !== VOID_ROOT_ID) {
          rect(ctx, x - size / 2, y - size / 2, size, size, {
            stroke: true,
            strokeStyle: color(dim(opacity, isLight))(),
            lineWidth: isSelected ? 1 : 0.2,
            fill: true,
            fillStyle: color(dim(opacity, isLight))(),
            borderRadius: 1,
          })
        } else {
          hexagon(ctx, x, y, size, {
            stroke: true,
            strokeStyle: color(dim(opacity, isLight))(),
            lineWidth: isSelected ? 1 : 0.2,
            fill: true,
            fillStyle: color(dim(isDimmed ? 0.05 : 0.2, isLight))(),
            borderRadius: 1,
          })
        }
        if (node.image) {
          img(
            ctx,
            node.image,
            x - size / 2,
            y - size / 2,
            size,
            size,
            1,
            isDimmed ? 0.1 : 1,
            isLight ? "white" : "black"
          )
        }
        const showLabel = false
        if (showLabel && node.label) {
          ctx.font = "6px Sans-Serif"
          ctx.textAlign = "left"
          ctx.textBaseline = "middle"
          ctx.fillText(node.label, x + config.nodeSize, y)
        }
        if (focusNodes.find(n => n.id === node.id)) {
          circle(ctx, x, y, (size * Math.sqrt(2)) / 2 + 1, {
            stroke: true,
            strokeStyle: color(dim(opacity, isLight))(),
            fill: false,
          })
        }
      }
    },
    [
      selectedNode,
      theme,
      clusterSizeRange,
      highlights,
      hasNodeChildren,
      config,
      visibilityScale,
      color,
      getNodeSize,
      focusNodes,
    ]
  )
  return {
    renderNode,
    nodePointerAreaPaint,
  }
}
