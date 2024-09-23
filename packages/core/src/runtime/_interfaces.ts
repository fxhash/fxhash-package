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

/**
 * An interface for the runtime controller.
 * The runtime controller is responsible for managing the runtime context and controls.
 * It is the main interface for interacting with the runtime.
 */
export interface IRuntimeController {
  /**
   * Holds a reference to the current runtime context.
   */
  runtime: IRuntimeContext

  /**
   * Holds a reference to the current fx(params) runtime controls.
   */
  controls: IRuntimeControls

  /**
   * Initializes the runtime controller.
   * @param iframe - The iframe element to use for the runtime.
   */
  init: (iframe: HTMLIFrameElement) => void

  /**
   * Remove event listeners, free up memory, etc.
   * Should be called when the runtime controller is disposed
   */
  release: () => void

  /**
   * Restarts the runtime controller with its current state.
   * This is particularly useful when the iframe element is
   * being added to the DOM dynamically
   * @param iframe - The iframe element to use for the runtime.
   */
  restart: (iframe: HTMLIFrameElement) => void

  /**
   * Gets the current URL of the runtime.
   */
  getUrl: () => string

  /**
   * Sets the URL of the runtime.
   */
  hardSync: () => void

  /**
   * Updates the fx(params) runtime controls.
   * @param update - The data to apply
   * @param forceRefresh - Whether to force a refresh of the runtime context
   */
  updateControls: (
    update: Partial<FxParamsData>,
    forceRefresh?: boolean
  ) => void

  /**
   * Reference to the runtime controller event emitter which broadcasts events
   * when the runtime controller changes.
   */
  emitter: RuntimeControllerEventEmitter
}
export type RuntimeControllerEventsTypemap = {
  "runtime-changed": IRuntimeContext
  "controls-changed": IRuntimeControls
}
export class RuntimeControllerEventEmitter extends EventEmitter<RuntimeControllerEventsTypemap> {}

/**
 * An interface for the fx(params) runtime controls.
 * The runtime controls hold the state of the fx(params). The state is used
 * to display the current state of the fx(params) in the UI.
 */
export interface IRuntimeControls {
  /**
   * Reference to the runtime controls event emitter which broadcasts events
   * when the runtime controls change.
   */
  emitter: RuntimeControlsEventEmitter

  /**
   * The current state of the runtime controls.
   * This includes the current values of the fx(params) and the definition.
   */
  state: ControlState

  /**
   * Updates the runtime controls with new data.
   * @param update - The data to apply
   * @param definition - The definition to apply
   * @returns The updated runtime controls
   */
  update: (
    update: Partial<FxParamsData>,
    definition?: FxParamDefinitions | null
  ) => IRuntimeControls

  /**
   * Gets the input bytes of the runtime controls.
   * @returns The input bytes of the runtime controls
   * or null if there is no data
   */
  getInputBytes: () => string | null
}
export type RuntimeControlsEventsTypemap = {
  "controls-changed": IRuntimeControls
}
export class RuntimeControlsEventEmitter extends EventEmitter<RuntimeControlsEventsTypemap> {}

/**
 * An interface for the runtime context.
 * The runtime context holds the whole state of the current runtime.
 * This includes the state of the project, the fx(params) definition
 * and extra details that are derived from the state and definition.
 */
export interface IRuntimeContext {
  /**
   * The state of the project.
   */
  state: TUpdateableState<RuntimeState, IRuntimeContext>

  /**
   * The definition of the fx(params).
   */
  definition: TUpdateableState<RuntimeDefinition, IRuntimeContext>

  /**
   * Extra details that are derived from the state and definition.
   * This includes the inputbytes of the fx(params), aswell as a soft and hard
   * hash of the state and definition.
   */
  details: {
    params: {
      /**
       * The input bytes of the fx(params)
       * or null if there is no data
       */
      inputBytes: string | null
      /**
       * The size of the input bytes. Will be 0 if there is fx(params) data.
       */
      bytesSize: number
    }
    stateHash: {
      /**
       * hash of the whole state as it is
       */
      soft: string
      /**
       * hash of the hard-refresh properties of the state
       * it excludes all fx(params) that are not in update mode "page-reload"
       */
      hard: string
    }
    definitionHash: {
      /**
       * hash of the current state of the fx(params)
       */
      params: string
    }
  }
  /**
   * Updates the runtime context with new data.
   * @param data - The data to apply
   * @returns The updated runtime context
   */
  update: TUpdateStateFn<RuntimeWholeState, IRuntimeContext>
  emitter: RuntimeContextEventEmitter
}
export type RuntimeContextEventsTypemap = {
  "context-changed": IRuntimeContext
}
export class RuntimeContextEventEmitter extends EventEmitter<RuntimeContextEventsTypemap> {}
