import { useAccountEffect, usePublicClient, useConfig, useAccount } from "wagmi"
import { useClient } from "../index.js"
import { EthereumWalletManager, clientToSigner } from "@fxhash/eth"
import { BlockchainType, invariant } from "@fxhash/shared"
import { config } from "@fxhash/config"
import { disconnect, getConnectorClient, getWalletClient } from "wagmi/actions"
import {
  WalletDoesntBelongToUserError,
  WrongWalletActivatedError,
  profileContainsAddress,
} from "@/index.js"
import { useEffect } from "react"

export function EthereumWallet() {
  const wagmiConfig = useConfig()
  const publicClient = usePublicClient()
  const account = useAccount()
  const { setWalletManager, client, setError, error } = useClient()

  // Check if the wallet activated is part of the user profile
  // If not we set an error
  useEffect(() => {
    if (!account.addresses || account.addresses.length <= 1 || error) return
    if (
      client.profile &&
      !client.profile.wallets.find(w => w.address === account.addresses?.[0])
    ) {
      setError(new WrongWalletActivatedError(BlockchainType.ETHEREUM))
    }
  }, [account, error, wagmiConfig])

  useAccountEffect({
    config: wagmiConfig,
    onConnect: async (data: { address: `0x${string}` }) => {
      // We have to verify that the wallet is part of the user profile
      if (client.profile) {
        const walletBelongsToAccount = profileContainsAddress(
          client.profile,
          data.address
        )
        // If wallet doesnt not belong to user, we clear the active account
        if (!walletBelongsToAccount) {
          disconnect(wagmiConfig)
          setError(new WalletDoesntBelongToUserError(BlockchainType.ETHEREUM))
          return
        }
      }
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
      setWalletManager(BlockchainType.ETHEREUM, ewm, () =>
        disconnect(wagmiConfig)
      )
    },
    onDisconnect: async () => {
      setWalletManager(BlockchainType.ETHEREUM, null, () =>
        disconnect(wagmiConfig)
      )
    },
  })
  return null
}
