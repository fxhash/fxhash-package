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
  ETH_ROLE_REGISTRY: config.eth.contracts.role_registry_v1,
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
  ETH_SCRIPTY_RENDERER_V1: config.eth.contracts.scripty_renderer_v1,
  ETH_IPFS_RENDERER_V1: config.eth.contracts.ipfs_renderer_v1,
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
