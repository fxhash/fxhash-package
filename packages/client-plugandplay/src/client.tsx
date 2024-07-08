/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { FxhashClientBasic } from "@fxhash/client-basic"
import { NonNullableFields, intialization } from "@fxhash/utils"
import {
  type Authenticator,
  type IGraphqlWrapper,
  type IWindowWalletsConnectorConfig,
  WindowWalletsConnector,
  type GetSingleUserAccountResult,
  type WalletsOrchestrator,
} from "@fxhash/client-sdk"
import { BlockchainEnv } from "@fxhash/shared"
import { config as fxConfig } from "@fxhash/config"
import { base, baseSepolia, mainnet, sepolia } from "viem/chains"
import { getDefaultConfig, ConnectKitProvider, useModal } from "connectkit"
import { WagmiProvider, createConfig, http, Config } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { ClientPlugnPlayEventEmitter } from "./events.js"

type ClientPlugnPlayOptions = {
  wallets?: IWindowWalletsConnectorConfig

  /**
   * Whether the PlugnPlay client should use `ConnectKit`. `ConnectKit` provides
   * an inituitive and flexible UI for connecting a wallet on EVM chains, it is
   * used by default by client. If for some reason you would like to opt out of
   * it, this is the option for you.
   *
   * **Warning**: setting this value to `false` implies that you have to provide
   * some solution for connecting an EVM wallet youself.
   *
   * @default true
   */
  useConnectKit?: boolean
}

const defaultOptions: NonNullableFields<ClientPlugnPlayOptions> = {
  wallets: {
    evm: true,
    tezos: true,
  },
  useConnectKit: true,
}

const chains =
  fxConfig.config.envName === "production"
    ? ([mainnet, base] as const)
    : ([sepolia, baseSepolia] as const)

const projectId = fxConfig.config.walletConnectId

type EvmConfigMetadata = {
  name: string
  description: string
  url: string
  icon?: string
}

type EvmConfigOptions = {
  metadata: EvmConfigMetadata
  projectId: string
}

const defaultEvmConfigMetadata: NonNullableFields<EvmConfigMetadata> = {
  name: "FXHASH",
  description:
    "fxhash is an open platform to mint and collect Generative Tokens.",
  url: "https://fxhash.xyz",
  icon: "https://gateway.fxhash2.xyz/ipfs/QmUQUtCenBEYQLoHvfFCRxyHYDqBE49UGxtcp626FZnFDG",
}

export const fxCreateWagmiConfig = ({
  metadata,
  projectId,
}: EvmConfigOptions) => {
  metadata = {
    ...defaultEvmConfigMetadata,
    ...metadata,
  }
  return createConfig(
    getDefaultConfig({
      chains: chains,
      transports: Object.fromEntries(chains.map(chain => [chain.id, http()])),
      walletConnectProjectId: projectId,
      ssr: true,
      // metadata config
      appName: metadata.name,
      appDescription: metadata.description,
      appUrl: metadata.url,
      appIcon: metadata.icon,
    })
  ) as Config
}

const queryClient = new QueryClient()

/**
 * The fxhash ClientPlugNPlay provides a fully-featured and opiniated wallets &
 * accounts implementation, with a simple and high-level API for building
 * application with fxhash in the simplest manner, without thinking too much
 * about the underlying stack for interacting with EVM & TEZOS wallets.
 */
export class ClientPlugnPlay extends ClientPlugnPlayEventEmitter {
  private _init = intialization()
  private _clientBasic: FxhashClientBasic
  private _windowConnector: WindowWalletsConnector
  private _openConnectKitModal: (() => void) | null = null
  private _wagmiConfig: Config
  private _useConnectKit: boolean
  private _cleanup: (() => void)[] = []

  constructor(options: ClientPlugnPlayOptions) {
    super()

    const _options: ClientPlugnPlayOptions = {
      ...defaultOptions,
      ...options,
    }

    /**
     * Todo improve settings passed (should be high level as possible) & process
     * these properly. API should be straightforward and cohesive.
     */
    this._wagmiConfig = fxCreateWagmiConfig({
      metadata: defaultEvmConfigMetadata,
      projectId: fxConfig.config.walletConnectId,
    })

    this._windowConnector = new WindowWalletsConnector(
      options.wallets || {
        evm: {
          wagmiConfig: this._wagmiConfig as any,
        },
        tezos: true,
      }
    )
    this._clientBasic = new FxhashClientBasic({
      wallets: {
        connectors: [this._windowConnector],
      },
    })

    this._useConnectKit = _options.useConnectKit || false
  }

  public get gql(): IGraphqlWrapper {
    return this._clientBasic.gql
  }

  public get auth(): Authenticator {
    return this._clientBasic.auth
  }

  public get account(): GetSingleUserAccountResult | null {
    return this.auth.account
  }

  public get wallets(): WalletsOrchestrator {
    return this._clientBasic.wallets
  }

  async init() {
    this._init.start()

    // if the application didn't provide a way to request an EVM connection,
    // then the PlugNPlay client will instanciate ConnectKit to provide a
    // connection modal for requestion connection.
    if (this._useConnectKit) {
      await this._initConnectKit()
    }

    this._cleanup.push(
      /**
       * Hook on the `user-reconciliation-error` to handle side-effect manually
       * in here. We don't want to exposes such errors to the consumers as their
       * resolution might be a bit challenging not knowing our stack.
       */
      this._clientBasic.on("user-reconciliation-error", err => {
        // todo: handle error
      }),
      // forward other events
      this._clientBasic.pipe("valid-user-changed", this),
      this._clientBasic.pipe("wallet-changed", this)
    )

    await this._clientBasic.init()
    this._init.finish()
  }

  /**
   * ConnectKit is a great interface for handling wallet connections, however
   * it is only available for React, so this basically creates a dom element
   * in which it renders what's needed for ConnectKit to work.
   *
   * Eventually it exposes the some utility functions (only accessible using
   * React hooks), to this class context.
   *
   * @note It's not even needed to "render" to inject the <div> in which jsx is
   * rendered because ConnectKit injects the modal directly into the DOM using
   * Portals
   * <https://github.com/family/connectkit/blob/3db9c7538eadf29ad266c0fe4819b9bc15c42f05/packages/connectkit/src/components/Common/Modal/index.tsx#L640>
   */
  private _initConnectKit() {
    return new Promise<void>(resolve => {
      // wraps ConnectKit useModal().setOpen() to expose to this class context
      const ConnectKitDriver = () => {
        this._openConnectKitModal = useModal().setOpen.bind(null, true)
        useEffect(() => resolve(), [])
        return null
      }
      createRoot(document.createElement("div")).render(
        <WagmiProvider config={this._wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              <ConnectKitDriver />
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      )
    })
  }

  /**
   * Requests a wallet connection on the given blockchain environment. For
   * Tezos, Beacon Wallet will be used under the hood and for EVM, ConnectKit
   * will be used.
   * @param env Blockchain environment for which connection should be made
   */
  public requestConnection(env: BlockchainEnv) {
    // on EVM we use connectKit so bypass call to the connector here
    if (env === BlockchainEnv.EVM && this._useConnectKit) {
      this._openConnectKitModal?.()
      return
    }

    // otherwise we use the native requestConnection from our SDK
    this._windowConnector.requestConnection(env)
  }

  public release() {
    this._cleanup.forEach(fn => fn())
  }
}
