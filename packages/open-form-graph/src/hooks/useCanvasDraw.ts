import { MutableRefObject, useCallback } from "react"
import { Transform } from "./useTransform"
import { circle, img, rect } from "@/util/canvas"
import { dim } from "@/util/color"
import { useColor } from "./useColor"
import { useOpenFormGraph } from "@/provider"
import { scaleLog } from "d3-scale"
import { SimNode, SimLink } from "@/_types"
import { isSimNode } from "@/util/types"
import { getNodeId } from "@/util/graph"

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
  getNodeSize?: (nodeId: string) => number
  clusterSizeRange: MutableRefObject<[number, number]>
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
    getNodeSize = () => 10,
    clusterSizeRange,
  } = props
  const { theme, hideThumbnails } = useOpenFormGraph()
  const { color, colorContrast } = useColor()
  const draw = useCallback(
    (context: CanvasRenderingContext2D, transform: Transform) => {
      const visiblityScale = scaleLog()
        .domain(clusterSizeRange.current)
        .range([3, 1.5])
        .clamp(true)

      const dpi = devicePixelRatio || 1
      context.save()
      context.scale(dpi, dpi)
      context.clearRect(0, 0, width, height)
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
          : color(dim(0.18, isLight))()
        context.globalAlpha = 0.5
        context.strokeStyle = stroke
        context.lineWidth = _dim ? 0.3 : 0.8
        context.beginPath()
        const sx = (isSimNode(l.source) && l.source.x) || 0
        const sy = (isSimNode(l.source) && l.source.y) || 0
        context.moveTo(sx, sy)
        const tx = (isSimNode(l.target) && l.target.x) || 0
        const ty = (isSimNode(l.target) && l.target.y) || 0
        context.lineTo(tx, ty)
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
            ? color(dim(0.18, isLight))()
            : isHovered
              ? color(dim(0.4, isLight))()
              : color()
        const stroke = colorContrast()
        const size = getNodeSize(node.id)
        if (node.id === rootId) {
          circle(context, x, y, size / 2, {
            stroke: false,
            strokeStyle: stroke,
            lineWidth: isSelected ? 1 : 0.2,
            fill: true,
            fillStyle: color(dim(0.18, isLight))(),
          })
          if (rootImages?.current) {
            const _idx = Math.min(
              isLight ? 0 : 1,
              rootImages.current.length - 1
            )
            const _img = rootImages.current[_idx]
            const _imgSize = size * 0.55
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
            circle(context, x, y, size / 2, {
              stroke: true,
              strokeStyle: stroke,
              lineWidth: isSelected ? 1 : 0.2,
              fill: true,
              fillStyle: fill,
            })
            const showLabel =
              transform.scale >= visiblityScale(node.clusterSize || 1) ? 1 : 0

            if (showLabel) {
              context.font = `${14 / transform.scale}px Sans-Serif`
              context.textAlign = "center"
              context.textBaseline = "middle"
              context.fillStyle = color(dim(_dim ? 0.2 : 0.5, isLight))()
              context.fillText((node.clusterSize || 1).toString(), x, y)
            }
          } else {
            rect(context, x - size / 2, y - size / 2, size, size, {
              stroke: true,
              strokeStyle: stroke,
              lineWidth: isSelected ? 0.3 : 0.2,
              fill: true,
              fillStyle: fill,
              borderRadius: 1,
            })
            if (node.state?.image && !hideThumbnails) {
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
      getNodeSize,
      hideThumbnails,
    ]
  )

  return {
    draw,
  }
}
