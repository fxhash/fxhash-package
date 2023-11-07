import { config } from "@fxhash/config"

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
  ISSUER: config.tez.contracts.issuer_v2,
  ISSUER_V3: config.tez.contracts.issuer_v3,
  MINT_TICKETS_V3: config.tez.contracts.issuer_tickets,
  MARKETPLACE_V1: config.tez.contracts.marketplace_v1,
  MARKETPLACE_V2: config.tez.contracts.marketplace_v2,
  MARKETPLACE_V3: config.tez.contracts.marketplace_v3,
  GENTK_V1: config.tez.contracts.gentk_v1,
  GENTK_V2: config.tez.contracts.gentk_v2,
  GENTK_V3: config.tez.contracts.gentk_v3,
  ARTICLES: config.tez.contracts.articles,
  REGISTER: config.tez.contracts.user_register,
  MODERATION: config.tez.contracts.token_moderation,
  MODERATION_V3: config.tez.contracts.moderation_token_v3,
  USER_MODERATION: config.tez.contracts.user_moderation,
  ARTICLE_MODERATION: config.tez.contracts.moderation_articles,
  COLLAB_FACTORY: config.tez.contracts.collaboration_factory,
  ETH_PROJECT_FACTORY: config.eth.contracts.project_factory_v1,
  ETH_SPLITS_FACTORY: config.eth.contracts.splits_factory_v1,
  ETH_SPLITS_CONTROLLER: config.eth.contracts.splits_controller_v1,
  ETH_SPLITS_MAIN: config.eth.contracts.splits_main,
  ETH_SCRIPTY_STORAGE: config.eth.contracts.scripty_storage,
  ETH_SCRIPTY_BUILDER: config.eth.contracts.scripty_builder,
  ETH_SEAPORT_ZONE: config.eth.contracts.seaport_zone,
  ETH_FIXED_PRICE_MINTER_V1: config.eth.contracts.fixed_price_minter_v1,
  ETH_DUTCH_AUCTION_V1: config.eth.contracts.dutch_auction_minter_v1,
  ETH_MINT_TICKETS_FACTORY_V1: config.eth.contracts.mint_ticket_factory_v1,
  ETH_TICKET_REDEEMER_V1: config.eth.contracts.ticket_redeemer_v1,
  ETH_RANDOMIZER_V1: config.eth.contracts.randomizer_v1,
  ETH_RENDERER_V1: config.eth.contracts.renderer_v1,
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
  opData: any[] | null
  params: Params | null
  call: (data: Params) => void
  clear: () => void
}
