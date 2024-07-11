import { TezosWalletManager } from "@fxhash/tez"
import { EthereumWalletManager } from "@fxhash/eth"
import { BlockchainEnv } from "@fxhash/shared"
import { EventEmitter } from "@fxhash/utils"

export type WalletChangedEvent =
  | {
      env: BlockchainEnv.EVM
      manager: EthereumWalletManager | null
    }
  | {
      env: BlockchainEnv.TEZOS
      manager: TezosWalletManager | null
    }

export type WalletOrchestratorEventsTypemap = {
  "wallet-changed": WalletChangedEvent
}

export class WalletOrchestratorEventEmitter extends EventEmitter<WalletOrchestratorEventsTypemap> {}
