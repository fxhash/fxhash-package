"use client"
// @ts-ignore - unused
import React, { PropsWithChildren, createContext, useState } from "react"
import { TezosWalletManager } from "@fxhash/tez"
import { EthereumWalletManager } from "@fxhash/eth"

interface WalletContext {
  tezosWalletManager: TezosWalletManager | null
  setTezosWalletManager: (manager: TezosWalletManager | null) => void
  ethereumWalletManager: EthereumWalletManager | null
  setEthereumWalletManager: (manager: EthereumWalletManager | null) => void
}

export const FxhashWalletContext = createContext<WalletContext>({
  tezosWalletManager: null,
  setTezosWalletManager: () => {},
  ethereumWalletManager: null,
  setEthereumWalletManager: () => {},
})

export function FxhashClientProvider(props: PropsWithChildren) {
  const [tezosWalletManager, setTezosWalletManager] =
    useState<TezosWalletManager | null>(null)
  const [ethereumWalletManager, setEthereumWalletManager] =
    useState<EthereumWalletManager | null>(null)
  return (
    <FxhashWalletContext.Provider
      value={{
        tezosWalletManager,
        setTezosWalletManager,
        ethereumWalletManager,
        setEthereumWalletManager,
      }}
    >
      {props.children}
    </FxhashWalletContext.Provider>
  )
}
