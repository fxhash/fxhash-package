import {
  IUserSource,
  UserSourceEventEmitter,
  Web3AuthLoginPayload,
  IWeb3AuthWalletsSource,
  IGraphqlWrapper,
} from "@fxhash/client-sdk"
import { BlockchainNetwork } from "@fxhash/shared"
import { Config as WagmiConfig } from "@wagmi/core"
import { config as fxConfig } from "@fxhash/config"

export interface IClientPlugnPlay {
  /**
   * Active config
   */
  config: {
    wagmi?: WagmiConfig
    /**
     * The fxhash config which is currently being used by the client.
     */
    fxhash: typeof fxConfig
  }

  /**
   * The main user source, which can be considered as the best entry point to
   * hook on change events.
   */
  source: IUserSource

  /**
   * Shorthand for `source.emitter`
   */
  emitter: UserSourceEventEmitter

  /**
   * Can be called to trigger events for connecting a wallet on a given network.
   *
   * @param network Network on which a connection attempt should be made.
   */
  connectWallet: (network: BlockchainNetwork) => void

  /**
   * Initialize the whole client. Must be called before using any of the client
   * abilities a some may be inconcistence
   */
  init: () => Promise<void>

  /**
   * Disconect the wallets connected on the Given
   */
  disconnectWallet: (network: BlockchainNetwork) => Promise<void>

  gql: IGraphqlWrapper

  // todo: comments
  disconnectAllWallets: () => Promise<void>
  requestEmailOTP: IWeb3AuthWalletsSource["emailRequestOTP"]
  loginWeb2: (options: Web3AuthLoginPayload) => Promise<void>
  logoutAccount: () => Promise<void>
  release: () => void
}
