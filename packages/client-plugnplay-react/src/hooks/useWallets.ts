import { useClient } from "./useClient.js"
import { type WalletManagersMap } from "@fxhash/client-sdk"
import { type EthereumWalletManager } from "@fxhash/eth"
import { type TezosWalletManager } from "@fxhash/tez"

export function useWallets(): WalletManagersMap {
  return useClient().managers
}

export function useEvmWallet(): EthereumWalletManager | null {
  return useWallets().ETHEREUM || null
}

export function useTezosWallet(): TezosWalletManager | null {
  return useWallets().TEZOS || null
}
