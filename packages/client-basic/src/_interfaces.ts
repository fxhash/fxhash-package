import { IAppMetadata } from "@fxhash/config"
import { AtLeastOne } from "@fxhash/utils"
import {
  type WagmiConfig,
  type BeaconConfig,
  type Hex,
  IGraphqlWrapper,
  Storage,
  ICredentialsDriver,
  IWindowWalletsSource,
  IWeb3WalletsSource,
  IWalletsSource,
  IUserSource,
} from "@fxhash/client-sdk"

/**
 * A declarative object config which will be parsed by the client at its
 * instanciation to define which modules should be instanciated. This provides
 * an API which can be consumed more easily by developpers.
 */
export interface IClientBasicParams {
  /**
   * Meta info about the application. Can be used by wallets to scope the
   * application making requests for instance.
   */
  metadata: IAppMetadata

  /**
   * Provide an object configuration to define which kinds of wallet you want to
   * instanciate with the client. If nothing is provided, there won't be any
   * walet solution instanciated.
   * Note: depending on the config provided here, some properties exposed by the
   * client will not be available.
   */
  wallets?: AtLeastOne<{
    /**
     * If this key is present, a window wallet client will be instanciated on
     * the requested blockchains.
     */
    window: AtLeastOne<{
      /**
       * If defined, the client will instanciate a window wallet listener and
       * will make an Ethereum Wallet manager available when a connection
       * happens, depending on the provided config.
       */
      evm: {
        /**
         * A WAGMI configuration which will be used for any WAGMI operation by
         * the fxhash client.
         */
        wagmiConfig: WagmiConfig
      }

      /**
       * If defined, the client will instanciate a tezos wallet listener and
       * will make a Tezos Wallet manager available when a connection happens.
       * If `true` is passed, a Beacon config will be created using the provided
       * `metadata`, otherwise a Beacon config must be passed.
       */
      tezos: {
        /**
         * A Beacon wallet config.
         */
        beaconConfig: BeaconConfig
      }
    }>

    /**
     * If defined, will instanciate fxhash web3auth implementation, which makes
     * available some utilities to have self-custody wallets created from oauth
     * providers such as Google, Apple, Facebook, etc... and email.
     */
    web3auth: true

    /**
     * If defined, will instanciate some in-memory wallets where the provided
     * private keys are used to sign bytes.
     * **Warning**: This should not be exposed to a public-facing front-end
     * application, and even on backend applications this should be used in an
     * isolated environment. Once a private key is exposes, the wallet can be
     * considered as compromised.
     */
    privateKeys: AtLeastOne<{
      evm: Hex
      tezos: string
    }>
  }>

  /**
   * If you want to have access to authentication-gated features (such as
   * off-chain account management, protected pages, etc...), set this boolean
   * to true.
   *
   * If so, the client will do its best attempt to authenticate the user against
   * fxhash backend services (either automatically with Private Key, Web3Auth or
   * by requesting the signature of a payload with traditionnal wallets).
   *
   * If set to true, the event `user-changed` will be emitted whenever a user
   * has successfully connected a wallet & authenticated.
   *
   * @default false
   */
  authentication?: boolean

  /**
   * Drivers are utility modules which are used by the client to perform actions
   * with side-effects indenpendant to its implementation (storing data, network
   * calls, etc..).
   * If undefined, some default drivers will be instanciated.
   */
  drivers?: {
    /**
     * A wrapper arround an `urql` client which exposes some interface to
     * manipulate some of the client options (such as http headers for instance)
     * @default new() The client will instanciate its own graphql client.
     */
    gql?: IGraphqlWrapper

    /**
     * An interface to store semi-persistent and sensitive data. This is used
     * by authentication modules to store account details for instance.
     * @default new() The client will instanciate a new Storage using the best
     * available option (on browser it will be the localStorage for instance)
     */
    storage?: Storage

    /**
     * An interface which handles credentials (ex Cookie, JWT).
     * @default jwtCredentials(gql) JWT credentials stored on the provided
     * Storage (or default if none)
     */
    credentials?: ICredentialsDriver
  }
}

export type WalletSourcesMap = {
  /**
   * The window wallets source.
   */
  window: IWindowWalletsSource | null

  /**
   * The Web3Auth wallets source.
   */
  web3auth: IWeb3WalletsSource | null

  /**
   * The Private Key wallets source.
   */
  privateKeys: IWalletsSource | null
}

export interface IUserClient {
  /**
   * A user source, which exposes some utilities to get user details and
   * listen events emitted when user details change.
   */
  userSource: IUserSource
}

export interface IClientBasic extends IUserClient {
  /**
   * A map of the wallets instanciated, based on the provided configuration.
   * **Note**: If a wallet wasn't declared in the provided config, its value
   * will be null in the map.
   */
  walletSources: WalletSourcesMap
}
