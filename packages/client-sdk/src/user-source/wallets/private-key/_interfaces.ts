import { Hex } from "viem"
import { ICommonWallet, IEvmWallet, ITezosWallet } from "../_interfaces.js"

export interface ICommonPrivateKeyWallet<AddressType extends string = string> {
  updatePrivateKey: (privateKey: AddressType | null) => Promise<void>
}

export type CommonPrivateKeyWallet = ICommonWallet & ICommonPrivateKeyWallet
export type EvmPrivateKeyWallet = IEvmWallet & ICommonPrivateKeyWallet<Hex>
export type TezosPrivateKeyWallet = ITezosWallet & ICommonPrivateKeyWallet
