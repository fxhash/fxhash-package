import { useClient } from "./useClient.js"
import { type WalletManagersMap } from "@fxhash/client-sdk"
import { type EthereumWalletManager } from "@fxhash/eth"
import { type TezosWalletManager } from "@fxhash/tez"

/**
 * Map of Wallet Managers currently available.
 */
export function useWallets(): WalletManagersMap {
  return useClient().managers
}

/**
 * EVM Wallet which has been exposed by the configured user source. If no wallet
 * is active, returns null.
 */
export function useEvmWallet(): EthereumWalletManager | null {
  return useWallets().ETHEREUM || null
}

/**
 * Tezos Wallet which has been exposed by the configured user source. If no
 * wallet is active, returns null.
 */
export function useTezosWallet(): TezosWalletManager | null {
  return useWallets().TEZOS || null
}
