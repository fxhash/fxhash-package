import { FxParamDefinition, FxParamType, FxParamsData } from "@fxhash/params"
import { ControlState, RuntimeControls } from "./_types.js"
import { cloneDeep, merge } from "lodash"
import { RuntimeControlsEventEmitter } from "./_interfaces.js"

const DEFAULT_CONTROL_STATE: ControlState = {
  params: {
    definition: null,
    values: {},
  },
}
export function runtimeControls(
  initial: ControlState = DEFAULT_CONTROL_STATE
): RuntimeControls {
  const emitter = new RuntimeControlsEventEmitter()
  let _controls: ControlState = initial

  function setValues(update: Partial<FxParamsData>) {
    _controls = merge(cloneDeep(_controls), {
      params: {
        values: update,
      },
    })
    const res = getRuntimeControl()
    emitter.emit("controls-changed", res)
    return res
  }

  function setDefinition(
    definition: FxParamDefinition<FxParamType>[] | null,
    values: FxParamsData | Record<string, never>
  ) {
    _controls = {
      ..._controls,
      params: {
        definition,
        values,
      },
    }
    const res = getRuntimeControl()
    emitter.emit("controls-changed", res)
    return res
  }

  function getRuntimeControl(): RuntimeControls {
    return {
      state: _controls,
      setValues,
      setDefinition,
      emitter,
    }
  }

  return getRuntimeControl()
}
