"use client"
import {
  PropsWithChildren,
  createContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react"
import { FxhashClient } from "../../client/index.js"
import { BlockchainType } from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { EthereumWalletManager } from "@fxhash/eth"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { EthereumWallet } from "./EthereumWallet.js"
import { TezosWallet } from "./TezosWallet.js"
import { TezosToolkit } from "@taquito/taquito"
import {
  LocalStorageDriver,
  Storage,
  WalletDoesntBelongToUserError,
} from "@/index.js"

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
  // TODO: Enable jwtAuth
  jwtAuth?: false
}

export type WalletManagers = {
  [BlockchainType.TEZOS]: TezosWalletManager | null
  [BlockchainType.ETHEREUM]: EthereumWalletManager | null
  [BlockchainType.BASE]: EthereumWalletManager | null
}

export type ClientError = null | WalletDoesntBelongToUserError

export interface ClientContext {
  client: FxhashClient
  tezosWalletManager: TezosWalletManager | null
  ethereumWalletManager: EthereumWalletManager | null
  isConnected: boolean
  setWalletManager: (
    chain: BlockchainType,
    manager: TezosWalletManager | EthereumWalletManager | null
  ) => void
  config: ClientProviderConfig
  walletManagers: WalletManagers
  error: ClientError
  setError: (error: ClientError) => void
}

const defaultClientContext: ClientContext = {
  isConnected: false,
  client: new FxhashClient({ storage: new Storage(new LocalStorageDriver()) }),
  tezosWalletManager: null,
  ethereumWalletManager: null,
  setWalletManager: () => {},
  config: { wallets: { [BlockchainType.ETHEREUM]: true } },
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
  props: PropsWithChildren<{ config: ClientProviderConfig }>
) {
  const [error, setError] = useState<ClientError>(null)
  const { children, config } = props
  const [walletManagers, _setWalletManagers] = useState<WalletManagers>(
    defaultClientContext.walletManagers
  )
  const client = useRef<FxhashClient>(defaultClientContext.client)

  async function authenticate(
    chain: BlockchainType,
    manager: TezosWalletManager | EthereumWalletManager
  ) {
    // If an account exists we need to verify it
    const account = await client.current.getAccountFromStorage()
    if (account) {
      try {
        // If we can get the profile we are authenticated
        await client.current.getProfile()
        return
      } catch (e) {
        console.log("Error getting profile", e)
        // If we are using jwtAuth we can try to refresh the token
        if (config.jwtAuth) {
          try {
            await client.current.refreshAccessToken()
            return
          } catch (e) {
            console.log("Error refreshing token", e)
          }
        }
      }
    }
    // If we don't have a session, we need to sign the challenge and do the authentication
    const { text, id } = await client.current.generateChallenge(
      chain,
      manager.address
    )
    const sig = await manager.signMessage(text)
    if (sig.isFailure()) {
      return
    }
    let publicKey
    if (chain === BlockchainType.TEZOS) {
      publicKey = await (manager as TezosWalletManager).getPublicKey()
    }
    await client.current.authenticate(id, sig.value.signature, publicKey)

    return { chain }
  }

  // We use chainsSigning to avoid multiple authentications at the same time
  // This can happen because e.g. beacon wallet emits multiple events
  const chainsSigning = useRef<BlockchainType[]>([])

  const setWalletManager = useCallback(
    async (
      chain: BlockchainType,
      manager: TezosWalletManager | EthereumWalletManager | null
    ) => {
      // If we receive a wallet but the client is not authenticated we need to authenticate
      // We prevent multiple authentications at the same time with chainsSigning
      if (
        !client.current.authenticated &&
        !!manager &&
        !chainsSigning.current.includes(chain)
      ) {
        chainsSigning.current.push(chain)
        await authenticate(chain, manager)
        chainsSigning.current = chainsSigning.current.filter(c => c !== chain)
      }
      _setWalletManagers(prev => ({ ...prev, [chain]: manager }))
    },
    [_setWalletManagers, walletManagers]
  )

  const twm = walletManagers[BlockchainType.TEZOS]
  const ewm = walletManagers[BlockchainType.ETHEREUM]

  const isConnected = useMemo(() => !!twm || !!ewm, [twm, ewm])
  const lastIsConnected = useRef(isConnected)

  // When all walletmanagers are disconnected we logout
  useEffect(() => {
    if (lastIsConnected.current !== isConnected && !isConnected) {
      client.current.logout()
    }
    lastIsConnected.current = isConnected
  }, [isConnected, lastIsConnected.current])

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
