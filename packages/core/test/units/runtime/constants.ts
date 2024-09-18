import { ExecutionContext, ProjectState, RuntimeState } from "@/index.js"
import { FxParamDefinitions, FxParamsData } from "@fxhash/params"
import { BlockchainType } from "@fxhash/shared"

export const MOCKED_SHA1 = "mocked-sha1"

export const STRING_VALUE_A = "foo"
export const STRING_VALUE_B = "bar"

export const NUMBER_VALUE_A = 42
export const NUMBER_VALUE_B = 21

export const BYTE_VALUE_A = new Uint8Array([0, 255, 0, 255])
export const BYTE_VALUE_B = new Uint8Array([255, 255, 255, 255])

export const PARAMS_DEFINITION: FxParamDefinitions = [
  {
    id: "string",
    type: "string",
    value: STRING_VALUE_A,
    default: STRING_VALUE_A,
    options: {},
  },
  {
    id: "number",
    type: "number",
    value: NUMBER_VALUE_A,
    default: NUMBER_VALUE_A,
    options: {},
  },
  {
    id: "bytes",
    type: "bytes",
    update: "code-driven",
    value: BYTE_VALUE_A,
    default: BYTE_VALUE_A,
    options: {
      length: 4,
    },
  },
]

export const PARAMS_VALUES_A: FxParamsData = {
  string: STRING_VALUE_A,
  number: NUMBER_VALUE_A,
  bytes: BYTE_VALUE_A,
}
export const PARAMS_VALUES_B: FxParamsData = {
  string: STRING_VALUE_B,
  number: NUMBER_VALUE_B,
  bytes: BYTE_VALUE_B,
}

export const SNIPPET_VERSION = "3.3.0"

export const MOCKED_HASH = "mocked-hash"
export const MOCKED_MINTER = "mocked-minter"
export const MOCKED_CHAIN = BlockchainType.ETHEREUM
export const MOCKED_ITERATION = 1
export const MOCKED_CONTEXT = ExecutionContext.STANDALONE

const BASE_STATE = {
  chain: MOCKED_CHAIN,
  hash: MOCKED_HASH,
  iteration: MOCKED_ITERATION,
  minter: MOCKED_MINTER,
  context: MOCKED_CONTEXT,
}

export const RUNTIME_STATE: RuntimeState = {
  ...BASE_STATE,
  params: PARAMS_VALUES_A,
}

export const RUNTIME_STATE_B: RuntimeState = {
  ...BASE_STATE,
  params: PARAMS_VALUES_B,
}

export const MOCKED_CID = "mocked-cid"
export const MOCKED_INPUT_BYTES = "mocked-input-bytes"

export const PROJECT_STATE: ProjectState = {
  cid: MOCKED_CID,
  snippetVersion: SNIPPET_VERSION,
  inputBytes: MOCKED_INPUT_BYTES,
  ...BASE_STATE,
}
