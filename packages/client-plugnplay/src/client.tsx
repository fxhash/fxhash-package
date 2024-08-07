/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { AtLeastOne, cleanup, intialization } from "@fxhash/utils"
import { isBrowser } from "@fxhash/utils-browser"
import {
  GraphqlWrapper,
  defaultStorageDriver,
  jwtCredentials,
  UserSourceEventEmitter,
  createClient,
  ICreateClientParams,
  Web3AuthLoginPayload,
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
import { supportedEvmChains, viemSimpleTransports } from "@fxhash/eth"
import { createBeaconConfig } from "@fxhash/tez"

type EvmConfigOptions = {
  metadata: IAppMetadata
  projectId: string
}

const createWagmiConfig = ({ metadata, projectId }: EvmConfigOptions) => {
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
   * In case your application would alter the content of `document.body`
   * such that it removes the <iframe> this module adds to
   * `document.body`, you should provide such wrapper here. It should be
   * a safe html element in which the <iframe> can be appended.
   *
   * @default document.body
   */
  safeDomWrapper?: HTMLElement
}

export function createClientPlugnPlay({
  metadata,
  wallets,
  safeDomWrapper,
}: ClientPlugnPlayOptions): IClientPlugnPlay {
  invariant(
    isBrowser(),
    "fxhash Client PlugnPlay can only be instanciated in a browser context."
  )

  // checks on provided values
  invariant(metadata, "metadata required")
  invariant(wallets, "missing wallets configuration")

  const init = intialization()
  const clean = cleanup()
  const emitter = new UserSourceEventEmitter()

  // whether this client is managing connect kit or not
  const _manageConnectKit =
    typeof wallets.evm !== "undefined"
      ? typeof wallets.evm.manageConnectKitProvider !== "undefined"
        ? wallets.evm.manageConnectKitProvider
        : true // default if EVM support
      : false // default if no EVM support

  const walletsConfig: NonNullable<ICreateClientParams["wallets"]> = {
    window: {
      // @ts-expect-error
      evm: wallets.evm
        ? {
            wagmiConfig: createWagmiConfig({
              projectId: wallets.evm.walletConnectProjectId,
              metadata,
            }),
          }
        : undefined,

      // @ts-expect-error
      tezos: wallets.tezos
        ? {
            beaconConfig: createBeaconConfig(metadata),
          }
        : undefined,
    },
    web3auth: {
      safeDomWrapper,
    },
  }

  const gql = new GraphqlWrapper()
  const storage = defaultStorageDriver()
  const credentials = jwtCredentials(gql)

  const client = createClient({
    metadata,
    wallets: walletsConfig,
    authentication: true,
    drivers: {
      gql,
      storage,
      credentials: credentials as any,
    },
  })

  let _openConnectKitModal: (() => void) | null = null

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
      invariant(_manageConnectKit, "should be true")
      invariant(walletsConfig.window?.evm?.wagmiConfig, "should be defined")
      const queryClient = new QueryClient()
      // wraps ConnectKit useModal().setOpen() to expose to this class context
      const ConnectKitDriver = () => {
        _openConnectKitModal = useModal().setOpen.bind(null, true)
        useEffect(() => resolve(), [])
        return null
      }
      createRoot(document.createElement("div")).render(
        <DependencyProviders
          wagmiConfig={walletsConfig.window.evm.wagmiConfig}
          queryClient={queryClient}
        >
          <ConnectKitDriver />
        </DependencyProviders>
      )
    })
  }

  function requestConnection(network: BlockchainNetwork) {
    init.check()
    invariant(
      client.walletSources.window,
      "cannot request connection if no window wallets"
    )
    // on EVM use connectKit, need to bypass call to wallets source
    if (network === BlockchainNetwork.ETHEREUM && _manageConnectKit) {
      _openConnectKitModal?.()
      return
    }
    // otherwise use native requestConnection from SDK
    client.walletSources.window.requestConnection(network)
  }

  return {
    gql,
    config: {
      wagmi: walletsConfig.window!.evm?.wagmiConfig,
      fxhash: fxConfig,
    },

    source: client.userSource,
    emitter,
    connectWallet: requestConnection,

    async init() {
      init.start("client can only be initialized once!")
      if (_manageConnectKit) await _initConnectKit()
      clean.add(
        client.userSource.emitter.pipe("account-changed", emitter),
        client.userSource.emitter.pipe("wallets-changed", emitter),
        client.userSource.emitter.pipe("user-changed", emitter),
        client.userSource.emitter.on("error", err => {
          // todo: handle error here
          console.log(err)
        })
      )
      await client.userSource.init()
      init.finish()
    },

    disconnectWallet(network: BlockchainNetwork) {
      init.check()
      return client.userSource.disconnectWallet(network)
    },

    disconnectAllWallets() {
      init.check()
      return client.userSource.disconnectAllWallets()
    },

    logoutAccount() {
      init.check()
      return client.userSource.logoutAccount()
    },

    release() {
      init.check()
      clean.clear()
    },

    async loginWeb2(payload: Web3AuthLoginPayload) {
      return client.walletSources.web3auth?.login(payload)
    },

    async requestEmailOTP(email: string) {
      invariant(client.walletSources.web3auth, "no web3auth wallet")
      return client.walletSources.web3auth.emailRequestOTP(email)
    },
  }
}
