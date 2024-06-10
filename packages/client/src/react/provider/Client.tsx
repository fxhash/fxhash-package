"use client"
// @ts-ignore - unused
import React, {
  PropsWithChildren,
  createContext,
  useState,
  useRef,
  useCallback,
} from "react"
import { FxhashClient } from "../../client/index.js"
import { BlockchainType } from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { EthereumWalletManager } from "@fxhash/eth"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { EthereumWallet } from "./EthereumWallet.js"
import { TezosWallet } from "./TezosWallet.js"
import { TezosToolkit } from "@taquito/taquito"

export enum ClientContextEvent {
  onConnect = "onConnect",
  onDisconnect = "onDisconnect",
}

export interface TezosWalletsConfig {
  tezosToolkit?: TezosToolkit
  beaconWallet?: BeaconWallet
}

export interface WalletsProviderConfig {
  [BlockchainType.TEZOS]?: TezosWalletsConfig
  [BlockchainType.ETHEREUM]?: boolean
}

export type WalletManagers = {
  [BlockchainType.TEZOS]: TezosWalletManager | null
  [BlockchainType.ETHEREUM]: EthereumWalletManager | null
  [BlockchainType.BASE]: EthereumWalletManager | null
}

export interface ClientContext {
  client: FxhashClient
  tezosWalletManager: TezosWalletManager | null
  ethereumWalletManager: EthereumWalletManager | null
  setWalletManager: (
    chain: BlockchainType,
    manager: TezosWalletManager | EthereumWalletManager | null
  ) => void
  config: WalletsProviderConfig
  walletManagers: WalletManagers
  subscribe: (
    event: ClientContextEvent,
    callback: (...args: any[]) => void
  ) => void
  unsubscribe: (
    event: ClientContextEvent,
    callback: (...args: any[]) => void
  ) => void
}

const defaultClientContext: ClientContext = {
  client: new FxhashClient(),
  tezosWalletManager: null,
  ethereumWalletManager: null,
  setWalletManager: () => {},
  config: {},
  walletManagers: {
    [BlockchainType.TEZOS]: null,
    [BlockchainType.ETHEREUM]: null,
    [BlockchainType.BASE]: null,
  },
  subscribe: () => {},
  unsubscribe: () => {},
}

export const ClientContext = createContext<ClientContext>(defaultClientContext)

export function ClientProvider(
  props: PropsWithChildren<{ config: WalletsProviderConfig }>
) {
  const { children, config } = props
  const [walletManagers, _setWalletManagers] = useState<WalletManagers>(
    defaultClientContext.walletManagers
  )
  const client = useRef<FxhashClient>(new FxhashClient())

  const subscribers = useRef<{
    [key in ClientContextEvent]?: Array<(...args: any[]) => void>
  }>({})

  const emitEvent = useCallback(
    (event: ClientContextEvent, ...args: any[]) => {
      ;(subscribers.current[event] || []).forEach(callback => callback(...args))
    },
    [subscribers]
  )

  const twm = walletManagers[BlockchainType.TEZOS]
  const ewm = walletManagers[BlockchainType.ETHEREUM]

  const setWalletManager = useCallback(
    (
      chain: BlockchainType,
      manager: TezosWalletManager | EthereumWalletManager | null
    ) => {
      _setWalletManagers(prev => {
        const next = { ...prev, [chain]: manager }
        // The same Ethereum wallet manager is used for both ETHEREUM and BASE chains
        if (chain === BlockchainType.ETHEREUM) {
          next[BlockchainType.BASE] = next[BlockchainType.ETHEREUM]
        }
        // TODO: Should we emit always or only when the manager changes from the existing one?
        if (manager) {
          emitEvent(ClientContextEvent.onConnect, chain, manager)
        } else {
          emitEvent(ClientContextEvent.onDisconnect, chain)
        }
        return next
      })
    },
    [emitEvent, _setWalletManagers]
  )

  const subscribe = useCallback(
    (event: ClientContextEvent, callback: (...args: any[]) => void) => {
      if (!subscribers.current[event]) {
        subscribers.current[event] = []
      }
      subscribers.current[event]?.push(callback)
    },
    []
  )

  const unsubscribe = useCallback(
    (event: ClientContextEvent, callback: (...args: any[]) => void) => {
      if (subscribers.current[event]) {
        subscribers.current[event] = subscribers.current[event]?.filter(
          h => h !== callback
        )
      }
    },
    []
  )

  return (
    <ClientContext.Provider
      value={{
        client: client.current,
        walletManagers,
        setWalletManager,
        tezosWalletManager: twm ? (twm as unknown as TezosWalletManager) : null,
        ethereumWalletManager: ewm
          ? (ewm as unknown as EthereumWalletManager)
          : null,
        config,
        subscribe,
        unsubscribe,
      }}
    >
      <>
        {config.ETHEREUM && <EthereumWallet />}
        {config.TEZOS && <TezosWallet config={config.TEZOS} />}
        {children}
      </>
    </ClientContext.Provider>
  )
}
