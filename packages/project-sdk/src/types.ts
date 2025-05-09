import {
  type FxParamDefinition,
  type FxParamProcessors,
  type FxParamTransformationTypeMap,
  type FxParamType,
  type FxParamValue,
  type FxParamsRaw,
  type FxParamsTransformed,
} from "@fxhash/params"
import {
  type ResettableRandFunction
} from "@fxhash/utils"

export type FxHashExecutionContext = "standalone" | "capture" | "minting"

export type FxhashSdkPrivate = {
  _version: string
  _features?: FxFeatures
  _updateParams: (data: FxEmitData) => void
  _processors: FxParamProcessors
  _params?: FxParamDefinition<FxParamType>[]
  _rawValues: FxParamsRaw
  _paramValues: FxParamsTransformed
  _receiveUpdateParams: (
    data: FxEmitData,
    onDefault?: () => void
  ) => Promise<void>
  _listeners: Record<FxEventId | string, Array<[FxOnEventHandler, FxOnDone?]>>
  _propagateEvent: (name: FxEventId, data: any) => Promise<any[][]>
  _updateInputBytes: () => void
  _emitParams: (data: FxEmitData) => void
  _fxRandByDepth: ResettableRandFunction[]
}
type _Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface UserDefinedParams
  extends _Optional<FxParamDefinition<FxParamType>, "value" | "options"> { }

export type FxLineage = string[]

export type RandAtFunction = (depth: number) => number
interface ResettableRandAtFunction extends RandAtFunction {
  reset: (depth: number) => void
}

export type FxHashApi = FxhashSdkPrivate & {
  createFxRandom: (hash: string) => ResettableRandFunction
  hash: string
  lineage: FxLineage
  depth: number
  minter: string
  iteration: number
  rand: ResettableRandFunction
  randAt: ResettableRandAtFunction
  randminter: ResettableRandFunction
  context: FxHashExecutionContext
  inputBytes?: string
  preview: () => void
  captureFrame: (isLastFrame?: boolean) => void
  isPreview: boolean
  features: (features: FxFeatures) => void
  getFeature: (id: string) => FxFeatureValue
  getFeatures: () => FxFeatures
  stringifyParams: (
    definitions:
      | FxParamDefinition<FxParamType>[]
      | Record<string, FxParamValue<FxParamType>>
  ) => string
  params: (paramsDefinitions: UserDefinedParams[]) => void
  getDefinitions: () => FxParamDefinition<FxParamType>[]
  getParam: (id: string) => FxParamTransformationTypeMap[FxParamType]
  getParams: () => FxParamsTransformed
  getRawParam: (id: string) => FxParamValue<FxParamType>
  getRawParams: () => Record<string, FxParamValue<FxParamType>>
  getRandomParam: (id: string) => FxParamValue<FxParamType>
  on: (event: FxEventId, handler: FxOnEventHandler, onDone: FxOnDone) => void
  emit: (event: FxEventId, data: FxEmitData) => void
}

export type FxFeatureValue = string | number | boolean
export type FxFeatures = Record<string, FxFeatureValue>

export type FxEventId = "params:update"
export type FxEmitData = Record<string, FxParamValue<FxParamType>>
export type FxEmitFunction = (event: FxEventId, data: FxEmitData) => void
export type FxOnEventHandler = (data: FxEmitData) => Promise<boolean> | boolean
export type FxOnDone = (optInDefault: boolean, newRawValues: FxEmitData) => void

export interface FxInitOptions {
  params: FxParamDefinition<FxParamType>[]
  features: FxFeatures
}

export type SetFeaturesOptions = Pick<FxInitOptions, "features">
export type SetParamsOptions = Pick<FxInitOptions, "params">

declare global {
  const $fx: typeof window.$fx
  interface Window {
    $fx: FxHashApi
  }
}
