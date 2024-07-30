import { useClient } from "./useClient.js"
import { type WalletManagersMap } from "@fxhash/client-sdk"
import { type EthereumWalletManager } from "@fxhash/eth"
import { type TezosWalletManager } from "@fxhash/tez"
import { BlockchainNetwork } from "@fxhash/shared"

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

/**
 * Returns true if a wallet is connected to the specified network.
 */
export function useWalletConnected(network: BlockchainNetwork): boolean {
  return !!useWallets()[network]
}

/**
 * Returns true if an EVM wallet is connected.
 */
export function useEvmWalletConnected(): boolean {
  return useWalletConnected(BlockchainNetwork.ETHEREUM)
}

/**
 * Returns true if a Tezos wallet is connected.
 */
export function useTezosWalletConnected(): boolean {
  return useWalletConnected(BlockchainNetwork.TEZOS)
}
