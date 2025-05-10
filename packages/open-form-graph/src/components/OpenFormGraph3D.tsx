
import ForceGraph3D from "react-force-graph-3d"
import { useEffect, useRef } from "react"
import { forceCollide } from "d3-force"
import { useGraphLinks } from "@/hooks/useGraphLinks"
import { useOpenFormGraph } from "@/context/graph"
import { Node } from "@/_types"
import { useColor } from "@/hooks/useColor"
import { useGraphNodesThree } from "@/hooks/useGraphNodesThree"

interface ProjectGraphProps {
  width: number
  height: number
}

export function OpenFormGraph3D(props: ProjectGraphProps) {
  const { width, height } = props

  const {
    ref,
    theme,
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

  const nodes = useGraphNodesThree()
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

    //    graphData.ref.current.d3Force("charge")?.distanceMax(200)
    ref.current.d3Force("center", null)
    ref.current.d3Force("link")?.distance((l: any) => {
      if (!l.target.collapsed) return config.nodeSize
      return config.nodeSize * 2
    })
  }, [ref, config, hasNodeChildren, clusterSizeRange, rootId, getNodeForce])
  const reheated = useRef<boolean>(false)
  const { color, colorContrast } = useColor()

  return (
    <ForceGraph3D
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
      onEngineStop={() => {
        ref.current?.zoomToFit(400, layoutConfig.dagLevelDistance, node =>
          selectedNode
            ? highlights.nodes.findIndex(n => n.id === node.id) > -1
            : true
        )
      }}
      //      minZoom={config.minZoom}
      //      maxZoom={config.maxZoom}
      nodeRelSize={2}
      enableNodeDrag={false}
      /*
      onBackgroundClick={() => {
        if (selectedNode) {
          setSelectedNode(null)
          ref.current?.zoomToFit(
            400,
            20,
          )
        }
      }}
      */
      numDimensions={2}
      backgroundColor={theme === "dark" ? "#000" : "#fff"}
      onNodeClick={onClickNode}
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
      {...nodes}
      {...links}
    />
  )
}
