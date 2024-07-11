import {
  ICommonWallet,
  IEvmWallet,
  ITezosWallet,
  IWalletsSource,
} from "../_interfaces.js"

export interface ICommonWeb3AuthWallet {}

export type CommonWeb3AuthWallet = ICommonWallet & ICommonWeb3AuthWallet
export type EvmWeb3AuthWallet = IEvmWallet & ICommonWeb3AuthWallet
export type TezosWeb3AuthWallet = ITezosWallet & ICommonWeb3AuthWallet

export interface IWeb3WalletsSource extends IWalletsSource {
  login: (options: any) => Promise<any>
}
