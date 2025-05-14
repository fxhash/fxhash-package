import { InMemorySigner } from "@taquito/signer"
import { IPrivateKeyWalletsSource } from "./_interfaces.js"
import { BlockchainNetwork } from "@fxhash/shared"
import { failure, invariant, success } from "@fxhash/utils"
import { TezosClientNotAvailableError } from "@/index.js"
import { TezosWalletManager } from "@fxhash/tez"
import { walletSource } from "../common/_private.js"

type Options = {
  privateKey?: string
}
export function tezosPrivateKeyWallet({
  privateKey,
}: Options): IPrivateKeyWalletsSource {
  let _signer: InMemorySigner | null = null

  const wallet = walletSource({
    network: BlockchainNetwork.TEZOS,
    init: async () => {
      if (privateKey) await updatePrivateKey(privateKey)
    },
    disconnect: async () => {
      updatePrivateKey(null)
    },
    createManager: async () =>
      _signer
        ? success(await TezosWalletManager.fromPrivateKey(_signer))
        : failure(new TezosClientNotAvailableError()),
    requirements: () => ({
      userInput: false,
    }),
  })

  async function updatePrivateKey(pk: string | null) {
    _signer = pk ? new InMemorySigner(pk) : null
    return wallet.utils.update(
      _signer
        ? {
            address: await _signer.publicKeyHash(),
          }
        : null
    )
  }

  return {
    ...wallet.source,
    updatePrivateKey(net, pk) {
      invariant(net === BlockchainNetwork.TEZOS, "wrong network")
      return updatePrivateKey(pk)
    },
  }
}

export type TezosPrivateKeyWalletOptions = Options
