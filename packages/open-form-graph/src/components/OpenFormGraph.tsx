import ForceGraph2D from "react-force-graph-2d"
import { useEffect, useRef } from "react"
import { forceCollide } from "d3-force"
import { useGraphLinks } from "@/hooks/useGraphLinks"
import { useGraphNodes } from "@/hooks/useGraphNodes"
import { NODE_SIZE, MIN_CLUSTER_SIZE, MAX_CLUSTER_SIZE, MIN_ZOOM, MAX_ZOOM } from "@/constants"
import { useGraphDataContext } from "@/context/graph"
import { normalize } from "@/util/math"
import { Node } from "@/_types"

interface ProjectGraphProps {
  width: number
  height: number
}

export function OpenFormGraph(props: ProjectGraphProps) {
  const { width, height } = props

  const graphData = useGraphDataContext()

  const { renderNode } = useGraphNodes()
  const links = useGraphLinks()
  useEffect(() => {
    if (!graphData.ref.current) return
    graphData.ref.current.d3Force(
      "collision",
      forceCollide()
        .strength(0.3)
        .radius(node => {
          const n = node as Node
          if (!n.collapsed && graphData.hasNodeChildren(n.id)) return NODE_SIZE * 2
          if (!n.collapsed || n.id === graphData.rootId) return NODE_SIZE * 0.75
          return normalize(
            n.clusterSize,
            graphData.clusterSizeRange[0],
            graphData.clusterSizeRange[1],
            MIN_CLUSTER_SIZE,
            MAX_CLUSTER_SIZE / 2
          )
        })
    )

    //    graphData.ref.current.d3Force("charge")?.distanceMax(200)
    graphData.ref.current.d3Force("center", null)
    graphData.ref.current.d3Force("link")?.distance((l: any) => {
      if (!l.target.collapsed) return NODE_SIZE
      return NODE_SIZE * 2
    })
  }, [graphData.ref])
  const reheated = useRef<boolean>(false)

  return (
    <ForceGraph2D
      ref={graphData.ref}
      width={width}
      height={height}
      graphData={graphData.data}
      dagMode="radialout"
      onDagError={err => {
        console.error("dag error", err)
      }}
      d3VelocityDecay={graphData.layoutConfig.velocityDecay}
      d3AlphaDecay={graphData.layoutConfig.alphaDecay}
      d3AlphaMin={graphData.layoutConfig.alphaMin}
      dagLevelDistance={graphData.layoutConfig.dagLevelDistance}
      cooldownTicks={4000}
      onEngineStop={() => {
        graphData.ref.current?.zoomToFit(
          400,
          graphData.layoutConfig.dagLevelDistance,
          node =>
            graphData.selectedNode ?
              graphData.highlights.nodes.findIndex(n => n.id === node.id) > -1 :
              true
        )
      }}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      nodeRelSize={4}
      enableNodeDrag={false}
      onBackgroundClick={() => {
        if (graphData.selectedNode) {
          graphData.setSelectedNode(null)
          graphData.ref.current?.zoomToFit(
            400,
            20,
          )
        }
      }}
      onNodeClick={graphData.onClickNode}
      onNodeDrag={() => {
        if (!reheated.current) {
          graphData.ref.current?.d3ReheatSimulation()
          reheated.current = true
        }
      }}
      onNodeDragEnd={() => {
        reheated.current = false
      }}
      nodeCanvasObject={renderNode}
      {...links}
    />
  )
}
