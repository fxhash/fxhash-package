import { failure, success } from "@fxhash/shared"
import { IWalletInfo, WalletEventEmitter } from "../_interfaces.js"
import { EvmClientsNotAvailable } from "../../_errors.js"
import {
  type Hex,
  type Address,
  type PrivateKeyAccount,
  createPublicClient,
  http,
  createWalletClient,
} from "viem"
import { sepolia } from "viem/chains"
import { privateKeyToAccount } from "viem/accounts"
import { EvmPrivateKeyWallet } from "./_interfaces.js"

export type EvmPrivateKeyWalletOptions = {
  privateKey?: Hex
}

export function evmPrivateKeyWallet({
  privateKey,
}: EvmPrivateKeyWalletOptions): EvmPrivateKeyWallet {
  const emitter = new WalletEventEmitter()
  let _pk: Hex | null = null
  let _info: PrivateKeyAccount | null = null

  const updatePrivateKey = async (pk: Hex | null) => {
    const prev = _pk
    if (pk) {
      _pk = pk
      _info = privateKeyToAccount(_pk)
    } else {
      _pk = null
      _info = null
    }
    if (prev !== _pk) {
      emitter.emit("wallet-changed", _info)
    }
  }

  return {
    emitter,

    init: async () => {
      if (privateKey) await updatePrivateKey(privateKey)
    },

    getClients: async () => {
      if (!_pk || !_info) {
        return failure(new EvmClientsNotAvailable())
      }

      // todo: how to define the chain / multiple chains here ?
      const chain = sepolia
      const transport = http()
      const publicClient = createPublicClient({
        chain,
        transport,
      })
      const walletClient = createWalletClient({
        account: _info,
        chain,
        transport,
      })

      if (!walletClient || !publicClient) {
        throw new Error("TODO error handling — undefined wallet/public client")
      }

      return success({
        public: publicClient,
        wallet: walletClient,
      })
    },

    getInfo: () => _info,

    disconnect: async () => {
      updatePrivateKey(null)
    },

    updatePrivateKey,
  }
}
