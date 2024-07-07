/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 *
 * Wallets Connectors implement an EventTarget to emit and subscribe to events
 * happening through their various lifecycle. It is not expected that consumers
 * will subscribe to such events, rather they will subscribe to the Wallets
 * Orchestrator for all their events.
 *
 * The Wallet Orchestrator will listen to Wallets Connectors lifecycle events
 * for its internal logic and will forward some of these events for an easier
 * usage by API consumers.
 */

import { BlockchainEnv } from "@fxhash/shared"
import { Address } from "viem"
import { EventEmitter } from "@fxhash/utils"

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
  address: Address
}

/**
 * todo add comment
 */
export interface ITezosAccountDetails {
  address: string
}

export type WConn_WalletChangedEvent =
  | {
      env: BlockchainEnv.EVM
      account: IEvmAccountDetails | null
    }
  | {
      env: BlockchainEnv.TEZOS
      account: ITezosAccountDetails | null
    }

export type WalletsConnectorEventsMap = {
  "wallet-changed": WConn_WalletChangedEvent
  ready: undefined
}

export class WalletsConnectorEventEmitter extends EventEmitter<WalletsConnectorEventsMap> {}
