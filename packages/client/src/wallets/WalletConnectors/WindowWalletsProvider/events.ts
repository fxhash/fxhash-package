/**
 * @author fxhash
 *
 * @dev The events in this file should not be exported globally as they are only
 * used internally by the WindowWalletsConnector.
 */

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

/**
 * Emitted when a connector is ready.
 */
export class WindowWalletConnectorReady extends Event {
  constructor() {
    super("ready")
  }
}

export type WindowWalletEventsMap = {
  connected: WindowWalletConnected
  disconnected: WindowWalletDisconnected
  changed: WindowWalletChanged
  ready: WindowWalletConnectorReady
}
