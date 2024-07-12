/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { cleanup, intialization } from "@fxhash/utils"
import { isBrowser } from "@fxhash/utils-browser"
import {
  windowWallets,
  authWallets,
  GraphqlWrapper,
  Storage,
  jwtCredentials,
  walletsAndAccount,
  UserSourceEventEmitter,
} from "@fxhash/client-sdk"
import { BlockchainNetwork, invariant } from "@fxhash/shared"
import { IAppMetadata, config as fxConfig } from "@fxhash/config"
import { getDefaultConfig, useModal } from "connectkit"
import { createConfig, Config } from "wagmi"
import { QueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { IClientPlugnPlay } from "./_interfaces.js"
import { DependencyProviders } from "./providers.js"
import { supportedEvmChains } from "@fxhash/eth"
import { viemSimpleTransports } from "@fxhash/eth"

type EvmConfigOptions = {
  metadata: IAppMetadata
  projectId: string
}

export const fxCreateWagmiConfig = ({
  metadata,
  projectId,
}: EvmConfigOptions) => {
  return createConfig(
    getDefaultConfig({
      chains: supportedEvmChains,
      transports: viemSimpleTransports,
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

export function clientPlugnPlay({
  metadata,
  manageConnectKit = true,
}: ClientPlugnPlayOptions): IClientPlugnPlay {
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

  const gql = new GraphqlWrapper()

  // handles window object wallets (eip1933 & tzip10)
  const _windowWallets = windowWallets({
    evm: {
      // todo: better way for the default config, like tezos
      config: fxCreateWagmiConfig({
        metadata: defaultEvmConfigMetadata,
        projectId,
      }) as any,
    },
    tezos: true, // ""
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
      const queryClient = new QueryClient()
      // wraps ConnectKit useModal().setOpen() to expose to this class context
      const ConnectKitDriver = () => {
        _openConnectKitModal = useModal().setOpen.bind(null, true)
        useEffect(() => resolve(), [])
        return null
      }
      createRoot(document.createElement("div")).render(
        <DependencyProviders
          wagmiConfig={_wagmiConfig}
          queryClient={queryClient}
        >
          <ConnectKitDriver />
        </DependencyProviders>
      )
    })
  }

  function requestConnection(network: BlockchainNetwork) {
    init.assertFinished()
    // on EVM use connectKit, need to bypass call to wallets source
    if (network === BlockchainNetwork.ETHEREUM && manageConnectKit) {
      _openConnectKitModal?.()
      return
    }
    // otherwise use native requestConnection from SDK
    _windowWallets.requestConnection(network)
  }

  return {
    config: {
      wagmi: _wagmiConfig,
      fxhash: fxConfig,
    },

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
      init.assertFinished()
      return _windowWallets.disconnect(network)
    },

    logout() {
      init.assertFinished()
      return _accountSource.logout()
    },

    release() {
      init.assertFinished()
      clean.clear()
    },

    // todos
    // - login oauth
    // - setup web3auth wallets
  }
}
