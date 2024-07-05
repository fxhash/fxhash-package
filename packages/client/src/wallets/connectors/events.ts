/**
 * @author fxhash
 *
 * Wallets Connectors implement an EventTarget to emit and subscribe to events
 * happening through their various lifecycle. It is not expected that consumers
 * will subscribe to such events, rather they will subscribe to the Wallets
 * Orchestrator for all their events.
 * The Wallet Orchestrator will listen to Wallets Connectors lifecycle events
 * for its internal logic and will forward some of these events for an easier
 * usage by API consumers.
 */

import { TypedEventTarget } from "@/util/TypedEventTarget.js"
import { AccountInfo } from "@airgap/beacon-sdk"
import { Address } from "viem"

export enum BlockchainEnv {
  EVM = "EVM",
  TEZOS = "TEZOS",
}

export const BlockchainEnvs = Object.values(BlockchainEnv)

/**
 * An abstract Event which is scope to a particular Blockchain Environment.
 */
export abstract class ChainScopedEvent extends Event {
  chainEnv: BlockchainEnv

  constructor(name: string, chainEnv: BlockchainEnv) {
    super(name)
    this.chainEnv = chainEnv
  }
}

/**
 * todo add comment
 */
export interface IEvmAccountDetails {
  address?: Address
}

/**
 * todo add comment
 */
export interface ITezosAccountDetails {
  address?: string
}

type WConn_WalletChangedEventDataTypemap = {
  [E in BlockchainEnv]: {
    [BlockchainEnv.EVM]: {
      account: IEvmAccountDetails | null
    }
    [BlockchainEnv.TEZOS]: {
      account: ITezosAccountDetails | null
    }
  }[E]
}

/**
 * Event Emitted when a wallet from a blockchain environment is connected. This
 * event doesn't mean the Wallets Connector is fully ready, as some other chain
 * environments may not be ready then.
 */
export class WConn_WalletChangedEvent<
  Env extends BlockchainEnv = BlockchainEnv,
> extends ChainScopedEvent {
  constructor(
    chainEnv: Env,
    public data: WConn_WalletChangedEventDataTypemap[Env]
  ) {
    super("wallet-changed", chainEnv)
  }
}

/**
 * Emitted when the Wallets Connector has performed all the initialisation
 * checks and is fully ready to receive commands. This event is also emitted
 * when the internal state is properly synced and consumers can assume values
 * they will get imperatively from the Wallets Connector are synced.
 */
export class WConn_WalletsConnectorReady extends Event {
  constructor() {
    super("ready")
  }
}

export type WalletsConnectorEventsMap = {
  "wallet-changed": WConn_WalletChangedEvent
  ready: WConn_WalletsConnectorReady
}

export class WalletsConnectorEventTarget extends TypedEventTarget<WalletsConnectorEventsMap> {}
