import ForceGraph2D from "react-force-graph-2d"
import { useEffect, useRef } from "react"
import { forceCollide } from "d3-force"
import { useGraphLinks } from "@/hooks/useGraphLinks"
import { useGraphNodes } from "@/hooks/useGraphNodes"
import { useOpenFormGraph } from "@/context/graph"
import { Node } from "@/_types"

interface ProjectGraphProps {
  width: number
  height: number
  onClickNode?: (nodeId: string) => void
}

export function OpenFormGraph(props: ProjectGraphProps) {
  const { width, height } = props

  const {
    ref,
    hasNodeChildren,
    rootId,
    config,
    clusterSizeRange,
    data,
    layoutConfig,
    selectedNode,
    highlights,
    onClickNode,
    getNodeSize,
    getNodeForce,
  } = useOpenFormGraph()

  const { renderNode, nodePointerAreaPaint } = useGraphNodes()
  const links = useGraphLinks()
  useEffect(() => {
    if (!ref.current) return
    ref.current.d3Force(
      "collision",
      forceCollide()
        .strength(0.3)
        .radius(node => {
          return getNodeForce((node as Node).id)
        })
    )

    ref.current.d3Force("center", null)
    ref.current.d3Force("link")?.distance((l: any) => {
      if (!l.target.collapsed) return config.nodeSize
      return config.nodeSize * 2
    })
  }, [ref, config, hasNodeChildren, clusterSizeRange, rootId, getNodeForce])
  const reheated = useRef<boolean>(false)

  // stupid fix for cursor pointer when using onBackgroundClick
  // https://github.com/vasturiano/3d-force-graph/issues/476
  function resetBackgroundCursor(obj: any) {
    const container = document.querySelector(".force-graph-container")
    if (container) {
      const canvas = container.querySelector("canvas")
      if (canvas) {
        if (!obj) {
          canvas.style.setProperty("cursor", "default", "important")
        } else {
          canvas.style.removeProperty("cursor")
        }
      }
    }
  }

  return (
    <ForceGraph2D
      ref={ref as any}
      width={width}
      height={height}
      graphData={data}
      dagMode="radialout"
      onDagError={err => {
        console.error("dag error", err)
      }}
      d3VelocityDecay={layoutConfig.velocityDecay}
      d3AlphaDecay={layoutConfig.alphaDecay}
      d3AlphaMin={layoutConfig.alphaMin}
      dagLevelDistance={layoutConfig.dagLevelDistance}
      cooldownTicks={4000}
      /*
      onNodeDragEndEngineStop={() => {
        ref.current?.zoomToFit(400, config.focusPadding, node =>
          selectedNode
            ? highlights.nodes.findIndex(n => n.id === node.id) > -1
            : true
        )
      }}
      */
      minZoom={config.minZoom}
      maxZoom={config.maxZoom}
      nodeRelSize={2}
      enableNodeDrag={false}
      dagNodeFilter={node =>
        !selectedNode
          ? true
          : highlights.nodes.findIndex(n => n.id === node.id) > -1
      }
      onBackgroundClick={() => {
        if (selectedNode) {
          onClickNode(rootId)
        }
      }}
      onNodeClick={n => onClickNode(n.id)}
      onNodeDrag={() => {
        if (!reheated.current) {
          ref.current?.d3ReheatSimulation()
          reheated.current = true
        }
      }}
      onNodeDragEnd={() => {
        reheated.current = false
      }}
      nodeVal={node => {
        const n = node as Node
        return getNodeSize(n.id)
      }}
      nodeCanvasObject={renderNode}
      nodePointerAreaPaint={nodePointerAreaPaint}
      onNodeHover={node => {
        resetBackgroundCursor(node)
      }}
      {...links}
    />
  )
}
