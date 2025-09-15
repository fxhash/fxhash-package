import { EthereumWalletManager } from "@fxhash/eth"
import { BlockchainNetwork } from "@fxhash/shared"
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

export function walletManagerNetwork(
  manager: TezosWalletManager | EthereumWalletManager
): BlockchainNetwork {
  if (isEthereumWalletManager(manager)) return BlockchainNetwork.ETHEREUM
  if (isTezosWalletManager(manager)) return BlockchainNetwork.TEZOS
  throw Error("WalletManager is neither tezos/ethereum")
}
