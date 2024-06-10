"use client"
// @ts-ignore - unused
import React, {
  PropsWithChildren,
  createContext,
  useState,
  useRef,
} from "react"
import { FxhashClient } from "../../client/index.js"
import { BlockchainType } from "@fxhash/shared"
import { TezosWalletManager } from "@fxhash/tez"
import { EthereumWalletManager } from "@fxhash/eth"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { EthereumWallet } from "./EthereumWallet.js"
import { TezosWallet } from "./TezosWallet.js"
import { TezosToolkit } from "@taquito/taquito"

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

  const twm = walletManagers[BlockchainType.TEZOS]
  const ewm = walletManagers[BlockchainType.ETHEREUM]

  function setWalletManager(
    chain: BlockchainType,
    manager: TezosWalletManager | EthereumWalletManager | null
  ) {
    _setWalletManagers(prev => {
      const next = { ...prev, [chain]: manager }
      // The same Ethereum wallet manager is used for both Ethereum and Base chains
      if (chain === BlockchainType.ETHEREUM) {
        next[BlockchainType.BASE] = next[BlockchainType.ETHEREUM]
      }
      return next
    })
  }

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
