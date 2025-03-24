import { GPURenderingConfig } from "@fxhash/config"
import type { Collaboration } from "./entities/User"
import type { IPricingFixed, IPricingDutchAuction } from "./entities/Pricing"
import type { GenerativeTokenMetadata } from "./Metadata"
import type { GenTokLabel, GenTokPricing } from "./entities/GenerativeToken"
import type { ISplit } from "./entities/Split"
import type { IReserve } from "./entities/Reserve"
import type { Vec2 } from "./Math"

export interface GenerativeTokenInformations {
  metadata: GenerativeTokenMetadata
  editions: number
  enabled: boolean
  price?: number
  royaties?: number
}

export enum CaptureTriggerMode {
  DELAY = "DELAY",
  FN_TRIGGER = "FN_TRIGGER",
}
export const CaptureTriggerModeList = Object.values(CaptureTriggerMode)

export enum CaptureMode {
  CANVAS = "CANVAS",
  CUSTOM = "CUSTOM",
  VIEWPORT = "VIEWPORT",
}
export const CaptureModeList = Object.values(CaptureMode)

export interface CaptureSettings {
  mode?: CaptureMode
  triggerMode?: CaptureTriggerMode
  canvasSelector?: string
  delay?: number
  resolution?: Vec2
  gpu?: boolean
  gif?: boolean
  frameCount?: number
  captureInterval?: number
  playbackFps?: number
  gpuVersion?: keyof GPURenderingConfig
}

// object defining the fx(params) when minting a Generative Token
export interface MintGenerativeParams {
  // JSON definition of the params
  definition: any
  // number of bytes required when minting params
  inputBytesSize: number
}

export interface MintGenerativeData<N = string> {
  // whether the project is stored on-chain
  onChain?: boolean
  // if the project is authored as a collaboration
  collaboration?: Collaboration | null
  // the s3 key pointing to the project zip
  projectZipKey?: string
  // the ipfs uri pointing to the project with URL params
  cidUrlParams?: string
  // a hash to verify that the first matches
  authHash1?: string
  // the hash selector for the preview
  previewHash?: string
  // the iteration selection for the preview
  previewIteration?: number
  // the minter selection for the preview
  previewMinter?: string
  // the byte string of param values for the preview
  previewInputBytes?: string | null
  // the ipfs uri to the preview
  cidPreview?: string
  // the ipfs uri to the thumbnail
  cidThumbnail?: string
  // a hash to verify the 2 ipfs uri
  authHash2?: string
  // the distribution parameters
  distribution?: GenTokDistributionForm<N>
  // capture settings
  captureSettings?: CaptureSettings
  // general settings
  settings?: GenTokenSettings
  // fx(params) settings
  params?: MintGenerativeParams
  // general informations about the token
  informations?: GenTokenInformationsForm
  // minted successful
  minted?: boolean
  // version of the snippet the token is minted with
  snippetVersion?: string | null
}

/**
 * This type describes the constraints that can be applied to the minting of a generative token
 * The different types in order are:
 * hash: the hash of the project
 * minter: the minter of the project
 * iteration: the iteration of the project
 * inputBytes: the serialized input bytes of the project
 */
export type ConstraintVariant = [string, string, number, string]

export interface GenTokConstrains {
  hashConstraints?: string[] | null
  minterConstraints?: string[] | null
  iterationConstraints?: number[] | null
  paramsConstraints?: string[] | null
}

export interface ExplorationSettings extends GenTokConstrains {
  enabled: boolean
}

export interface GenTokenSettings {
  exploration?: {
    preMint?: ExplorationSettings
    postMint?: ExplorationSettings
  }
}

export type FrameMintingFormValues = {
  enabled: boolean
  mintsPerFid: number
}

export interface GenTokPricingForm<N> {
  pricingMethod?: GenTokPricing
  pricingFixed: Partial<IPricingFixed<N>>
  pricingDutchAuction: Partial<IPricingDutchAuction<N>>
  lockForReserves?: boolean
  royalties?: N
  splitsPrimary: ISplit[]
  splitsSecondary: ISplit[]
}

export enum GenTokEditions {
  FIXED = "FIXED",
  OPENED = "OPENED",
}

export type GenTokOpenEditionsForm = {
  closesAt?: Date | null
}

export type GenTokFixedEditionsForm<N> = {
  amount: N
}

export type GenTokEditionsForm<N> = {
  type: GenTokEditions
  fixed: GenTokFixedEditionsForm<N>
  opened: GenTokOpenEditionsForm
}

export interface GenTokDistributionForm<N> {
  editions: GenTokEditionsForm<N>
  enabled: boolean
  reserves: IReserve<N>[]
  gracingPeriod?: N
  frameMinting?: FrameMintingFormValues
}

export interface GenTokenInformationsForm {
  name: string
  description: string
  mintingInstructions: string
  childrenDescription: string
  tags: string
  labels: GenTokLabel[]
}
