import { GraphConfig } from "@/_interfaces"

export const VOID_ROOT_ID = "void-root"

export const DEFAULT_GRAPH_CONFIG: GraphConfig = {
  debug: false,
  nodeSize: 15,
  minClusterSize: 5,
  maxClusterSize: 15,
  minZoom: 0.1,
  maxZoom: 10,
  focusPadding: 200,
  minDagLevelDistance: 80,
  maxDagLevelDistance: 400,
  theme: {
    light: [255, 255, 255],
    dark: [0, 0, 0],
  },
}
