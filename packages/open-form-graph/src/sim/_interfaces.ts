import { EventEmitter } from "@fxhash/utils"
import { HighlightStyle, Transform } from "./_types"
import {
  RawGraphData,
  RootNodeImageSources,
  SimNode,
  ThemeMode,
} from "@/_types"
import { GraphConfig } from "@/_interfaces"
import { TransformCanvas } from "./TransformCanvas"

export interface IOpenGraphSimulation {
  width: number
  height: number
  config: GraphConfig
  rootImageSources: RootNodeImageSources
  canvas: HTMLCanvasElement
  theme: ThemeMode
  emitter: OpenGraphEventEmitter
  selectedNode: SimNode | null
  hoveredNode: SimNode | null
  highlights: HighlightStyle[]
  transformCanvas: TransformCanvas

  initialize(data: RawGraphData, rootId: string): void
  restart(): void
  resize(width: number, height: number): void
  setTheme(theme: ThemeMode): void
  setHideThumbnails(hide: boolean): void
  setSelectedNode(node: SimNode | null): void
  setHighlights(highlights: HighlightStyle[]): void
  setNoInteraction(noInteraction: boolean): void
  getNodeById(nodeId: string): SimNode | null
  getNodeScreenPosition(node: SimNode): { x: number; y: number }
  getNodeSize(nodeId: string): number
  destroy(): void
}

export type OpenGraphEventsTypemap = {
  "transform-changed": Transform
  "hovered-node-changed": SimNode | null
  "selected-node-changed": SimNode | null
  draw: IOpenGraphSimulation
}
export class OpenGraphEventEmitter extends EventEmitter<OpenGraphEventsTypemap> {}
