"use client"
import {
  PropsWithChildren,
  createContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react"
import { FxhashClient } from "../../client/index.js"
import { BlockchainType, PromiseResult, failure, success } from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { EthereumWalletManager } from "@fxhash/eth"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { EthereumWallet } from "./EthereumWallet.js"
import { TezosWallet } from "./TezosWallet.js"
import { TezosToolkit } from "@taquito/taquito"
import {
  ClientAuthenticationError,
  LocalStorageDriver,
  Storage,
  WalletDoesntBelongToUserError,
  WalletsOrchestrator,
  WindowWalletsConnector,
  WrongWalletActivatedError,
} from "@/index.js"
import { isTezosWalletManager } from "@/util/types.js"
import { config as fxConfig } from "@fxhash/config"
import { WagmiContext } from "wagmi"
import { createConfig, http, Config } from "@wagmi/core"
import { baseSepolia, sepolia } from "viem/chains"
import { UserReconciliation } from "@/user-reconciliation/index.js"

export enum ClientContextEvent {
  onConnect = "onConnect",
  onDisconnect = "onDisconnect",
  onAuthenticate = "onAuthenticate",
}

export interface TezosWalletsConfig {
  tezosToolkit?: TezosToolkit
  beaconWallet?: BeaconWallet
}

export type WalletsConfig =
  | {
      [BlockchainType.TEZOS]: TezosWalletsConfig
      [BlockchainType.ETHEREUM]?: true
    }
  | {
      [BlockchainType.TEZOS]?: TezosWalletsConfig
      [BlockchainType.ETHEREUM]: true
    }

export interface ClientProviderConfig {
  wallets: WalletsConfig
  wagmiConfig: Config
  auth: "cookie" | "jwt"
}

export interface ClientProviderUserConfig {
  wallets: WalletsConfig
  wagmiConfig: Config
  auth?: "cookie" | "jwt"
}

export type WalletManagers = {
  [BlockchainType.TEZOS]: TezosWalletManager | null
  [BlockchainType.ETHEREUM]: EthereumWalletManager | null
  [BlockchainType.BASE]: EthereumWalletManager | null
}

export type ClientError =
  | null
  | WalletDoesntBelongToUserError
  | WrongWalletActivatedError

export interface ClientContext {
  client: FxhashClient
  tezosWalletManager: TezosWalletManager | null
  ethereumWalletManager: EthereumWalletManager | null
  isConnected: boolean
  setWalletManager: (
    chain: BlockchainType,
    manager: TezosWalletManager | EthereumWalletManager | null,
    disconnect: () => void
  ) => void
  config: ClientProviderConfig
  walletManagers: WalletManagers
  error: ClientError
  setError: (error: ClientError) => void
}

const defaultWagmiConfig = createConfig({
  chains: [sepolia, baseSepolia],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
})

const defaultClientContext: ClientContext = {
  isConnected: false,
  client: new FxhashClient({ storage: new Storage(new LocalStorageDriver()) }),
  tezosWalletManager: null,
  ethereumWalletManager: null,
  setWalletManager: () => {},
  config: {
    wallets: { [BlockchainType.ETHEREUM]: true },
    auth: "cookie",
    wagmiConfig: defaultWagmiConfig,
  },
  walletManagers: {
    [BlockchainType.TEZOS]: null,
    [BlockchainType.ETHEREUM]: null,
    [BlockchainType.BASE]: null,
  },
  error: null,
  setError: () => {},
}

export const ClientContext = createContext<ClientContext>(defaultClientContext)

export function ClientProvider(
  props: PropsWithChildren<{ config?: ClientProviderUserConfig }>
) {
  const [error, setError] = useState<ClientError>(null)
  const { children, config: userConfig } = props
  const config = { ...defaultClientContext.config, ...userConfig }
  const [walletManagers, _setWalletManagers] = useState<WalletManagers>(
    defaultClientContext.walletManagers
  )
  const client = useRef<FxhashClient>(defaultClientContext.client)

  // const wagmiCtx = useContext(WagmiContext)
  // const wagmiConfig = useMemo(() => {
  //   return wagmiCtx ?? defaultWagmiConfig
  // }, [wagmiCtx]) as any

  const once = useRef(false)
  useEffect(() => {
    if (once.current) return
    once.current = true
    //
    ;(async () => {
      const wallets = new WalletsOrchestrator({
        connectors: [
          new WindowWalletsConnector({
            evm: {
              wagmiConfig: config.wagmiConfig,
            },
          }),
        ],
      })

      const reconciliation = new UserReconciliation({
        authenticator: client.current.auth,
        wallets: wallets,
      })

      await client.current.init()
      await wallets.init()
      await reconciliation.init()

      console.log({ client, wallets, reconciliation })

      return () => {
        wallets.release()
      }
    })()
  }, [])

  // We use chainsSigning to avoid multiple authentications at the same time
  // This can happen because e.g. beacon wallet emits multiple events
  // const chainsSigning = useRef<BlockchainType[]>([])

  const setWalletManager = useCallback(
    async (
      chain: BlockchainType,
      manager: TezosWalletManager | EthereumWalletManager | null,
      disconnect: () => void
    ) => {
      // // We prevent multiple authentications at the same time with chainsSigning
      // if (chainsSigning.current.includes(chain)) return
      // // If we receive a wallet but the client is not authenticated we need to authenticate
      // if (!client.current.authenticated && !!manager) {
      //   chainsSigning.current.push(chain)
      //   const res = await authenticate(chain, manager)
      //   chainsSigning.current = chainsSigning.current.filter(c => c !== chain)
      //   if (res.isFailure()) {
      //     // TODO: We could change the implementation so we dont need to pass the disconnect function from the wallet providers
      //     // We would have to check within the wallet provider if the user will need to sign and send the signature to the function instead
      //     // This is just a minor improvement
      //     disconnect()
      //     return
      //   }
      // }
      _setWalletManagers(prev => ({ ...prev, [chain]: manager }))
    },
    [_setWalletManagers, walletManagers]
  )

  const twm = walletManagers[BlockchainType.TEZOS]
  const ewm = walletManagers[BlockchainType.ETHEREUM]

  const isConnected = useMemo(() => !!twm || !!ewm, [twm, ewm])
  const lastIsConnected = useRef(isConnected)

  // When all walletmanagers are disconnected we logout
  // useEffect(() => {
  //   if (lastIsConnected.current !== isConnected && !isConnected) {
  //     client.current.logout()
  //   }
  //   lastIsConnected.current = isConnected
  // }, [isConnected, lastIsConnected.current])

  return (
    <ClientContext.Provider
      value={{
        client: client.current,
        walletManagers: { ...walletManagers, [BlockchainType.BASE]: ewm },
        setWalletManager,
        tezosWalletManager: twm ? (twm as unknown as TezosWalletManager) : null,
        ethereumWalletManager: ewm
          ? (ewm as unknown as EthereumWalletManager)
          : null,
        config,
        isConnected,
        error,
        setError,
      }}
    >
      <>
        {config.wallets.ETHEREUM && <EthereumWallet />}
        {config.wallets.TEZOS && <TezosWallet config={config.wallets.TEZOS} />}
        {children}
      </>
    </ClientContext.Provider>
  )
}
