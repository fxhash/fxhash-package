import { MutableRefObject, RefObject, useCallback } from "react"
import { SimNode, SimLink } from "./useForceSimulation"
import { Transform } from "./useTransform"
import { circle, img, rect } from "@/util/canvas"
import { dim } from "@/util/color"
import { useColor } from "./useColor"
import { useOpenFormGraph } from "@/provider"

interface UseCanvasDrawProps {
  width: number
  height: number
  nodes: MutableRefObject<SimNode[]>
  links: MutableRefObject<SimLink[]>
  hoveredNode?: MutableRefObject<SimNode | null>
  selectedNode?: MutableRefObject<SimNode | null>
  subGraph?: MutableRefObject<{ nodes: SimNode[]; links: SimLink[] }>
  rootId: string
  rootImages?: MutableRefObject<HTMLImageElement[]>
}
function getNodeId(n: any) {
  return typeof n === "object" && n !== null && "id" in n ? n.id : n
}

export function useCanvasDraw(props: UseCanvasDrawProps) {
  const {
    nodes,
    links,
    width,
    height,
    selectedNode,
    hoveredNode,
    rootId,
    subGraph,
    rootImages,
  } = props
  const { theme } = useOpenFormGraph()
  const { color, colorContrast } = useColor()
  const draw = useCallback(
    (context: CanvasRenderingContext2D, transform: Transform) => {
      context.clearRect(0, 0, width, height)

      context.save()
      context.translate(transform.x, transform.y)
      context.scale(transform.scale, transform.scale)

      context.save()
      const isLight = theme === "light"
      links.current.forEach(l => {
        const _dim =
          !!selectedNode?.current &&
          !subGraph?.current.links.find(
            sl =>
              getNodeId(sl.source) === getNodeId(l.source) &&
              getNodeId(sl.target) === getNodeId(l.target)
          )

        const stroke = _dim
          ? color(dim(0.09, isLight))()
          : color(dim(0.15, isLight))()
        context.globalAlpha = 0.5
        context.strokeStyle = stroke
        context.lineWidth = _dim ? 0.3 : 0.8
        context.beginPath()
        context.moveTo(l.source.x, l.source.y)
        context.lineTo(l.target.x, l.target.y)
        context.stroke()
        context.closePath()
      })
      context.restore()

      context.save()
      context.globalAlpha = 1
      nodes.current.forEach(node => {
        const x = node.x || 0
        const y = node.y || 0
        const isSelected = selectedNode?.current?.id === node.id
        const isHovered = hoveredNode?.current?.id === node.id
        const isCollapsed = !!node.state?.collapsed
        const _dim =
          !!selectedNode?.current &&
          !subGraph?.current.nodes.some(n => n.id === node.id)
        const fill = _dim
          ? color(dim(0.075, isLight))()
          : isCollapsed
            ? color(dim(0.15, isLight))()
            : isHovered
              ? color(dim(0.4))()
              : color()
        const stroke = colorContrast()
        const size = isSelected ? 10 : 5

        if (node.id === rootId) {
          const _size = size * 2
          circle(context, x, y, size, {
            stroke: false,
            strokeStyle: stroke,
            lineWidth: isSelected ? 1 : 0.2,
            fill: true,
            fillStyle: color(dim(0.15, isLight))(),
          })
          if (rootImages?.current) {
            const _idx = Math.min(
              isLight ? 0 : 1,
              rootImages.current.length - 1
            )
            const _img = rootImages.current[_idx]
            const _imgSize = _size * 0.55
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
            circle(context, x, y, size, {
              stroke: true,
              strokeStyle: stroke,
              lineWidth: isSelected ? 1 : 0.2,
              fill: true,
              fillStyle: fill,
            })
          } else {
            rect(context, x - size / 2, y - size / 2, size, size, {
              stroke: true,
              strokeStyle: stroke,
              lineWidth: isSelected ? 1 : 0.2,
              fill: true,
              fillStyle: fill,
              borderRadius: 1,
            })
            if (node.state?.image) {
              const _size = size - 1
              img(
                context,
                node.state?.image,
                x - _size / 2,
                y - _size / 2,
                _size,
                _size,
                1,
                _dim ? 0.1 : 1
              )
            }
          }
        }
      })
      context.restore()
      context.restore()
    },
    [
      width,
      height,
      nodes,
      links,
      selectedNode,
      hoveredNode,
      color,
      colorContrast,
      rootId,
      theme,
    ]
  )

  return {
    draw,
  }
}
