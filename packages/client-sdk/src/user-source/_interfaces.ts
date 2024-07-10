import { GetSingleUserAccountResult } from "@/index.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { BlockchainEnv, BlockchainNetwork } from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { EventEmitter } from "@fxhash/utils"

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

export interface IUserSource {
  init: () => Promise<void>
  emitter: UserSourceEventEmitter
  getAccount: () => any
  getWalletManagers: () => any
}

// // basic wallet + account authentication
// const client = new Client({
//   source: walletAuthentication({
//     source: windowWalletsConnector(...)
//   })
// })

// // for multiple sources
// const client = new Client({
//   source: multipleUserSources({
//     sources: [...],
//     strategy: ...
//   })
// })

// // for instance for our website
// const client = new Client({
//   source: multipleUserSources({
//     sources: [
//       walletAuthentication(
//         windowWallets(...)
//       ),
//       web3authAuthentication(
//         web3authWallets(...)
//       )
//     ]
//   })
// })
