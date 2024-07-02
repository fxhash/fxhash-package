import { TezosWalletManager } from "@fxhash/tez"
import { BlockchainEnv, ChainScopedEvent } from "./WalletConnectors/events.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { TypedEventTarget } from "@/util/TypedEventTarget.js"

type WalletChangedEventTypemap = {
  [E in BlockchainEnv]: {
    [BlockchainEnv.EVM]: {
      manager: EthereumWalletManager | null
    }
    [BlockchainEnv.TEZOS]: {
      manager: TezosWalletManager | null
    }
  }[E]
}

export class WalletChangedEvent<
  E extends BlockchainEnv,
> extends ChainScopedEvent {
  constructor(
    public env: E,
    public data: WalletChangedEventTypemap[E]
  ) {
    super("wallet-changed", env)
  }
}

type WalletOrchestratorEventsTypemap = {
  "wallet-changed":
    | WalletChangedEvent<BlockchainEnv.EVM>
    | WalletChangedEvent<BlockchainEnv.TEZOS>
}

export class WalletOrchestratorEventTarget extends TypedEventTarget<WalletOrchestratorEventsTypemap> {}
