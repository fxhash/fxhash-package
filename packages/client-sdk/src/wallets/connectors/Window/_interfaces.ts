/**
 * Interface shared by all the network-specific Window Wallet Connectors.
 */
export interface IWindowWalletConnector {
  /**
   * Request a connection to the user, which will prompt an interface for them
   * to pick their Wallet solution of choice.
   */
  requestConnection: () => void
}
