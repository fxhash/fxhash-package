import { runtimeControls } from "@/index.js"
import {
  PARAMS_DEFINITION,
  PARAMS_VALUES_A,
  PARAMS_VALUES_B,
} from "./constants.js"
import { describe, expect, test, vitest } from "vitest"

describe("runtimeControls", () => {
  test("initializes with default state when no initial state provided", () => {
    const controls = runtimeControls()
    expect(controls.state()).toEqual({
      params: {
        definition: null,
        values: {},
      },
    })
  })

  test("initializes with provided initial state", () => {
    const initialState = {
      params: {
        definition: PARAMS_DEFINITION,
        values: PARAMS_VALUES_A,
      },
    }
    const controls = runtimeControls(initialState)
    expect(controls.state()).toEqual(initialState)
  })

  test("update function updates values correctly", () => {
    const initialState = {
      params: {
        definition: PARAMS_DEFINITION,
        values: PARAMS_VALUES_A,
      },
    }
    const controls = runtimeControls(initialState)
    const update = controls.update(PARAMS_VALUES_B)
    expect(update.state.params.values).toEqual(PARAMS_VALUES_B)
    expect(controls.state().params.values).toEqual(PARAMS_VALUES_B)
  })

  test("update function updates definition correctly", () => {
    const controls = runtimeControls()
    const update = controls.update({}, PARAMS_DEFINITION)
    expect(update.state.params.definition).toEqual(PARAMS_DEFINITION)
    expect(controls.state().params.definition).toEqual(PARAMS_DEFINITION)
  })

  test("update function merges new values with existing ones", () => {
    const initialState = {
      params: {
        definition: PARAMS_DEFINITION,
        values: PARAMS_VALUES_A,
      },
    }
    const controls = runtimeControls(initialState)
    const updatedControls = controls.update({ string: PARAMS_VALUES_B.string })
    expect(updatedControls.state.params.values).toEqual({
      ...PARAMS_VALUES_A,
      string: PARAMS_VALUES_B.string,
    })
    expect(controls.state().params.values).toEqual({
      ...PARAMS_VALUES_A,
      string: PARAMS_VALUES_B.string,
    })
  })

  test("emits event on update", () => {
    const initialState = {
      params: {
        definition: PARAMS_DEFINITION,
        values: PARAMS_VALUES_A,
      },
    }
    const controls = runtimeControls(initialState)
    const mockFn = vitest.fn()
    controls.emitter.on("controls-changed", mockFn)
    controls.update(PARAMS_VALUES_B)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test("cannot update param without definition", () => {
    const controls = runtimeControls()
    expect(() => controls.update({ string: "value" })).toThrowError()
  })

  test("getInputBytes returns null when definition is null", () => {
    const controls = runtimeControls()
    expect(controls.getInputBytes()).toBeNull()
  })

  test("getInputBytes returns serialized params when definition exists", () => {
    const initialState = {
      params: {
        definition: PARAMS_DEFINITION,
        values: PARAMS_VALUES_A,
      },
    }
    const controls = runtimeControls(initialState)
    expect(controls.getInputBytes()).not.toBeNull()
  })

  test("update preserves unmodified properties", () => {
    const initialState = {
      params: {
        definition: PARAMS_DEFINITION,
        values: PARAMS_VALUES_A,
      },
    }
    const controls = runtimeControls(initialState)
    const update = controls.update(PARAMS_VALUES_B)
    expect(update.state.params.values.string).toBe(PARAMS_VALUES_B.string)
    expect(update.state.params.definition).toEqual(
      initialState.params.definition
    )
  })
})
