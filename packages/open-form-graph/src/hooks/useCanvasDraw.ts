import { RawNode, RawLink } from "@/_types"
import { Simulation } from "d3-force"
import { MutableRefObject, RefObject, useCallback } from "react"
import { SimNode, SimLink } from "./useForceSimulation"
import { Transform } from "./useTransform"
import { circle, hexagon } from "@/util/canvas"

interface UseCanvasDrawProps {
  width: number
  height: number
  nodes: MutableRefObject<SimNode[]>
  links: MutableRefObject<SimLink[]>
  hoveredNode?: MutableRefObject<SimNode | null>
  selectedNode?: MutableRefObject<SimNode | null>
  rootId: string
}

export function useCanvasDraw(props: UseCanvasDrawProps) {
  const { nodes, links, width, height, selectedNode, hoveredNode, rootId } =
    props
  const draw = useCallback(
    (context: CanvasRenderingContext2D, transform: Transform) => {
      function drawLink(d) {
        context.moveTo(d.source.x, d.source.y)
        context.lineTo(d.target.x, d.target.y)
      }

      function drawNode(d) {
        context.moveTo(d.x + 5, d.y)
        context.arc(d.x, d.y, 5, 0, 2 * Math.PI)
      }

      context.clearRect(0, 0, width, height)

      context.save()
      context.translate(transform.x, transform.y)
      context.scale(transform.scale, transform.scale)

      context.save()
      context.globalAlpha = 0.6
      context.strokeStyle = "#999"
      context.beginPath()
      links.current.forEach(drawLink)
      context.stroke()
      context.restore()

      context.save()
      context.strokeStyle = "#fff"
      context.globalAlpha = 1
      nodes.current.forEach(node => {
        const x = node.x || 0
        const y = node.y || 0
        const isSelected = selectedNode?.current?.id === node.id
        const isHovered = hoveredNode?.current?.id === node.id
        const fill = isHovered ? "salmon" : "black"
        const stroke = "#fff"
        const size = 5

        if (node.id === rootId) {
          hexagon(context, x, y, size, {
            stroke: true,
            strokeStyle: stroke,
            lineWidth: isSelected ? 1 : 0.2,
            fill: true,
            fillStyle: fill,
            borderRadius: 1,
          })
        } else {
          circle(context, x, y, size, {
            stroke: true,
            strokeStyle: stroke,
            lineWidth: isSelected ? 1 : 0.2,
            fill: true,
            fillStyle: fill,
          })
        }
      })
      context.restore()
      context.restore()
    },
    [width, height, nodes, links, selectedNode, hoveredNode]
  )

  return {
    draw,
  }
}
