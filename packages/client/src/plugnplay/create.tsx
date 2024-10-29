/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { createClient, ICreateClientParams } from "@/basic/_index.js"
import { cleanup, intialization, invariant } from "@fxhash/utils"
import { isBrowser } from "@fxhash/utils-browser"
import {
  GraphqlWrapper,
  defaultStorageDriver,
  cookieCredentials,
  jwtCredentials,
  UserSourceEventEmitter,
  Web3AuthLoginPayload,
  IWalletsAccountSource,
} from "@fxhash/core"
import { BlockchainNetwork } from "@fxhash/shared"
import {
  IAppMetadata,
  config as fxConfig,
  isAppMetadataValid,
} from "@fxhash/config"
import { getDefaultConfig, useModal } from "connectkit"
import { createConfig, Config } from "wagmi"
import { QueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { ClientPlugnPlayOptions, IClientPlugnPlay } from "./_interfaces.js"
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

export function createClientPlugnPlay({
  metadata,
  wallets,
  web3Auth,
  safeDomWrapper,
  credentials = "jwt",
}: ClientPlugnPlayOptions): IClientPlugnPlay {
  // checks on provided values
  invariant(metadata, "metadata required")
  invariant(wallets, "missing wallets configuration")
  const metadataValidRes = isAppMetadataValid(metadata)
  if (metadataValidRes.isFailure()) throw metadataValidRes.error

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
    web3auth: web3Auth
      ? safeDomWrapper
        ? { safeDomWrapper }
        : true
      : undefined,
  }

  const gql = new GraphqlWrapper()
  const storage = defaultStorageDriver()
  const creds =
    credentials === "jwt" ? jwtCredentials(gql) : cookieCredentials()

  const client = createClient({
    metadata,
    wallets: walletsConfig,
    authentication: true,
    drivers: {
      gql,
      storage,
      credentials: creds as any,
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
      invariant(
        isBrowser(),
        "fxhash Client PlugnPlay can only be initialised in a browser context."
      )
      init.start("client can only be initialized once!")
      if (_manageConnectKit) await _initConnectKit()
      clean.add(
        client.userSource.emitter.pipe("account-changed", emitter),
        client.userSource.emitter.pipe("wallets-changed", emitter),
        client.userSource.emitter.pipe("user-changed", emitter),
        client.userSource.emitter.pipe("error", emitter)
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

    async unlinkWallet(address) {
      const activeSource = client.userSource.activeSource()
      if (
        typeof (activeSource as IWalletsAccountSource).unlinkWallet ===
        "function"
      ) {
        return (activeSource as IWalletsAccountSource).unlinkWallet(address)
      }
      throw Error("current source doesn't support unlinking wallet")
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
      invariant(client.walletSources.web3auth, "no web3auth wallet configured")
      return client.walletSources.web3auth.login(payload)
    },

    async requestEmailOTP(email: string) {
      invariant(client.walletSources.web3auth, "no web3auth wallet configured")
      return client.walletSources.web3auth.emailRequestOTP(email)
    },
  }
}
