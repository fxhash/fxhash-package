import "viem/window"
import { createContext, useContext, useEffect, useState } from "react"
import { useWalletClient } from "wagmi"
import { PublicClient } from "viem"
import { EthereumWalletManager } from "@fxhash/evm-sdk"
import { invariant } from "@fxhash/contracts-shared"

interface UserContextType {
  walletManager: EthereumWalletManager | null
}

const defaultCtx: UserContextType = {
  walletManager: null,
}

const EthereumUserContext = createContext<UserContextType>(defaultCtx)

export interface EthereumUserProviderConfig {
  publicClient: PublicClient
  rpcNodes: string[]
}

interface EthereumUserProviderProps {
  children: React.ReactNode
  config: EthereumUserProviderConfig
}

/**
 * Responsible for handling the Ethereum connection and initializing the wallet manager
 */
export function EthereumUserProvider({
  config,
  children,
}: EthereumUserProviderProps) {
  const [context, setContext] = useState<UserContextType>(defaultCtx)
  const { data: walletClient } = useWalletClient()

  useEffect(() => {
    if (window.ethereum && walletClient) {
      const account = walletClient.account
      if (!account) return

      const walletManager = new EthereumWalletManager({
        walletClient: walletClient,
        publicClient: config.publicClient,
        rpcNodes: config.rpcNodes,
        address: account.address,
      })
      setContext({
        ...context,
        walletManager,
      })
    } else {
      setContext({
        ...context,
        walletManager: null,
      })
    }
  }, [walletClient])

  return (
    <EthereumUserContext.Provider value={context}>
      {children}
    </EthereumUserContext.Provider>
  )
}

export function useEthereumUserContext(): UserContextType {
  const context = useContext(EthereumUserContext)

  invariant(
    context,
    "Could not find the Fxhash context, ensure your code is wrapped in <EthereumUserProvider>"
  )

  return context
}
