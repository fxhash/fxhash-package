"use client"
// @ts-ignore - unused
import React, { PropsWithChildren, createContext, useState } from "react"
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

export interface WalletsContext {
  tezosWalletManager: TezosWalletManager | null
  setTezosWalletManager: (manager: TezosWalletManager | null) => void
  ethereumWalletManager: EthereumWalletManager | null
  setEthereumWalletManager: (manager: EthereumWalletManager | null) => void
  config: WalletsProviderConfig
}

export const WalletsContext = createContext<WalletsContext>({
  tezosWalletManager: null,
  setTezosWalletManager: () => {},
  ethereumWalletManager: null,
  setEthereumWalletManager: () => {},
  config: {},
})

export function WalletsProvider(
  props: PropsWithChildren<{ config: WalletsProviderConfig }>
) {
  const { children, config } = props
  const [tezosWalletManager, setTezosWalletManager] =
    useState<TezosWalletManager | null>(null)
  const [ethereumWalletManager, setEthereumWalletManager] =
    useState<EthereumWalletManager | null>(null)

  return (
    <WalletsContext.Provider
      value={{
        tezosWalletManager,
        setTezosWalletManager,
        ethereumWalletManager,
        setEthereumWalletManager,
        config,
      }}
    >
      <>
        {config.ETHEREUM && <EthereumWallet />}
        {config.TEZOS && <TezosWallet config={config.TEZOS} />}
        {children}
      </>
    </WalletsContext.Provider>
  )
}
