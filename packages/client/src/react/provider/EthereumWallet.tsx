import {
  Config,
  useConnectorClient,
  useAccountEffect,
  useWalletClient,
  usePublicClient,
} from "wagmi"
import { useClient } from "../index.js"
import { EthereumWalletManager, clientToSigner } from "@fxhash/eth"
import { useCallback, useMemo } from "react"
import { BlockchainType, invariant } from "@fxhash/shared"
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
  const { setWalletManager } = useClient()

  const onConnect = useCallback(
    async (data: { address: `0x${string}` }) => {
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
    [setWalletManager, publicClient, walletClient, signer]
  )
  const onDisconnect = useCallback(async () => {
    setWalletManager(BlockchainType.ETHEREUM, null)
  }, [setWalletManager])

  useAccountEffect({
    onConnect,
    onDisconnect,
  })
  return null
}
