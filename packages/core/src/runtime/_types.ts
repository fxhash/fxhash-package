import { BlockchainType } from "@fxhash/shared"
import {
  FxParamDefinition,
  FxParamType,
  FxParamsData,
  FxParamDefinitions,
} from "@fxhash/params"
import {
  RuntimeContextEventEmitter,
  RuntimeControllerEventEmitter,
  RuntimeControlsEventEmitter,
} from "./_interfaces.js"
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

export interface RuntimeDefinition {
  params: FxParamDefinition<FxParamType>[] | null
  version: string | null
  features: RawTokenFeatures | null
}

export interface RuntimeController {
  runtime: RuntimeContext
  controls: RuntimeControls
  init: () => void
  release: () => void
  getUrl: () => string
  hardSync: () => void
  updateControls: (update: Partial<FxParamsData>, forceRefresh: boolean) => void
  emitter: RuntimeControllerEventEmitter
}

export interface ControlState {
  params: {
    definition: FxParamDefinitions | null
    values: FxParamsData
  }
}

export interface RuntimeControls {
  state: ControlState
  setValues: (update: Partial<FxParamsData>) => RuntimeControls
  setDefinition: (
    definition: FxParamDefinition<FxParamType>[] | null,
    values: FxParamsData | Record<string, never>
  ) => RuntimeControls
  emitter: RuntimeControlsEventEmitter
}

export interface RuntimeWholeState {
  state: RuntimeState
  definition: RuntimeDefinition
}

export interface RuntimeContext {
  // the base state of the runtime
  state: TUpdateableState<RuntimeState, RuntimeContext>
  // definitions, used to manipulate the state
  definition: TUpdateableState<RuntimeDefinition, RuntimeContext>
  // extra details derived from the state & definition
  details: {
    params: {
      inputBytes: string | null
      bytesSize: number
    }
    stateHash: {
      soft: string
      hard: string
    }
    definitionHash: {
      params: string
    }
  }
  // whole-state update function, should be used to prevent side-effects
  update: TUpdateStateFn<RuntimeWholeState, RuntimeContext>
  emitter: RuntimeContextEventEmitter
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
