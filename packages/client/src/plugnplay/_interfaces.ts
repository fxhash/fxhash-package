import type {
  IUserSource,
  UserSourceEventEmitter,
  IWeb3AuthWalletsSource,
  IGraphqlWrapper,
  IAccountSource,
} from "@fxhash/core"
import { BlockchainNetwork } from "@fxhash/shared"
import { Config as WagmiConfig } from "@wagmi/core"
import { IAppMetadata, config as fxConfig } from "@fxhash/config"
import { AtLeastOne } from "@fxhash/utils"

/**
 * Options for creating a Client PlugnPlay
 */
export type ClientPlugnPlayOptions = {
  /**
   * Some metdata about your application, which will be used by wallets to
   * display details about your app when you request some wallet interaction
   * from the url.
   *
   * **Important**: the URL must match the URL under which the application is
   * served !
   */
  metadata: IAppMetadata

  /**
   * Define the wallets you want your app to setup.
   */
  wallets: AtLeastOne<{
    /**
     * Set this key if you want support for EVM wallets.
     */
    evm: {
      /**
       * Your application Wallet Connect project id. The plug-n-play client uses
       * ConnectKit for providing a connection interface (which itself uses
       * Wallet Connect, an industry standard wallet connection solution).
       * <https://docs.walletconnect.com/appkit/react/notifications/embedded-widget/usage>
       */
      walletConnectProjectId: string

      /**
       * Whether the client should instanciate ConnectKit and manage it on its
       * own. You may want to set this to `false` when you already have a
       * ConnectKit implementation in your app.
       *
       * **Warning**: setting this value to `false` implies that you have to
       * provide some solution for connecting an EVM wallet youself.
       *
       * @default true
       */
      manageConnectKitProvider?: boolean
    }

    /**
     * Set this key if you want support for tezos wallet.
     */
    tezos: true
  }>

  /**
   * How should credentials be stored. If you are building a 3rd party
   * application which isn't going to be hosted on the `.fxhash.xyz` domain,
   * then you should use `jwt`
   *
   * @default "jwt"
   */
  credentials?: "jwt" | "cookie"

  /**
   * Set this key if you want support for login via socials.
   */
  socialLogin?: boolean

  /**
   * In case your application would alter the content of `document.body`
   * such that it removes the <iframe> this module adds to
   * `document.body`, you should provide such wrapper here. It should be
   * a safe html element in which the <iframe> can be appended.
   *
   * @default document.body
   */
  safeDomWrapper?: HTMLElement
}

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
   * Can be called to trigger events for connecting a wallet on a given network
   * asynchronously.
   * @param network Network on which a connection attempt should be made.
   * @returns A promise which resolves to the address of the connected wallet.
   */
  connectWalletAsync: (network: BlockchainNetwork) => Promise<string>

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
   * Unlink a wallet from the account. If the wallet is currently connected it
   * will disconnect such wallet from the account.
   * @param address Address of the wallet to unlink from the account
   */
  unlinkWallet: IAccountSource["unlinkWallet"]

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

  /**
   * Override the function to initialize the ConnectKit. This function will be called
   * when the client is initialized.
   */
  setConnectKitInit(initFn: () => Promise<void>): void

  /**
   * Override the function to open the ConnectKit modal.
   */
  setConnectKitModal(openFn: () => void): void
}
