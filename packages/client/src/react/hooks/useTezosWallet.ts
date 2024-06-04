import { BlockchainType, invariant } from "@fxhash/shared"
import { useClient } from "./useClient.js"
import { useWallets } from "./useWallets.js"
import { TezosWalletManager } from "@fxhash/tez"
import { AuthenticationResult } from "@fxhash/gql"

export function useTezosWallet(): {
  tezosWalletManager: TezosWalletManager | null
  connected: boolean
  authenticate: () => Promise<AuthenticationResult>
} {
  const { client } = useClient()
  const { tezosWalletManager } = useWallets()

  async function authenticate() {
    invariant(tezosWalletManager, "Tezos wallet manager is not connected")
    const { text, id } = await client.generateChallenge(
      BlockchainType.TEZOS,
      tezosWalletManager.address
    )
    const sig = await tezosWalletManager.signMessage(text)
    if (sig.isFailure()) {
      throw new Error("Failed to sign message")
    }
    const publicKey = await tezosWalletManager.getPublicKey()
    return client.authenticate(id, sig.value.signature, publicKey)
  }

  return {
    tezosWalletManager,
    connected: tezosWalletManager !== null,
    authenticate,
  }
}
