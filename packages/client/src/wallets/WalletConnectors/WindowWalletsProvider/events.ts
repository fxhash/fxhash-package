/**
 * @author fxhash
 *
 * @dev The events in this file should not be exported globally as they are only
 * used internally by the WindowWalletsConnector.
 */

import { GetAccountReturnType } from "@wagmi/core"
import { type AccountInfo } from "@airgap/beacon-sdk"

/**
 * Emitted when a wallet is connected (as a result of an initial connexion
 * or as a change of wallet).
 */
export class WindowWalletConnected extends Event {
  constructor() {
    super("connected")
  }
}

/**
 * Emitted when a wallet is disconnected.
 */
export class WindowWalletDisconnected extends Event {
  constructor() {
    super("disconnected")
  }
}

export class WindowWalletChanged extends Event {
  constructor() {
    super("changed")
  }
}

export class EventData<Data = any> extends Event {
  public data: Data

  constructor(type: string, data: Data) {
    super(type)
    this.data = data
  }
}

export interface EvmWindowWalletChangedData {
  account: GetAccountReturnType
}

export class EvmWindowWalletChanged extends EventData<EvmWindowWalletChangedData> {
  constructor(data: EvmWindowWalletChangedData) {
    super("changed", data)
  }
}

export interface TezWindowWalletChangedData {
  account?: AccountInfo
}

export class TezWindowWalletChanged extends EventData<TezWindowWalletChangedData> {
  constructor(data: TezWindowWalletChangedData) {
    super("changed", data)
  }
}

/**
 * Emitted when a connector is ready.
 */
export class WindowWalletConnectorReady extends Event {
  constructor() {
    super("ready")
  }
}

export type TezWindowWalletEventsMap = {
  connected: WindowWalletConnected
  disconnected: WindowWalletDisconnected
  changed: TezWindowWalletChanged
}

export type EvmWindowWalletEventsMap = {
  connected: WindowWalletConnected
  disconnected: WindowWalletDisconnected
  changed: EvmWindowWalletChanged
}
