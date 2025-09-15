import { config } from "@fxhash/config"
import {
  clientToSigner,
  EthereumWalletManager,
  getConfigForChain,
} from "@fxhash/eth"
import { useEffect, useState } from "react"
import { useAccount, useConfig } from "wagmi"
import { getWalletClient } from "@wagmi/core"
import { getPublicClient } from "@/lib/evm"
import { BlockchainType } from "@fxhash/shared"

/**
 * Given an EVM wallet interface, returns an Ethereum Wallet Manager instance
 * ready to rock.
 */
export const useEvmWalletManager = () => {
  const { isConnected } = useAccount()
  const [manager, setManager] = useState<EthereumWalletManager | undefined>()
  const wagmiConfig = useConfig()

  useEffect(() => {
    const initializeManager = async () => {
      if (!isConnected) {
        setManager(undefined)
        return
      }
      const walletClient = await getWalletClient(wagmiConfig)
      const publicClient = getPublicClient(
        BlockchainType.BASE,
        getConfigForChain(BlockchainType.BASE).apis.alchemy.rpc
      )

      if (!walletClient || !publicClient) {
        setManager(undefined)
        return
      }

      const newManager = new EthereumWalletManager({
        walletClient: walletClient,
        publicClient: publicClient,
        rpcNodes: config.eth.apis.rpcs,
        address: walletClient.account.address,
        signer: clientToSigner(walletClient),
      })
      setManager(newManager)
    }

    initializeManager()
  }, [isConnected])

  return manager
}
