import { FxParamDefinition, FxParamType, FxParamsData } from "@fxhash/params"
import { cloneDeep, merge } from "lodash"
import {
  ControlState,
  RuntimeControls,
  RuntimeControlsEventEmitter,
} from "./_interfaces.js"

const DEFAULT_CONTROL_STATE: ControlState = {
  params: {
    definition: null,
    values: {},
  },
}
/**
 * The runtime controls hold the state of the fx(params).
 * @param initial - initial state of the controls
 * @returns RuntimeControls - Which exoses the state, update method and an event emitter
 * @public
 */
export function runtimeControls(
  initial: ControlState = DEFAULT_CONTROL_STATE
): RuntimeControls {
  const emitter = new RuntimeControlsEventEmitter()
  let _controls: ControlState = initial

  function update(
    update: Partial<FxParamsData>,
    definition?: FxParamDefinition<FxParamType>[] | null
  ) {
    _controls = merge(cloneDeep(_controls), {
      params: {
        values: update,
        definition: definition || _controls.params.definition,
      },
    })
    const res = getRuntimeControl()
    emitter.emit("controls-changed", res)
    return res
  }

  function getRuntimeControl(): RuntimeControls {
    return {
      state: _controls,
      update,
      emitter,
    }
  }

  return getRuntimeControl()
}
