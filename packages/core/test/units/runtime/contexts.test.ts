import { RuntimeContext, RuntimeParams, runtimeContext } from "@/index.js"
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
  let context: RuntimeContext

  beforeEach(() => {
    context = runtimeContext(INITIAL)
  })

  test("initializes with correct values", () => {
    expect(context.state.minter).toBe(RUNTIME_STATE.minter)
    expect(context.state.iteration).toBe(RUNTIME_STATE.iteration)
    expect(context.state.chain).toBe(RUNTIME_STATE.chain)
    expect(context.definition.version).toBe(SNIPPET_VERSION)
  })

  test("updates state correctly", () => {
    const newContext = context.state.update({ iteration: 3 })
    expect(newContext.state.iteration).toBe(3)
    expect(context.state.iteration).toBe(RUNTIME_STATE.iteration)
    expect(newContext.state.minter).toBe(RUNTIME_STATE.minter)
  })

  test("updates definition correctly", () => {
    const newContext = context.definition.update({ version: "2.0" })
    expect(newContext.definition.version).toBe("2.0")
  })
})

describe("hash generation", () => {
  test("generates consistent hashes for identical states", () => {
    const context1 = runtimeContext(INITIAL)
    const context2 = runtimeContext(INITIAL)

    expect(context1.details.stateHash.soft).toBe(
      context2.details.stateHash.soft
    )
    expect(context1.details.stateHash.hard).toBe(
      context2.details.stateHash.hard
    )
  })

  test("generates different hashes for different states", () => {
    const context1 = runtimeContext(INITIAL)
    const context2 = runtimeContext(INITIAL_B)

    expect(context1.details.stateHash.soft).not.toBe(
      context2.details.stateHash.soft
    )
    expect(context1.details.stateHash.hard).not.toBe(
      context2.details.stateHash.hard
    )
  })

  test("only updates soft hash when code-driven param changes", () => {
    const context1 = runtimeContext(INITIAL)
    const context2 = context1.state.update({ params: { bytes: BYTE_VALUE_B } })

    expect(context1.details.stateHash.soft).not.toBe(
      context2.details.stateHash.soft
    )
    expect(context1.details.stateHash.hard).toBe(
      context2.details.stateHash.hard
    )
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

    expect(context.details.params.inputBytes).toBeTruthy()
    expect(context.details.params.bytesSize).toBeGreaterThan(0)
  })

  test("handles null params correctly", () => {
    const context = runtimeContext({
      state: { params: undefined },
      definition: { params: null },
    })

    expect(context.details.params.inputBytes).toBeNull()
    expect(context.details.params.bytesSize).toBe(0)
  })
})

describe("immutability", () => {
  test("update returns new context without mutating original", () => {
    const originalContext = runtimeContext(INITIAL)

    const updatedContext = originalContext.state.update({ iteration: 2 })

    expect(originalContext.state.iteration).toBe(1)
    expect(updatedContext.state.iteration).toBe(2)
    expect(updatedContext).not.toBe(originalContext)
  })

  test("multiple updates produce distinct contexts", () => {
    const originalContext = runtimeContext(INITIAL)

    const updatedContext1 = originalContext.state.update({ iteration: 2 })
    const updatedContext2 = updatedContext1.state.update({ iteration: 3 })

    expect(originalContext.state.iteration).toBe(1)
    expect(updatedContext1.state.iteration).toBe(2)
    expect(updatedContext2.state.iteration).toBe(3)

    expect(originalContext).not.toBe(updatedContext1)
    expect(updatedContext1).not.toBe(updatedContext2)
  })
})

describe("event emission", () => {
  test("emits event after state update", () => {
    const context = runtimeContext({})
    const mockFn = vi.fn()
    context.emitter.on("context-changed", mockFn)

    context.state.update({ iteration: 2 })

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(
      expect.objectContaining({
        state: expect.objectContaining({ iteration: 2 }),
      })
    )
  })
})
