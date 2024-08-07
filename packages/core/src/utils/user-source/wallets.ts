import { EthereumWalletManager } from "@fxhash/eth"
import { TezosWalletManager } from "@fxhash/tez"

export function isTezosWalletManager(
  manager: unknown
): manager is TezosWalletManager {
  return manager instanceof TezosWalletManager
}

export function isEthereumWalletManager(
  manager: unknown
): manager is EthereumWalletManager {
  return manager instanceof EthereumWalletManager
}
