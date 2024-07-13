import { EthereumWalletManager } from "@fxhash/eth"
import { BlockchainEnv, BlockchainNetwork } from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { EventEmitter } from "@fxhash/utils"
import {
  GetSingleUserAccountResult,
  MapNetworkToWalletManager,
} from "./_index.js"
import { WalletSourcesMap } from "@/index.js"

export type WalletChangedPayload =
  | {
      network: BlockchainNetwork.ETHEREUM
      manager: EthereumWalletManager | null
    }
  | {
      network: BlockchainNetwork.TEZOS
      manager: TezosWalletManager | null
    }
export type WalletChangedEventData = WalletChangedPayload[]

export interface AccountUpdatedEventData {
  account: GetSingleUserAccountResult | null
}

export type UserSourceEventsTypemap = {
  "wallets-changed": WalletChangedEventData
  "account-changed": AccountUpdatedEventData
  "user-changed": void
  error: any
}

export class UserSourceEventEmitter extends EventEmitter<UserSourceEventsTypemap> {}

export type WalletManagersMap = {
  [Net in BlockchainNetwork]?: MapNetworkToWalletManager<Net> | null
}

export interface IUserSource {
  init: () => Promise<void>
  initialized: () => boolean
  release?: () => void
  emitter: UserSourceEventEmitter
  getAccount: () => GetSingleUserAccountResult | null
  logoutAccount: () => Promise<void>
  getWalletManagers: () => WalletManagersMap | null
  disconnectWallet: (network: BlockchainNetwork) => Promise<void>
  disconnectAllWallets: () => Promise<void>
}
