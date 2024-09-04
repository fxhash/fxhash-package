import { BlockchainType } from "@fxhash/shared"
import { FxParamDefinition, FxParamType, FxParamsData } from "@fxhash/params"
import { RawTokenFeatures } from "@fxhash/tez"

export type RuntimeConnector = (iframe: HTMLIFrameElement) => {
  getUrl: (state: ProjectState, urlParams?: URLSearchParams) => string
  useSync: (runtimeUrl: string, controlsUrl?: string) => void
}

export enum ExecutionContext {
  MINTING = "minting",
  STANDALONE = "standalone",
  CAPTURE = "capture",
}

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

export type RuntimeState = Omit<
  ProjectState,
  "inputBytes" | "cid" | "snippetVersion"
> & {
  params: FxParamsData
}

export type RuntimeDefinition = {
  params: FxParamDefinition<FxParamType>[] | null
  version: string | null
  features: RawTokenFeatures | null
}

export type RuntimeWholeState = {
  state: RuntimeState
  definition: RuntimeDefinition
}

export type DeepPartialState<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartialState<T[P]>
    }
  : T

export type TUpdateStateFn<T, R> = (data: DeepPartialState<T>) => R

export type TUpdateableState<T, R> = T & {
  update: TUpdateStateFn<T, R>
}
