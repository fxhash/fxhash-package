import {
  Config,
  useConnectorClient,
  useAccountEffect,
  useWalletClient,
  usePublicClient,
} from "wagmi"
import { useClient } from "../index.js"
import { EthereumWalletManager, clientToSigner } from "@fxhash/eth"
import { useMemo } from "react"
import { invariant } from "@fxhash/shared"
import { config } from "@fxhash/config"

/**
 * Hook to convert a viem Wallet Client to an ethers.js Signer.
 */
function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}

export function EthereumWallet() {
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const signer = useEthersSigner()
  const { setEthereumWalletManager } = useClient()

  useAccountEffect({
    onConnect: async data => {
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
      console.log("connect eth", ewm)
      setEthereumWalletManager(ewm)
    },
    onDisconnect: async () => {
      console.log("disconnect eth")
      setEthereumWalletManager(null)
    },
  })
  return null
}
