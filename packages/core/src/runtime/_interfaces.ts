import { EventEmitter } from "@fxhash/utils"
import {
  RuntimeDefinition,
  RuntimeState,
  RuntimeWholeState,
  TUpdateStateFn,
  TUpdateableState,
} from "./_types.js"
import { FxParamDefinitions, FxParamsData } from "@fxhash/params"

export type RuntimeContextEventsTypemap = {
  "context-changed": RuntimeContext
}

export class RuntimeContextEventEmitter extends EventEmitter<RuntimeContextEventsTypemap> {}

export type RuntimeControllerEventsTypemap = {
  "runtime-changed": RuntimeContext
  "controls-changed": RuntimeControls
}

export class RuntimeControllerEventEmitter extends EventEmitter<RuntimeControllerEventsTypemap> {}

export type RuntimeControlsEventsTypemap = {
  "controls-changed": RuntimeControls
}

export class RuntimeControlsEventEmitter extends EventEmitter<RuntimeControlsEventsTypemap> {}

export interface RuntimeController {
  runtime: RuntimeContext
  controls: RuntimeControls
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

export interface ControlState {
  params: {
    definition: FxParamDefinitions | null
    values: FxParamsData
  }
}

export interface RuntimeControls {
  state: ControlState
  update: (
    update: Partial<FxParamsData>,
    definition?: FxParamDefinitions | null
  ) => RuntimeControls
  emitter: RuntimeControlsEventEmitter
  getInputBytes: () => string | null
}

export interface RuntimeContext {
  // the base state of the runtime
  state: TUpdateableState<RuntimeState, RuntimeContext>
  // definitions, used to manipulate the state
  definition: TUpdateableState<RuntimeDefinition, RuntimeContext>
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
  update: TUpdateStateFn<RuntimeWholeState, RuntimeContext>
  emitter: RuntimeContextEventEmitter
}
