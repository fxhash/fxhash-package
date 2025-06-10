import type { ISplit } from "./entities"
import type { CaptureSettings, GenTokenSettings } from "./Mint"

export interface TokenMetadata {
  "": string
  name: string
  symbol: string
  decimals: number
}

export interface HistoryMetadata {
  [key: string]: any
}

export interface TokenFormat {
  uri: string
  mimeType: string
}

// token features as they can be exported by a Token
export type RawTokenFeatures = Record<string, any>

// only types allowed for token features
export type TokenFeatureValueType = string | number | boolean

export interface TokenMetadataFeature {
  name: string
  value: TokenFeatureValueType
}

export interface TokenFeature {
  name: string
  value: TokenFeatureValueType
  rarity?: number
}

// errors which can be returned during processing RawTokenFeatures into TokenFeatures
export enum ProcessRawTokenFeatureErrorType {
  UNKNOWN = "UNKNOWN",
  INVALID_PROPERTY_TYPE = "INVALID_PROPERTY_TYPE",
  INVALID_FEATURES_SIGNATURE = "INVALID_FEATURES_SIGNATURE",
}
export const ProcessRawTokenFeatureErrorTypes = Object.values(
  ProcessRawTokenFeatureErrorType
)

// the error thrown during Raw Token Features processing
export type ProcessRawTokenFeatureError = {
  type: ProcessRawTokenFeatureErrorType
  extra?: string
}

type GenerativeTokenMetadataVersion = "0.1" | "0.2" | "0.3" | "0.4" | "0.5"

type BaseGenerativeTokenMetadata = {
  name: string
  description: string
  childrenDescription: string
  mintingInstructions: string
  tags: string[]
  artifactUri: string
  displayUri: string
  thumbnailUri: string
  generativeUri: string
  authenticityHash: string
  capture: CaptureSettings
  settings?: GenTokenSettings | null
  symbol: string
  version?: GenerativeTokenMetadataVersion
}

export type GenerativeTokenMetadataV1 = BaseGenerativeTokenMetadata

export type GenerativeTokenMetadataV2 = GenerativeTokenMetadataV1 & {
  previewHash?: string
  previewIteration?: string
  previewMinter?: string
  previewInputBytes?: string
  mintingInstructions: string
}

export type GenerativeTokenMetadataV3 = GenerativeTokenMetadataV2 & {
  params: {
    definition: any
    inputBytesSize: number
  }
  snippetVersion: string
}

export type GenerativeTokenMetadataV4 = GenerativeTokenMetadataV3 & {
  primarySplits: ISplit[]
}

export type GenerativeTokenMetadataV5 = GenerativeTokenMetadataV4 & {
  chain: string
}

export type GenerativeTokenMetadataV6 = GenerativeTokenMetadataV5 & {
  previewParentHashes?: string[]
}

export type GenerativeTokenMetadata =
  | GenerativeTokenMetadataV1
  | (GenerativeTokenMetadataV2 & { version: "0.2" })
  | (GenerativeTokenMetadataV3 & { version: "0.3" })
  | (GenerativeTokenMetadataV4 & { version: "0.4" })
  | (GenerativeTokenMetadataV5 & { version: "0.5" })
  | (GenerativeTokenMetadataV6 & { version: "0.6" })

export type ObjktMetadata = {
  features?: TokenMetadataFeature[] | null
} & GenerativeTokenMetadata

//
// ETH SPECIFIC
//
export interface Eth721ContractMetadata {
  name: string
  description: string
  image: string
  external_link: string
  collaborators?: string[]
  ipfsBackupUri?: string
}

export interface Eth721TokenMetadata {
  name: string
  description: string
  image: string
  external_url: string
  animation_url?: string
  collaborators?: string[]
  ipfsBackupUri?: string
}

//
// ETH SPECIFIC
//
export interface Eth721ContractMetadata {
  name: string
  description: string
  image: string
  external_link: string
  collaborators?: string[]
  ipfsBackupUri?: string
}

export interface Eth721TokenMetadata {
  name: string
  description: string
  image: string
  external_url: string
  animation_url?: string
  collaborators?: string[]
  ipfsBackupUri?: string
}

//
// Articles
//

export interface ArticleMetadata {
  decimals: number
  symbol: "ARTKL"
  name: string
  description: string
  minter?: string
  creators?: string[]
  contributors?: string[]
  type: "article"
  tags: string[]
  language: string
  artifactUri: string
  displayUri: string
  thumbnailUri: string
  thumbnailCaption?: string
  platforms?: string[]
}

export interface MarketplaceMetadataEvm {
  external: boolean
  source?: string
  hasRoyalties: boolean
}
