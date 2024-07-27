import { BlockchainNetwork, BlockchainNetworks } from "@fxhash/shared"
import { type EthereumWalletManager } from "@fxhash/eth"
import { type TezosWalletManager } from "@fxhash/tez"
import {
  type WalletManagersMap,
  type WalletsMap,
  type WalletsSourceMap,
} from "../../_types.js"

/**
 * Simple reusable util to derive a list of supported networks (and the
 * `supports(network)` implementation)
 * @param wallets Map of Wallet Sources
 */
export function walletsNetworks(wallets: WalletsSourceMap) {
  const networks = (Object.keys(wallets) as BlockchainNetwork[]).filter(
    net => !!wallets[net]
  )
  return {
    networks,
    supports: (network: BlockchainNetwork) => networks.includes(network),
  }
}

/**
 * @param wallets A map of Wallets
 * @returns Any active manager available in the given map (a manager is
 * considered active if not null)
 */
export function anyActiveManager(
  wallets: WalletsMap
): EthereumWalletManager | TezosWalletManager | null {
  const managers = deriveManagersMap(wallets)
  return BlockchainNetworks.map(net => managers[net])
    .map(man => man || null)
    .reduce((prev, curr) => prev || curr, null)
}

/**
 * Derive a WalletManagers Map from a Wallets Map using the wallets connected in
 * the given Wallets Map.
 * @param wallets A Wallets Map
 * @returns A WalletManagers Map derived from the Wallets Map
 */
function deriveManagersMap(wallets: WalletsMap): WalletManagersMap {
  return Object.fromEntries(
    Object.keys(wallets).map(net => [
      net,
      wallets[net as BlockchainNetwork]?.connected?.manager || null,
    ])
  )
}
