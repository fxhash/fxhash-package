import { EventEmitter } from "@fxhash/utils"
import {
  ControlState,
  RuntimeDefinition,
  RuntimeState,
  RuntimeWholeState,
  TUpdateStateFn,
  TUpdateableState,
} from "./_types.js"
import { FxParamDefinitions, FxParamsData } from "@fxhash/params"

export type RuntimeContextEventsTypemap = {
  "context-changed": IRuntimeContext
}
export class RuntimeContextEventEmitter extends EventEmitter<RuntimeContextEventsTypemap> {}

export type RuntimeControllerEventsTypemap = {
  "runtime-changed": IRuntimeContext
  "controls-changed": IRuntimeControls
}
export class RuntimeControllerEventEmitter extends EventEmitter<RuntimeControllerEventsTypemap> {}

export type RuntimeControlsEventsTypemap = {
  "controls-changed": IRuntimeControls
}
export class RuntimeControlsEventEmitter extends EventEmitter<RuntimeControlsEventsTypemap> {}

export interface IRuntimeController {
  runtime: IRuntimeContext
  controls: IRuntimeControls
  init: (iframe: HTMLIFrameElement) => void
  release: () => void
  restart: (iframe: HTMLIFrameElement) => void
  getUrl: () => string
  hardSync: () => void
  updateControls: (
    update: Partial<FxParamsData>,
    forceRefresh?: boolean
  ) => void
  emitter: RuntimeControllerEventEmitter
}

export interface IRuntimeControls {
  state: ControlState
  update: (
    update: Partial<FxParamsData>,
    definition?: FxParamDefinitions | null
  ) => IRuntimeControls
  emitter: RuntimeControlsEventEmitter
  getInputBytes: () => string | null
}

export interface IRuntimeContext {
  // the base state of the runtime
  state: TUpdateableState<RuntimeState, IRuntimeContext>
  // definitions, used to manipulate the state
  definition: TUpdateableState<RuntimeDefinition, IRuntimeContext>
  // extra details derived from the state & definition
  details: {
    params: {
      inputBytes: string | null
      bytesSize: number
    }
    stateHash: {
      soft: string
      hard: string
    }
    definitionHash: {
      params: string
    }
  }
  // whole-state update function, should be used to prevent side-effects
  update: TUpdateStateFn<RuntimeWholeState, IRuntimeContext>
  emitter: RuntimeContextEventEmitter
}
