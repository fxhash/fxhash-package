import { FxParamDefinitions, FxParamsData } from "@fxhash/params"
import { IRuntimeControls, RuntimeControlsEventEmitter } from "./_interfaces.js"
import { serializeParamsOrNull } from "@fxhash/params"
import { mergeWithKeepingUint8ArrayType } from "./utils.js"
import { ControlState } from "./_types.js"
import cloneDeep from "lodash.clonedeep"

const DEFAULT_CONTROL_STATE: ControlState = Object.freeze({
  params: {
    definition: null,
    values: {},
  },
})
/**
 * The runtime controls hold the state of the fx(params).
 * @param initial - initial state of the controls
 * @returns RuntimeControls - Which exoses the state, update method and an event emitter
 * @public
 */
export function runtimeControls(
  initial: ControlState = DEFAULT_CONTROL_STATE
): IRuntimeControls {
  const emitter = new RuntimeControlsEventEmitter()
  let _controls: ControlState = initial
  return {
    state: () => _controls,
    update(
      update: Partial<FxParamsData>,
      definition?: FxParamDefinitions | null
    ) {
      _controls = mergeWithKeepingUint8ArrayType(cloneDeep(_controls), {
        params: {
          values: update,
          definition: definition || _controls.params.definition,
        },
      })
      emitter.emit("controls-changed", _controls)
      return _controls
    },
    emitter,
    getInputBytes() {
      return serializeParamsOrNull(
        _controls.params.values || {},
        _controls.params.definition || []
      )
    },
  }
}
