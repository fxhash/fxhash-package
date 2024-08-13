import type {
  IUserSource,
  UserSourceEventEmitter,
  Web3AuthLoginPayload,
  IWeb3AuthWalletsSource,
  IGraphqlWrapper,
} from "@fxhash/core"
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

  /**
   * The GraphQL wrapper instance which should be used to make authenticated
   * queries. The GraphQL client is synced with the currently authenticated
   * user so that queries are properly authenticated.
   *
   * **ℹ️ Note**: If you wish to use your own GraphQL client, you should make
   * sure to add the necessarry http headers based on the currently
   * authenticated user.
   */
  gql: IGraphqlWrapper

  /**
   * Attempt to disconnect all the wallets currently connected to your
   * application. If a user account is authenticated, this may trigger a
   * logout as accounts are required to have wallet accounts attached to them.
   */
  disconnectAllWallets: () => Promise<void>

  /**
   * Initiate an OTP email verification flow. This will send an OTP to the
   * provided email address, which can then be used to log the user in with
   * {@link loginWeb2}
   */
  requestEmailOTP: IWeb3AuthWalletsSource["emailRequestOTP"]

  /**
   * Login to fxhash using fxhash embedded wallet and a web2 source of login
   * (email, google, discord, etc...). This will generate a wallet linked to the
   * source of authentication, which can be used in the browser context.
   */
  loginWeb2: IWeb3AuthWalletsSource["login"]

  /**
   * Logout the account currently authenticated. If the account is linked to
   * a wallet currently connected, this wallet will be disconnected
   * automatically.
   */
  logoutAccount: () => Promise<void>

  /**
   * Release the Client (detaches listeners, frees allocated resources).
   * Once called the client cannot be used anymore.
   */
  release: () => void
}
