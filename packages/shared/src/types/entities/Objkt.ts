import { ObjktMetadata, TokenFeature } from "../Metadata"
import { Action } from "./Action"
import { GenerativeToken } from "./GenerativeToken"
import { Listing } from "./Listing"
import { Offer } from "./Offer"
import { Split } from "./Split"
import { User } from "./User"
import { MediaImage } from "./MediaImage"
import { Redemption } from "./Redemption"
import { Redeemable } from "./Redeemable"

export interface Objkt {
  id: string
  version: number
  issuer: GenerativeToken
  owner?: User | null
  minter?: User | null
  assigned?: boolean
  generationHash?: string
  inputBytes?: string | null
  duplicate?: boolean
  iteration?: number
  mintedPrice?: number
  tags: string[]
  name?: string
  slug?: string
  metadata?: ObjktMetadata
  features?: TokenFeature[] | null
  rarity?: number | null
  metadataUri: string
  royalties: number
  royaltiesSplit: Split[]
  activeListing?: Listing | null
  offers?: Offer[]
  actions?: Action[]
  createdAt: string
  updatedAt: string
  assignedAt: string | null
  captureMedia?: MediaImage
  redemptions: Redemption[]
  availableRedeemables: Redeemable[]
}

export interface ObjktFilters {
  activeListing_exist?: boolean
  redeemable_eq?: boolean
  redeemed_eq?: boolean
}

export enum EObjktFeatureType {
  BOOLEAN = "BOOLEAN",
  STRING = "STRING",
  NUMBER = "NUMBER",
}

export interface IObjktFeatureFilter {
  name: string
  values: string[]
  type: EObjktFeatureType
}

export function objktFeatureType(value: any): EObjktFeatureType {
  const type = typeof value
  if (type === "boolean") return EObjktFeatureType.BOOLEAN
  else if (type === "number") return EObjktFeatureType.NUMBER
  else return EObjktFeatureType.STRING
}
