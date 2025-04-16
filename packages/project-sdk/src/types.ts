import {
  type FxParamDefinition,
  type FxParamProcessors,
  type FxParamTransformationTypeMap,
  type FxParamType,
  type FxParamValue,
  type FxParamsRaw,
  type FxParamsTransformed,
} from "@fxhash/params"
import { ResettableRandFunction } from "@fxhash/utils"

export type FxHashExecutionContext = "standalone" | "capture" | "minting"

export type FxhashSdkPrivate = {
  _version: string
  _features?: FxFeatures
  _updateParams: (data: FxEmitData) => void
  _processors: FxParamProcessors
  _params?: FxParamDefinition<FxParamType>[]
  _rawValues: FxParamsRaw
  _paramValues: FxParamsTransformed
  _receiveUpdateParams: (data: FxEmitData, onDone?: FxOnDone) => Promise<void>
  _listeners: Record<FxEventId | string, Array<[FxOnEventHandler, FxOnDone?]>>
  _propagateEvent: (name: FxEventId, data: any) => Promise<any[][]>
  _updateInputBytes: () => void
  _emitParams: (data: FxEmitData) => void
}

export type FxHashApi = FxhashSdkPrivate & {
  hash: string
  minter: string
  iteration: number
  rand: ResettableRandFunction
  randminter: ResettableRandFunction
  context: FxHashExecutionContext
  inputBytes?: string
  preview: () => void
  isPreview: boolean
  features: (features: FxFeatures) => void
  getFeature: (id: string) => FxFeatureValue
  getFeatures: () => FxFeatures
  stringifyParams: (definitions: FxParamDefinition<FxParamType>[]) => string
  params: (paramsDefinitions: FxParamDefinition<FxParamType>[]) => void
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
export type FxOnEventHandler = (data: FxEmitData) => Promise<void>
export type FxOnDone = () => Promise<void>

export interface FxInitOptions {
  params: FxParamDefinition<FxParamType>[]
  features: FxFeatures
}

export type SetFeaturesOptions = Pick<FxInitOptions, "features">
export type SetParamsOptions = Pick<FxInitOptions, "params">

declare global {
  interface Window {
    $fx: FxHashApi
  }
}
