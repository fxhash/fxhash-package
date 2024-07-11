import {
  ICommonWallet,
  IEvmWallet,
  ITezosWallet,
  IWalletsSource,
} from "../_interfaces.js"
import { BlockchainNetwork } from "@fxhash/shared"

export interface ICommonWindowWallet {
  /**
   * Request a connection to the user, which will prompt an interface for them
   * to pick their Wallet solution of choice.
   */
  requestConnection: () => void
}

export type CommonWindowWallet = ICommonWallet & ICommonWindowWallet
export type EvmWindowWallet = IEvmWallet & ICommonWindowWallet
export type TezosWindowWallet = ITezosWallet & ICommonWindowWallet

export interface IWindowWalletsSource extends IWalletsSource {
  /**
   * Request a connection on a given network. This doesn't guarantee a
   * connection will be prompted to the user, it does a best attempt at
   * making such request with what's available.
   *
   * @param network The network on which a connection should be requested
   */
  requestConnection: (network: BlockchainNetwork) => void
}
