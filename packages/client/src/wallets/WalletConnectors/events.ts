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

enum BlockchainEnv {
  EVM = "EVM",
  TEZOS = "TEZOS",
}

/**
 * An abstract Event which is scope to a particular Blockchain Environment.
 */
export abstract class ChainScopedEvent extends Event {
  chainEnv: BlockchainEnv

  constructor(chainEnv: BlockchainEnv) {
    super("")
    this.chainEnv = chainEnv
  }
}

/**
 * Event Emitted when a wallet from a blockchain environment is connected. This
 * event doesn't mean the Wallets Connector is fully ready, as some other chain
 * environments may not be ready then.
 */
export class WalletConnectedEvent extends ChainScopedEvent {
  data: any

  constructor(chainEnv: BlockchainEnv, data: any) {
    super(chainEnv)
    this.data = data
  }
}

/**
 * Emitted when a wallet from a blockchain environment is disconnected.
 */
export class WalletDisconnectedEvent extends ChainScopedEvent {}

/**
 * Emitted when the Wallets Connector has performed all the initialisation
 * checks and is fully ready to receive commands. This event is also emitted
 * when the internal state is properly synced and consumers can assume values
 * they will get imperatively from the Wallets Connector are synced.
 */
export class WalletsConnectorReady extends Event {}

type WalletsConnectorEventsMap = {
  connect: WalletConnectedEvent
  disconnect: WalletDisconnectedEvent
  ready: WalletsConnectorReady
}

export class WalletsConnectorEventTarget extends TypedEventTarget<WalletsConnectorEventsMap> {}
