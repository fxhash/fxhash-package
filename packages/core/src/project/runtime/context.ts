import { cloneDeep } from "lodash"
import { BlockchainType } from "@fxhash/shared"
import { DeepPartial } from "@fxhash/utils"
import {
  sumBytesParams,
  jsonStringifyBigint,
  serializeParamsOrNull,
} from "@fxhash/params"
import {
  RuntimeDefinition,
  RuntimeDetails,
  RuntimeState,
  RuntimeWholeState,
} from "./_types.js"
import {
  enhanceRuntimeDefinition,
  hashRuntimeHardState,
  hashRuntimeState,
  mergeWithKeepingUint8ArrayType,
  quickHash,
} from "./utils.js"
import { IRuntimeContext, RuntimeContextEventEmitter } from "./_interfaces.js"

const DEFAULT_RUNTIME_STATE: RuntimeState = Object.freeze({
  hash: "",
  minter: "",
  iteration: 1,
  params: {},
  chain: BlockchainType.ETHEREUM,
})

const DEFAULT_RUNTIME_DEFINITION: RuntimeDefinition = Object.freeze({
  params: null,
  version: null,
  features: null,
})

const DEFAULT_RUNTIME_DETAILS: RuntimeDetails = Object.freeze({
  params: {
    inputBytes: null,
    bytesSize: 0,
  },
  stateHash: {
    soft: "",
    hard: "",
  },
  definitionHash: {
    params: "",
  },
})

export interface RuntimeParams {
  state?: Partial<RuntimeState>
  definition?: Partial<RuntimeDefinition>
}

export function runtimeContext(initial: RuntimeParams): IRuntimeContext {
  const emitter = new RuntimeContextEventEmitter()

  let _runtime: RuntimeWholeState = {
    state: {
      ...DEFAULT_RUNTIME_STATE,
      ...initial?.state,
    },
    definition: {
      ...DEFAULT_RUNTIME_DEFINITION,
      ...initial?.definition,
    },
    details: DEFAULT_RUNTIME_DETAILS,
  }

  _runtime.definition = enhanceRuntimeDefinition(_runtime)
  _runtime.details = getDetails()

  function getDetails() {
    return {
      params: {
        inputBytes: serializeParamsOrNull(
          _runtime.state.params || {},
          _runtime.definition.params || []
        ),
        bytesSize: sumBytesParams(_runtime.definition.params || []),
      },
      stateHash: {
        soft: hashRuntimeState(_runtime.state),
        hard: hashRuntimeHardState(_runtime.state, _runtime.definition.params),
      },
      definitionHash: {
        params: quickHash(jsonStringifyBigint(_runtime.definition.params)),
      },
    }
  }

  return {
    state: () => _runtime.state,
    updateState: (newState: Partial<RuntimeState>) => {
      _runtime.state = mergeWithKeepingUint8ArrayType(
        cloneDeep(_runtime.state),
        newState
      )
      _runtime.details = getDetails()
      emitter.emit("context-changed", _runtime)
      return _runtime
    },
    definition: () => _runtime.definition,
    updateDefinition: (newDefinition: Partial<RuntimeDefinition>) => {
      _runtime.definition = mergeWithKeepingUint8ArrayType(
        cloneDeep(_runtime.definition),
        newDefinition
      )
      _runtime.definition = enhanceRuntimeDefinition(_runtime)
      _runtime.details = getDetails()
      emitter.emit("context-changed", _runtime)
      return _runtime
    },
    whole: () => _runtime,
    update: (data: DeepPartial<RuntimeWholeState>) => {
      _runtime = mergeWithKeepingUint8ArrayType(cloneDeep(_runtime), data)
      _runtime.definition = enhanceRuntimeDefinition(_runtime)
      _runtime.details = getDetails()
      emitter.emit("context-changed", _runtime)
      return _runtime
    },
    details: () => _runtime.details,
    emitter,
  }
}
