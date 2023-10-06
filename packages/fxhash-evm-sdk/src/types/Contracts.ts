import { config } from "@fxhash/config"
import { TzktOperation } from "./Tzkt"

// a value for the state of the transaction
export enum ContractOperationStatus {
  NONE = "NONE",
  CALLING = "CALLING",
  WAITING_CONFIRMATION = "WAITING_CONFIRMATION",
  INJECTED = "INJECTED",
  ERROR = "ERROR",
}

// generic method to handle updates made on a call to a contract
export type ContractOperationCallback = (
  status: ContractOperationStatus,
  data?: any
) => any

// generic signature for any contract-interraction method
export type ContractInteractionMethod<T> = (
  data: T,
  operationCallback?: ContractOperationCallback,
  currentTry?: number
) => any

export const FxhashContracts = {
  ISSUER: config.TZ_CT_ADDRESS_ISSUER!,
  ISSUER_V3: config.TZ_CT_ADDRESS_ISSUER_V3!,
  MINT_TICKETS_V3: config.TZ_CT_ADDRESS_MINT_TICKETS_V3!,
  MARKETPLACE_V1: config.TZ_CT_ADDRESS_MARKETPLACE_V1!,
  MARKETPLACE_V2: config.TZ_CT_ADDRESS_MARKETPLACE_V2!,
  MARKETPLACE_V3: config.TZ_CT_ADDRESS_MARKETPLACE_V3!,
  GENTK_V1: config.TZ_CT_ADDRESS_GENTK_V1!,
  GENTK_V2: config.TZ_CT_ADDRESS_GENTK_V2!,
  GENTK_V3: config.TZ_CT_ADDRESS_GENTK_V3!,
  ARTICLES: config.TZ_CT_ADDRESS_ARTICLES!,
  REGISTER: config.TZ_CT_ADDRESS_USERREGISTER!,
  MODERATION: config.TZ_CT_ADDRESS_TOK_MODERATION!,
  MODERATION_V3: config.TZ_CT_ADDRESS_TOK_MODERATION_V3!,
  USER_MODERATION: config.TZ_CT_ADDRESS_USER_MODERATION!,
  ARTICLE_MODERATION: config.TZ_CT_ADDRESS_ARTICLE_MODERATION!,
  COLLAB_FACTORY: config.TZ_CT_ADDRESS_COLLAB_FACTORY!,
  ETH_PROJECT_FACTORY: config.ETH_PROJECT_FACTORY,
  ETH_SPLITS_FACTORY: config.ETH_SPLITS_FACTORY,
  ETH_SPLITS_MAIN: config.ETH_SPLITS_MAIN,
  ETH_SCRIPTY_STORAGE: config.ETH_SCRIPTY_STORAGE,
  ETH_SCRIPTY_BUILDER: config.ETH_SCRIPTY_BUILDER,
  ETH_SEAPORT_ZONE: config.ETH_SEAPORT_ZONE,
  ETH_FIXED_PRICE_MINTER_V1: config.ETH_FIXED_PRICE_MINTER_V1,
}

export const FxhashCollabFactoryCalls = {
  // PRE_V3 contracts
  MINT_ISSUER: 0,
  UPDATE_ISSUER: 1,
  UPDATE_PRICE: 2,
  UPDATE_RESERVE: 3,
  BURN_SUPPLY: 4,
  BURN: 5,
  // V3 contracts
  MINT_ISSUER_V3: 6,
  UPDATE_ISSUER_V3: 7,
  UPDATE_PRICE_V3: 8,
  UPDATE_RESERVE_V3: 9,
  BURN_SUPPLY_V3: 10,
  BURN_V3: 11,
}

export type ContractCallHookReturn<T> = {
  state: ContractOperationStatus
  loading: boolean
  success: boolean
  error: boolean
  transactionHash: string | null
  call: (data: T) => void
  clear: () => void
}

export type TContractOperationHookReturn<Params> = {
  state: ContractOperationStatus
  loading: boolean
  success: boolean
  error: boolean
  opHash: string | null
  operation: any | null
  opData: TzktOperation[] | null
  params: Params | null
  call: (data: Params) => void
  clear: () => void
}
