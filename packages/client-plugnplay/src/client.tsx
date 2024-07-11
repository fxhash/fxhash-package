/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { FxhashClientBasic } from "@fxhash/client-basic"
import { NonNullableFields, cleanup, intialization } from "@fxhash/utils"
import { isBrowser } from "@fxhash/utils-browser"
import {
  type IGraphqlWrapper,
  type GetSingleUserAccountResult,
  IUserSource,
  windowWallets,
  authWallets,
  GraphqlWrapper,
  Storage,
  jwtCredentials,
  walletsAndAccount,
  UserSourceEventEmitter,
} from "@fxhash/client-sdk"
import { BlockchainEnv, BlockchainNetwork, invariant } from "@fxhash/shared"
import { config as fxConfig } from "@fxhash/config"
import { base, baseSepolia, mainnet, sepolia } from "viem/chains"
import { getDefaultConfig, ConnectKitProvider, useModal } from "connectkit"
import { WagmiProvider, createConfig, http, Config } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { ClientPlugnPlayEventEmitter } from "./events.js"
import { DefaultBeaconWalletConfig } from "@fxhash/tez"

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
  private _socialConnector: SocialWalletsConnector
  private _openConnectKitModal: (() => void) | null = null
  private _wagmiConfig: Config
  private _manageConnectKit: boolean
  private _cleanup: (() => void)[] = []

  constructor(options: ClientPlugnPlayOptions) {
    super()

    invariant(
      isBrowser(),
      "fxhash ClientPlugnPlay can only be instanciated in a browser context."
    )

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

    this._socialConnector = new SocialWalletsConnector()

    this._clientBasic = new FxhashClientBasic({
      wallets: {
        connectors: [this._windowConnector, this._socialConnector],
      },
    })

    this._manageConnectKit = _options.manageConnectKit || false
  }

  public loginOAuth(options: any) {
    this._socialConnector.login(options)
  }
}

type Options = {
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
  manageConnectKit?: boolean
}

export function clientPlugnPlay({ manageConnectKit = true }: Options) {
  invariant(
    isBrowser(),
    "fxhash Client PlugnPlay can only be instanciated in a browser context."
  )

  const init = intialization()
  const clean = cleanup()
  const emitter = new UserSourceEventEmitter()

  const _wagmiConfig = fxCreateWagmiConfig({
    projectId,
    metadata: defaultEvmConfigMetadata,
  }) as any
  let _openConnectKitModal: (() => void) | null = null

  const queryClient = new QueryClient()
  const gql = new GraphqlWrapper()

  // handles window object wallets (eip1933 & tzip10)
  const _windowWallets = windowWallets({
    evm: _wagmiConfig,
    tezos: DefaultBeaconWalletConfig,
  })

  const _accountSource = authWallets({
    gqlWrapper: gql,
    storage: new Storage(),
    credentialsDriver: jwtCredentials(gql) as any,
  })

  const source = walletsAndAccount({
    wallets: _windowWallets,
    account: _accountSource,
  })

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
  const _initConnectKit = () => {
    return new Promise<void>(resolve => {
      // wraps ConnectKit useModal().setOpen() to expose to this class context
      const ConnectKitDriver = () => {
        _openConnectKitModal = useModal().setOpen.bind(null, true)
        useEffect(() => resolve(), [])
        return null
      }
      createRoot(document.createElement("div")).render(
        <WagmiProvider config={_wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              <ConnectKitDriver />
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      )
    })
  }

  function requestConnection(network: BlockchainNetwork) {
    // on EVM use connectKit, need to bypass call to wallets source
    if (network === BlockchainNetwork.ETHEREUM && manageConnectKit) {
      _openConnectKitModal?.()
      return
    }
    // otherwise use native requestConnection from SDK
    _windowWallets.requestConnection(network)
  }

  return {
    source,
    emitter,
    requestConnection,

    async init() {
      init.start()
      await _initConnectKit()
      clean.add(
        source.emitter.pipe("account-changed", emitter),
        source.emitter.pipe("wallets-changed", emitter),
        source.emitter.pipe("user-changed", emitter),
        source.emitter.on("error", err => {
          // todo: handle error here
          console.log(err)
        })
      )
      await source.init()
      init.finish()
    },

    requestDisconnection(network: BlockchainNetwork) {
      return _windowWallets.disconnect(network)
    },

    logout() {
      return _accountSource.logout()
    },

    release() {
      clean.clear()
    },

    // todos
    // - login oauth
    // - setup web3auth wallets
  }
}
