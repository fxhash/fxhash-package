import { useAccountEffect, usePublicClient, WagmiContext } from "wagmi"
import { useClient } from "../index.js"
import { EthereumWalletManager, clientToSigner } from "@fxhash/eth"
import { BlockchainType, invariant } from "@fxhash/shared"
import { config } from "@fxhash/config"
import {
  disconnect,
  getConnectorClient,
  getWalletClient,
  watchAccount,
} from "wagmi/actions"
import { createConfig, http, getAccount } from "@wagmi/core"
import { sepolia, baseSepolia } from "@wagmi/core/chains"
import {
  WalletDoesntBelongToUserError,
  WindowWalletsConnector,
  WrongWalletActivatedError,
  profileContainsAddress,
} from "@/index.js"
import { useContext, useEffect, useMemo, useRef, useState } from "react"

const defaultWagmiConfig = createConfig({
  chains: [sepolia, baseSepolia],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
})

export function EthereumWallet() {
  /**
   * As we are using WAGMI, there can be 2 cases:
   * - wagmi is already being used, and we can grab it from the context
   * - wagmi isn't being used, so we instanciate a config
   */
  const wagmiCtx = useContext(WagmiContext)
  const wagmiConfig = useMemo(() => {
    return wagmiCtx ?? defaultWagmiConfig
  }, [wagmiCtx]) as any

  const publicClient = usePublicClient()
  const { setWalletManager, client, setError, error } = useClient()

  const [account, setAccount] = useState<any>(getAccount(wagmiConfig))

  const once = useRef(false)
  useEffect(() => {
    if (once.current) return
    once.current = true
    //
    ;(async () => {
      const connector = new WindowWalletsConnector({
        evm: {
          wagmiConfig,
        },
      })
      await connector.init()

      return () => {
        connector.release()
      }
    })()
  }, [])

  // useEffect(() => {
  //   console.log("initial fetch")
  //   console.log({ wagmiConfig })
  //   console.log(getAccount(wagmiConfig))

  //   const unwatchAccount = watchAccount(wagmiConfig as any, {
  //     onChange: (acc, prev) => {
  //       console.log("-- onChange")
  //       console.log({ acc, prev })
  //       if (acc.address !== prev.address) {
  //         setAccount(acc)
  //       }
  //     },
  //   })

  //   return () => {
  //     unwatchAccount()
  //   }
  // }, [])

  // Check if the wallet activated is part of the user profile
  // If not we set an error
  // useEffect(() => {
  //   if (!account.addresses || account.addresses.length <= 1 || error) return
  //   if (
  //     client.profile &&
  //     !client.profile.wallets.find(w => w.address === account.addresses?.[0])
  //   ) {
  //     setError(new WrongWalletActivatedError(BlockchainType.ETHEREUM))
  //   }
  // }, [account, error, wagmiConfig])

  // useAccountEffect({
  //   config: wagmiConfig,
  //   onConnect: async (data: { address: `0x${string}` }) => {
  //     // We have to verify that the wallet is part of the user profile
  //     if (client.profile) {
  //       const walletBelongsToAccount = profileContainsAddress(
  //         client.profile,
  //         data.address
  //       )
  //       // If wallet doesnt not belong to user, we clear the active account
  //       if (!walletBelongsToAccount) {
  //         disconnect(wagmiConfig)
  //         setError(new WalletDoesntBelongToUserError(BlockchainType.ETHEREUM))
  //         return
  //       }
  //     }
  //     const walletClient = await getWalletClient(wagmiConfig)
  //     const connectorClient = await getConnectorClient(wagmiConfig)
  //     const signer = clientToSigner(connectorClient)
  //     invariant(publicClient, "Public client not available")
  //     invariant(walletClient, "Wallet client not available")
  //     invariant(signer, "Signer not available")
  //     invariant(data.address, "Address not available")

  //     const ewm = new EthereumWalletManager({
  //       walletClient: walletClient as unknown as any,
  //       publicClient,
  //       rpcNodes: config.eth.apis.rpcs,
  //       address: data.address,
  //       signer,
  //     })
  //     setWalletManager(BlockchainType.ETHEREUM, ewm, () =>
  //       disconnect(wagmiConfig)
  //     )
  //   },
  //   onDisconnect: async () => {
  //     setWalletManager(BlockchainType.ETHEREUM, null, () =>
  //       disconnect(wagmiConfig)
  //     )
  //   },
  // })
  return null
}
