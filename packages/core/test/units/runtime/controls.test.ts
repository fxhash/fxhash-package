import { runtimeControls } from "@/index.js"
import {
  PARAMS_DEFINITION,
  PARAMS_VALUES_A,
  PARAMS_VALUES_B,
} from "./constants.js"

describe("runtimeControls", () => {
  test("initializes with default state when no initial state provided", () => {
    const controls = runtimeControls()
    expect(controls.state).toEqual({
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
    expect(controls.state).toEqual(initialState)
  })

  test("update function updates values correctly", () => {
    const controls = runtimeControls()
    const updatedControls = controls.update({ newParam: 10 })
    expect(updatedControls.state.params.values).toEqual({ newParam: 10 })
  })

  test("update function updates definition correctly", () => {
    const controls = runtimeControls()
    const updatedControls = controls.update({}, PARAMS_DEFINITION)
    expect(updatedControls.state.params.definition).toEqual(PARAMS_DEFINITION)
  })

  test("update function merges new values with existing ones", () => {
    const initialState = {
      params: {
        definition: null,
        values: { existingParam: 5 },
      },
    }
    const controls = runtimeControls(initialState)
    const updatedControls = controls.update({ newParam: 10 })
    expect(updatedControls.state.params.values).toEqual({
      existingParam: 5,
      newParam: 10,
    })
  })

  test("emits event on update", () => {
    const controls = runtimeControls()
    const mockFn = vi.fn()
    controls.emitter.on("controls-changed", mockFn)
    controls.update({ newParam: 10 })
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        state: expect.objectContaining({
          params: expect.objectContaining({
            values: expect.objectContaining({ newParam: 10 }),
          }),
        }),
      })
    )
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

  test("multiple updates produce new control instances", () => {
    const controls = runtimeControls()
    const updated1 = controls.update({ param1: 1 })
    const updated2 = updated1.update({ param2: 2 })

    expect(controls).not.toBe(updated1)
    expect(updated1).not.toBe(updated2)
    expect(updated2.state.params.values).toEqual({ param1: 1, param2: 2 })
  })

  test("update preserves unmodified properties", () => {
    const initialState = {
      params: {
        definition: PARAMS_DEFINITION,
        values: PARAMS_VALUES_A,
      },
    }
    const controls = runtimeControls(initialState)
    const updated = controls.update(PARAMS_VALUES_B)
    expect(updated.state.params.values.string).toBe(PARAMS_VALUES_B.string)
    expect(updated.state.params.definition).toEqual(
      initialState.params.definition
    )
  })
})
