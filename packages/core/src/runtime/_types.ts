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

export type ExecutionContext = "minting" | "standalone" | "capture"

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

export type ControlState = {
  params: {
    definition: FxParamDefinitions | null
    values: FxParamsData
  }
}

export type RuntimeState = Omit<ProjectState, "cid" | "snippetVersion"> & {
  params: FxParamsData
}

export type RuntimeDefinition = {
  params: FxParamDefinitions | null
  version: string | null
  features: RawTokenFeatures | null
}

export type RuntimeWholeState = {
  state: RuntimeState
  definition: RuntimeDefinition
}

export type TUpdateStateFn<T, R> = (data: DeepPartial<T>) => R

export type TUpdateableState<T, R> = T & {
  update: TUpdateStateFn<T, R>
}
