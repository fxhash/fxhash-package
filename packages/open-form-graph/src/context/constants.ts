import { GraphConfig } from "@/_interfaces"

export const VOID_ROOT_ID = "void-root"
export const VOID_DETACH_ID = "void-detach"
export const VOID_EMIT_ID = "void-emit"
export const VOID_GROUP_ID = "void-group"

export const DEFAULT_GRAPH_CONFIG: GraphConfig = {
  debug: false,
  nodeSize: 30,
  minClusterSize: 10,
  maxClusterSize: 20,
  minZoom: 0.1,
  maxZoom: 10,
  theme: {
    light: [255, 255, 255],
    dark: [0, 0, 0],
  },
}
