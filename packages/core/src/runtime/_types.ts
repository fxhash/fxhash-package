import { BlockchainType, RawTokenFeatures } from "@fxhash/shared"
import { FxParamDefinitions, FxParamsData } from "@fxhash/params"
import { DeepPartial } from "@fxhash/utils"

export type RuntimeConnector = () => {
  getUrl: (state: ProjectState, urlParams?: URLSearchParams) => string
  useSync: (
    iframe: HTMLIFrameElement,
    runtimeUrl: string,
    controlsUrl?: string
  ) => void
}

/**
 * The execution context of the runtime
 * - standalone: The runtime is used for standalone display
 * - minting: The runtime is used for minting
 * - capture: The runtime is used for capture
 */
export type ExecutionContext = "minting" | "standalone" | "capture"

/**
 * The state of a project
 */
export type ProjectState = {
  cid: string
  snippetVersion: string
  chain: BlockchainType
  hash?: string
  iteration?: number
  minter?: string
  inputBytes?: string
  context?: ExecutionContext
}

/**
 * The fx(params) state of a project
 * params state consists of the definition and the values
 */
export type ControlState = {
  params: {
    definition: FxParamDefinitions | null
    values: FxParamsData
  }
}

/**
 * The actual runtime state of a project that determines
 * what the project will display
 */
export type RuntimeState = Omit<ProjectState, "cid" | "snippetVersion"> & {
  params: FxParamsData
}

/**
 * The definition of the runtime
 */
export type RuntimeDefinition = {
  params: FxParamDefinitions | null
  version: string | null
  features: RawTokenFeatures | null
}

/**
 * The whole state of the runtime consists of the runtime state
 * and the runtime definition
 */
export type RuntimeWholeState = {
  state: RuntimeState
  definition: RuntimeDefinition
}

/**
 * Generic update function for a state
 */
export type TUpdateStateFn<T, R> = (data: DeepPartial<T>) => R

/**
 * Generic state that can be updated
 */
export type TUpdateableState<T, R> = T & {
  update: TUpdateStateFn<T, R>
}
