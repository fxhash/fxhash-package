import { Hex } from "viem"
import { ICommonWallet, IEvmWallet, ITezosWallet } from "../_interfaces.js"

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
