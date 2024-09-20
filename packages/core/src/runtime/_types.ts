import { BlockchainType, RawTokenFeatures } from "@fxhash/shared"
import { FxParamDefinitions, FxParamsData } from "@fxhash/params"

export type RuntimeConnector = () => {
  getUrl: (state: ProjectState, urlParams?: URLSearchParams) => string
  useSync: (
    iframe: HTMLIFrameElement,
    runtimeUrl: string,
    controlsUrl?: string
  ) => void
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

export type DeepPartialState<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartialState<T[P]>
    }
  : T

export type TUpdateStateFn<T, R> = (data: DeepPartialState<T>) => R

export type TUpdateableState<T, R> = T & {
  update: TUpdateStateFn<T, R>
}
