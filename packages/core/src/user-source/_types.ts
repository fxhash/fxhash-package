import { type EthereumWalletManager } from "@fxhash/eth"
import { type BlockchainNetwork } from "@fxhash/shared"
import { type TezosWalletManager } from "@fxhash/tez"
import { type Address } from "viem"
import { IWallet, IWalletsSource } from "./_interfaces.js"

/**
 * Typemap of the WalletManager types associated to each BlockchainNetwork
 */
export type MapNetworkToWalletManager<N extends BlockchainNetwork> = {
  [K in BlockchainNetwork]: {
    [BlockchainNetwork.ETHEREUM]: EthereumWalletManager
    [BlockchainNetwork.TEZOS]: TezosWalletManager
  }[K]
}[N]

/**
 * Typemap of the addresses type associated to each BlockchainNetwork
 */
export type MapNetworkToAddressType<N extends BlockchainNetwork> = {
  [K in BlockchainNetwork]: {
    [BlockchainNetwork.ETHEREUM]: Address
    [BlockchainNetwork.TEZOS]: string
  }[K]
}[N]

/**
 * A Map of { BlockchainNetwork -> associated WalletsSource }
 * If a blockchain network is missing from the map, it means their isn't a
 * Wallets Source currenctly associated with it (at least in the context in
 * which this object is requested)
 */
export type WalletsSourceMap = {
  [Net in BlockchainNetwork]?: IWalletsSource
}

/**
 * A Map of Blockchain Network -> Wallet
 */
export type WalletsMap = {
  [N in BlockchainNetwork]?: IWallet<N>
}

export type WalletManagersMap = {
  [Net in BlockchainNetwork]?: MapNetworkToWalletManager<Net> | null
}
