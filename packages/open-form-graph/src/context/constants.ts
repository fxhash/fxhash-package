import { GraphConfig } from "@/_interfaces"

export const VOID_ROOT_ID = "void-root"
export const VOID_DETACH_ID = "void-detach"

export const DEFAULT_GRAPH_CONFIG: GraphConfig = {
  debug: false,
  nodeSize: 20,
  minClusterSize: 10,
  maxClusterSize: 20,
  minZoom: 0.1,
  maxZoom: 10,
  theme: {
    light: [255, 255, 255],
    dark: [0, 0, 0],
  },
}
