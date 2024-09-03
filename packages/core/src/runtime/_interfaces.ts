import { EventEmitter } from "@fxhash/utils"
import { ControlState, RuntimeContext, RuntimeControls } from "./_types.js"

export type RuntimeContextEventsTypemap = {
  "context-changed": RuntimeContext
}

export class RuntimeContextEventEmitter extends EventEmitter<RuntimeContextEventsTypemap> {}

export type RuntimeControllerEventsTypemap = {
  "runtime-changed": RuntimeContext
  "controls-changed": ControlState
}

export class RuntimeControllerEventEmitter extends EventEmitter<RuntimeControllerEventsTypemap> {}

export type RuntimeControlsEventsTypemap = {
  "controls-changed": RuntimeControls
}

export class RuntimeControlsEventEmitter extends EventEmitter<RuntimeControlsEventsTypemap> {}
