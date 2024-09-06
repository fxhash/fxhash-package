import { UserAuthorization, UserFlag } from "./User"
import { GenerativeToken } from "./GenerativeToken"
import { Listing } from "./Listing"
import { Objkt } from "./Objkt"
import { AnyOffer } from "./Offer"
import { NFTArticle } from "./Article"
import { MintTicket } from "./MintTicket"
import { Action } from "./Action"
import { BlockchainNetwork } from "@/wallet/ContractOperation"

/**
 * Model Wallet
 *
 */
type Wallet = {
  address: string
  network: BlockchainNetwork
  accountId: string
}

/**
 * Model Profile
 *
 */
type Profile = {
  accountId: string
  description: string | null
  website: string | null
  twitter: string | null
  instagram: string | null
  picture: string | null
}

export interface ConnectedAccount extends Partial<Account> {
  id: string
  username: string
  activeWallet: string
  authorizations: UserAuthorization[]
}

export interface Account {
  id: string
  username: string
  authorizations: UserAuthorization[]
  profile?: Profile
  wallets?: Wallet[]
  flag: UserFlag
  metadata?: Record<string, any>
  metadataUri?: string
  description?: string
  avatarUri?: string
  avatarMedia?: MediaImage
  generativeTokens?: GenerativeToken[]
  sales: Action[]
  actionsAsIssuer: Action[]
  actionsAsTarget: Action[]
  listings: Listing[]
  objkts: Objkt[]
  offers: Listing[]
  offersReceived: AnyOffer[]
  offersSent: AnyOffer[]
  createdAt: Date
  updatedAt: Date
  // can be populated to merge the actions, however not returned by api
  actions?: Action[]
  // is set by aliases to manually enforce platform accounts
  platformOwned?: boolean
  donationAddress?: boolean
  descriptionLight?: string
  // is set by aliases to prevent profile from being linked
  preventLink?: boolean
  // as a regular user, it can have collaboration contracts
  // collaborationContracts: Collaboration[]
  moderationReason?: string | null
  articles: NFTArticle[]
  mintTickets: MintTicket[]
}

export const accountTypeGuard = (entity: any): entity is Account => {
  return (entity as Account).username !== undefined
}
