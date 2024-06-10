import { useAccountEffect, usePublicClient, useConfig } from "wagmi"
import { useClient } from "../index.js"
import { EthereumWalletManager, clientToSigner } from "@fxhash/eth"
import { BlockchainType, invariant } from "@fxhash/shared"
import { config } from "@fxhash/config"
import { getConnectorClient, getWalletClient } from "wagmi/actions"

export function EthereumWallet() {
  const wagmiConfig = useConfig()
  const publicClient = usePublicClient()
  const { setWalletManager } = useClient()

  useAccountEffect({
    onConnect: async (data: { address: `0x${string}` }) => {
      const walletClient = await getWalletClient(wagmiConfig)
      const connectorClient = await getConnectorClient(wagmiConfig)
      const signer = clientToSigner(connectorClient)
      invariant(publicClient, "Public client not available")
      invariant(walletClient, "Wallet client not available")
      invariant(signer, "Signer not available")
      invariant(data.address, "Address not available")

      const ewm = new EthereumWalletManager({
        walletClient,
        publicClient,
        rpcNodes: config.eth.apis.rpcs,
        address: data.address,
        signer,
      })
      setWalletManager(BlockchainType.ETHEREUM, ewm)
    },
    onDisconnect: async () => {
      setWalletManager(BlockchainType.ETHEREUM, null)
    },
  })
  return null
}
