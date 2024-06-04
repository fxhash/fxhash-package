import { BlockchainType, invariant } from "@fxhash/shared"
import { useWallets } from "./useWallets.js"
import { useClient } from "./useClient.js"
import { EthereumWalletManager } from "@fxhash/eth"
import { AuthenticationResult } from "@fxhash/gql"

export function useEthereumWallet(): {
  ethereumWalletManager: EthereumWalletManager | null
  connected: boolean
  authenticate: () => Promise<AuthenticationResult>
  connect: () => Promise<void>
} {
  const { ethereumWalletManager } = useWallets()
  const { client } = useClient()
  async function authenticate() {
    invariant(ethereumWalletManager, "Ethereum wallet manager is not connected")
    const { text, id } = await client.generateChallenge(
      BlockchainType.ETHEREUM,
      ethereumWalletManager.address
    )
    const sig = await ethereumWalletManager.signMessage(text)
    if (sig.isFailure()) {
      throw new Error("Failed to sign message")
    }
    return client.authenticate(id, sig.value.signature)
  }
  return {
    ethereumWalletManager,
    connected: ethereumWalletManager !== null,
    authenticate,
    connect: async () => {
      console.log("use connectkit modal")
    },
  }
}
