import { runtimeControls } from "@/index.js"
import {
  PARAMS_DEFINITION,
  PARAMS_VALUES_A,
  PARAMS_VALUES_B,
} from "./constants.js"

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
    const controls = runtimeControls()
    const update = controls.update({ newParam: 10 })
    expect(update.params.values).toEqual({ newParam: 10 })
    expect(controls.state().params.values).toEqual({ newParam: 10 })
  })

  test("update function updates definition correctly", () => {
    const controls = runtimeControls()
    const update = controls.update({}, PARAMS_DEFINITION)
    expect(update.params.definition).toEqual(PARAMS_DEFINITION)
    expect(controls.state().params.definition).toEqual(PARAMS_DEFINITION)
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
    expect(updatedControls.params.values).toEqual({
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
        params: expect.objectContaining({
          values: expect.objectContaining({ newParam: 10 }),
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

  test("update preserves unmodified properties", () => {
    const initialState = {
      params: {
        definition: PARAMS_DEFINITION,
        values: PARAMS_VALUES_A,
      },
    }
    const controls = runtimeControls(initialState)
    const update = controls.update(PARAMS_VALUES_B)
    expect(update.params.values.string).toBe(PARAMS_VALUES_B.string)
    expect(update.params.definition).toEqual(initialState.params.definition)
  })
})
