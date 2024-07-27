import { BlockchainNetwork, failure, invariant, success } from "@fxhash/shared"
import { EvmClientsNotAvailable } from "../../_errors.js"
import { type Hex, type PrivateKeyAccount } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { IPrivateKeyWalletsSource } from "./_interfaces.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { walletSource } from "../common/_private.js"

export type EvmPrivateKeyWalletOptions = {
  privateKey?: Hex
}

export function evmPrivateKeyWallet({
  privateKey,
}: EvmPrivateKeyWalletOptions): IPrivateKeyWalletsSource {
  let _pk: Hex | null = null
  let _account: PrivateKeyAccount | null = null

  const wallet = walletSource({
    network: BlockchainNetwork.ETHEREUM,
    init: async () => {
      if (privateKey) await updatePrivateKey(privateKey)
    },
    disconnect: async () => {
      updatePrivateKey(null)
    },
    createManager: async () => {
      if (!_pk || !_account) return failure(new EvmClientsNotAvailable())
      const manager = await EthereumWalletManager.fromPrivateKey(_pk)
      return success(manager)
    },
    requirements: () => ({
      userInput: false,
    }),
  })

  async function updatePrivateKey(pk: Hex | null) {
    _pk = pk
    _account = pk ? privateKeyToAccount(pk) : null
    return wallet.utils.update(_account)
  }

  return {
    ...wallet.source,
    updatePrivateKey(net, pk) {
      invariant(net === BlockchainNetwork.ETHEREUM, "wrong network")
      return updatePrivateKey(pk as Hex | null)
    },
  }
}
