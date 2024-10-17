import { IRuntimeContext, RuntimeParams, runtimeContext } from "@/index.js"
import {
  BYTE_VALUE_B,
  PARAMS_DEFINITION,
  PARAMS_VALUES_A,
  RUNTIME_STATE,
  RUNTIME_STATE_B,
  SNIPPET_VERSION,
} from "./constants.js"

const INITIAL: RuntimeParams = {
  state: RUNTIME_STATE,
  definition: {
    version: SNIPPET_VERSION,
    params: PARAMS_DEFINITION,
  },
}

const INITIAL_B: RuntimeParams = {
  state: RUNTIME_STATE_B,
  definition: {
    version: SNIPPET_VERSION,
    params: PARAMS_DEFINITION,
  },
}

describe("runtimeContext", () => {
  let context: IRuntimeContext

  beforeEach(() => {
    context = runtimeContext(INITIAL)
  })

  test("initializes with correct values", () => {
    const state = context.state()
    const definition = context.definition()
    expect(state.minter).toBe(RUNTIME_STATE.minter)
    expect(state.iteration).toBe(RUNTIME_STATE.iteration)
    expect(state.chain).toBe(RUNTIME_STATE.chain)
    expect(definition.version).toBe(SNIPPET_VERSION)
  })

  test("updates state correctly", () => {
    const update = context.updateState({ iteration: 3 })
    expect(update.state.iteration).toBe(3)
    expect(update.state.minter).toBe(RUNTIME_STATE.minter)
  })

  test("updates definition correctly", () => {
    const update = context.updateDefinition({ version: "2.0" })
    expect(update.definition.version).toBe("2.0")
  })
})

describe("hash generation", () => {
  test("generates consistent hashes for identical states", () => {
    const context1 = runtimeContext(INITIAL)
    const context2 = runtimeContext(INITIAL)

    expect(context1.details().stateHash.soft).toBe(
      context2.details().stateHash.soft
    )
    expect(context1.details().stateHash.hard).toBe(
      context2.details().stateHash.hard
    )
  })

  test("generates different hashes for different states", () => {
    const context1 = runtimeContext(INITIAL)
    const context2 = runtimeContext(INITIAL_B)

    expect(context1.details().stateHash.soft).not.toBe(
      context2.details().stateHash.soft
    )
    expect(context1.details().stateHash.hard).not.toBe(
      context2.details().stateHash.hard
    )
  })

  test("only updates soft hash when code-driven param changes", () => {
    const context = runtimeContext(INITIAL)
    const softHash1 = context.details().stateHash.soft
    const hardHash1 = context.details().stateHash.hard
    context.updateState({ params: { bytes: BYTE_VALUE_B } })
    const softHash2 = context.details().stateHash.soft
    const hardHash2 = context.details().stateHash.hard
    expect(softHash1).not.toBe(softHash2)
    expect(hardHash1).toBe(hardHash2)
  })
})

describe("param serialization", () => {
  test("correctly serializes params", () => {
    const context = runtimeContext({
      state: { params: PARAMS_VALUES_A },
      definition: {
        params: PARAMS_DEFINITION,
      },
    })

    expect(context.details().params.inputBytes).toBeTruthy()
    expect(context.details().params.bytesSize).toBeGreaterThan(0)
  })

  test("handles null params correctly", () => {
    const context = runtimeContext({
      state: { params: undefined },
      definition: { params: null },
    })

    expect(context.details().params.inputBytes).toBeNull()
    expect(context.details().params.bytesSize).toBe(0)
  })
})

describe("event emission", () => {
  test("emits event after state update", () => {
    const context = runtimeContext({})
    const mockFn = vi.fn()
    context.emitter.on("context-changed", mockFn)

    context.updateState({ iteration: 2 })

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        state: expect.objectContaining({ iteration: 2 }),
      })
    )
  })
})
