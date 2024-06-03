"use client"
// @ts-ignore - unused
import React, { PropsWithChildren, createContext, useState } from "react"
import { TezosWalletManager } from "@fxhash/tez"

interface WalletContext {
  tezosWalletManager: TezosWalletManager | null
  setTezosWalletManager: (manager: TezosWalletManager) => void
}

export const FxhashWalletContext = createContext<WalletContext>({
  tezosWalletManager: null,
  setTezosWalletManager: () => {},
})

export function FxhashClientProvider(props: PropsWithChildren) {
  const [tezosWalletManager, setTezosWalletManager] =
    useState<TezosWalletManager | null>(null)
  return (
    <FxhashWalletContext.Provider
      value={{ tezosWalletManager, setTezosWalletManager }}
    >
      {props.children}
    </FxhashWalletContext.Provider>
  )
}
