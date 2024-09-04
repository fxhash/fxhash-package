import { merge, cloneDeep } from "lodash"
import sha1 from "sha1"
import { BlockchainType } from "@fxhash/shared"
import {
  sumBytesParams,
  jsonStringifyBigint,
  serializeParamsOrNull,
} from "@fxhash/params"
import {
  RuntimeDefinition,
  RuntimeState,
  RuntimeWholeState,
  TUpdateStateFn,
} from "./_types.js"
import { hashRuntimeHardState, hashRuntimeState } from "./utils.js"
import { RuntimeContext, RuntimeContextEventEmitter } from "./_interfaces.js"

export interface RuntimeParams {
  state?: Partial<RuntimeState>
  definition?: Partial<RuntimeDefinition>
}

/**
 * The runtime context holds all informations about a project that defines its state
 * @param initial - initial state of the project devided in state and definition
 * @returns RuntimeContext - Which exoses the state, definition, update method and an event emitter
 */

export function runtimeContext(initial: RuntimeParams): RuntimeContext {
  const emitter = new RuntimeContextEventEmitter()

  let _runtime: RuntimeWholeState = {
    state: {
      hash: "",
      minter: "",
      iteration: 1,
      params: {},
      chain: BlockchainType.ETHEREUM,
      ...initial?.state,
    },
    definition: {
      params: null,
      version: null,
      features: null,
      ...initial?.definition,
    },
  }

  function getState() {
    return _runtime.state
  }

  function getDefinition() {
    return _runtime.definition
  }

  const updateState: TUpdateStateFn<
    RuntimeState,
    RuntimeContext
  > = newState => {
    _runtime.state = merge(cloneDeep(_runtime.state), newState)
    const res = getFullContext()
    emitter.emit("context-changed", res)
    return res
  }

  const updateDefinition: TUpdateStateFn<
    RuntimeDefinition,
    RuntimeContext
  > = newDefinition => {
    _runtime.definition = merge(cloneDeep(_runtime.definition), newDefinition)
    const res = getFullContext()
    emitter.emit("context-changed", res)
    return res
  }

  const update: TUpdateStateFn<RuntimeWholeState, RuntimeContext> = data => {
    _runtime = merge(cloneDeep(_runtime), data)
    const res = getFullContext()
    emitter.emit("context-changed", res)
    return res
  }

  function getDefinitionEnhanced() {
    const definition = getDefinition()
    return {
      ...definition,
      params:
        definition.params?.map(p => ({
          ...p,
          ...(definition.version && { version: definition.version }),
        })) || null,
    }
  }

  function getDetails() {
    const state = getState()
    const definitionEnhanced = getDefinitionEnhanced()
    return {
      params: {
        inputBytes: serializeParamsOrNull(
          state.params || {},
          definitionEnhanced.params || []
        ),
        bytesSize: sumBytesParams(definitionEnhanced.params || []),
      },
      stateHash: {
        soft: hashRuntimeState(state),
        hard: hashRuntimeHardState(state, definitionEnhanced.params),
      },
      definitionHash: {
        params: sha1(jsonStringifyBigint(definitionEnhanced.params)),
      },
    }
  }

  function getFullContext(): RuntimeContext {
    return {
      state: {
        ...getState(),
        update: updateState,
      },
      definition: {
        ...getDefinitionEnhanced(),
        update: updateDefinition,
      },
      update,
      details: getDetails(),
      emitter,
    }
  }

  return getFullContext()
}
