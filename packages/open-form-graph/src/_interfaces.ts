export interface GraphConfig {
  debug: false
  nodeSize: number
  minClusterSize: number
  maxClusterSize: number
  minZoom: number
  maxZoom: number
  theme: {
    dark: [number, number, number]
    light: [number, number, number]
  }
}
