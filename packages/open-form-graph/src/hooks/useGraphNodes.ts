
import { NODE_SIZE, MIN_CLUSTER_SIZE, MAX_CLUSTER_SIZE, NODE_WIDTH } from "@/constants"
import { useGraphDataContext } from "@/context/graph"
import { circle, rect, img } from "@/util/canvas"
import { dim } from "@/util/color"
import { scaleLog } from "d3-scale"
import { useCallback } from "react"
import { NodeObject } from "react-force-graph-2d"
import { useColor } from "./useColor"
import { normalize } from "@/util/math"
import { Node } from "@/_types"

export function useGraphNodes() {
  const { selectedNode, theme, clusterSizeRange, highlights, hasNodeChildren } = useGraphDataContext()

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

  const renderNode = useCallback(
    (node: NodeObject<Node>, ctx: CanvasRenderingContext2D, scale: number) => {
      const fontSize = 12 / scale
      const radius = NODE_SIZE
      const isLight = theme === "light"

      const x = node.x || 0
      const y = node.y || 0

      const isSelected = selectedNode?.id === node.id
      const isHighlighted = highlights.nodes.find(n => n.id === node.id)

      let opacity = 1
      if (selectedNode && !isHighlighted) {
        opacity = 0.1
      }

      const collapsed = node.collapsed && hasNodeChildren(node.id as string)
      if (collapsed) {
        const norm = normalize(
          node.clusterSize,
          clusterSizeRange[0],
          clusterSizeRange[1],
          MIN_CLUSTER_SIZE / 2,
          MAX_CLUSTER_SIZE / 2
        )
        circle(ctx, x, y, norm, {
          stroke: true,
          strokeStyle: colorContrast(dim(opacity, isLight))(),
          fill: true,
          fillStyle: color(dim(opacity, isLight))(),
        })


        const showLabel = visibilityScale(node.clusterSize, scale)

        if (showLabel) {
          ctx.font = `${fontSize}px Sans-Serif`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillStyle = colorContrast(opacity)
          ctx.fillText(node.clusterSize.toString(), x, y)
        }
      } else {
        rect(ctx, x - radius / 2, y - radius / 2, radius, radius, {
          stroke: true,
          strokeStyle: color(opacity),
          lineWidth: isSelected ? 1 : 0.2,
          fill: true,
          fillStyle: colorContrast(dim(0.5, isLight))(),
          borderRadius: 1,
        })
        if (node.image) {
          const PADDING = 0.5
          img(
            ctx,
            node.image,
            x - (radius - PADDING) / 2,
            y - (radius - PADDING) / 2,
            radius - PADDING,
            radius - PADDING,
            1,
            opacity,
            isLight ? "white" : "black"
          )
        }
        const showLabel = false
        if (showLabel) {
          ctx.font = "6px Sans-Serif"
          ctx.textAlign = "left"
          ctx.textBaseline = "middle"
          ctx.fillText(node.label, x + NODE_WIDTH, y)
        }
      }
    },
    [theme, selectedNode, clusterSizeRange, visibilityScale]
  )
  return {
    renderNode,
  }
}
