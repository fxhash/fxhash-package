import { useCallback } from "react"
import { useClient } from "./useClient.js"
import { useEthereumWallet, useTezosWallet } from "../index.js"
import { BlockchainType, PromiseResult } from "@fxhash/shared"

export function useLogin(): {
  isChainConnected: (chain: BlockchainType) => boolean
  connect: (chain: BlockchainType) => PromiseResult<void, Error>
  disconnect: (chain: BlockchainType) => PromiseResult<void, Error>
  isConnected: boolean
} {
  const { walletManagers, isConnected } = useClient()
  const { connect: connectEth, disconnect: disconnectEth } = useEthereumWallet()
  const { connect: connectTez, disconnect: disconnectTez } = useTezosWallet()

  const isChainConnected = useCallback(
    (chain: BlockchainType) => !!walletManagers[chain],
    [walletManagers]
  )
  const connect = (chain: BlockchainType) => {
    if (chain === BlockchainType.ETHEREUM || chain === BlockchainType.BASE) {
      return connectEth()
    } else {
      return connectTez()
    }
  }
  const disconnect = (chain: BlockchainType) => {
    if (chain === BlockchainType.ETHEREUM || chain === BlockchainType.BASE) {
      return disconnectEth()
    } else {
      return disconnectTez()
    }
  }
  return {
    isChainConnected,
    connect,
    disconnect,
    isConnected,
  }
}
