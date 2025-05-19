import { GraphConfig, LayoutConfig } from "@/_interfaces"

export const VOID_ROOT_ID = "void-root"

export const DEFAULT_GRAPH_CONFIG: GraphConfig = {
  debug: false,
  nodeSize: 15,
  minClusterSize: 10,
  maxClusterSize: 20,
  minZoom: 0.1,
  maxZoom: 10,
  focusPadding: 200,
  minDagLevelDistance: 20,
  maxDagLevelDistance: 100,
  theme: {
    light: [255, 255, 255],
    dark: [0, 0, 0],
  },
}

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  velocityDecay: 0.33,
  alphaDecay: 0.17,
  alphaMin: 0.00005,
  dagLevelDistance: 100,
}
