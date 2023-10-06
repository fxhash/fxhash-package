import {
  FxParamDefinition,
  FxParamType,
  FxParamValue,
} from "@fxhash/params/types"

export type RandFunction = () => number

export interface ResettableRandFunction extends RandFunction {
  reset?: () => void
}

export type FxHashExecutionContext = "standalone" | "capture" | "minting"
export type FxHashApi = {
  hash: string
  minter: string
  iteration: number
  rand: ResettableRandFunction
  randminter: ResettableRandFunction
  context: FxHashExecutionContext
  preview: () => void
  isPreview: boolean
  features: (features: FxFeatures) => void
  getFeature: (id: string) => FxFeatureValue | undefined
  getFeatures: () => FxFeatures
  stringifyParams: (definitions: FxParamDefinition<FxParamType>[]) => string
  params: (paramsDefinitions: FxParamDefinition<FxParamType>[]) => void
  getDefinitions: () => FxParamDefinition<FxParamType>[]
  getParam: (id: string) => FxParamValue<FxParamType>
  getParams: () => FxParamValue<FxParamType>
  getRawParam: (id: string) => string
  getRawParams: () => { string: string }
  on: (event: FxEventId, handler: () => void, onDone: () => void) => void
  emit: (event: FxEventId, data: FxEmitData) => void
}

export type FxFeatureValue = string | number | boolean
export type FxFeatures = Record<string, FxFeatureValue>

export type FxEventId = "params:update"
export type FxEmitData = Record<string, FxParamValue<FxParamType>>
export type FxEmitFunction = (event: FxEventId, data: FxEmitData) => void

export interface FxInitOptions {
  params: FxParamDefinition<FxParamType>[]
  features: FxFeatures
}

export type SetFeaturesOptions = Pick<FxInitOptions, "features">
export type SetParamsOptions = Pick<FxInitOptions, "params">

declare global {
  interface Window {
    $fx: FxHashApi // Replace 'any' with the specific type if possible
  }
}
