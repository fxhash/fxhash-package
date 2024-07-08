import { EthereumWalletManager } from "@fxhash/eth"
import { TActiveManagersMap } from "./WalletOrchestrator.js"
import { TezosWalletManager } from "@fxhash/tez"
import { BlockchainEnvs } from "@fxhash/shared"

/**
 * @param managers An active managers map
 * @returns Any active manager available in the given map (a manager is
 * considered active if it has any WalletManager attached to it)
 */
export function getAnyActiveManager(
  managers: TActiveManagersMap
): EthereumWalletManager | TezosWalletManager | null {
  return BlockchainEnvs.map(env => managers[env])
    .map(man => man?.manager || null)
    .reduce((prev, curr) => prev || curr, null)
}
