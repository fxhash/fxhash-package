import { useCallback, useEffect } from "react"
import { useClient } from "./useClient.js"
import {
  ClientContextEvent,
  useEthereumWallet,
  useTezosWallet,
} from "../index.js"
import { TezosWalletManager } from "@fxhash/tez"
import { EthereumWalletManager } from "@fxhash/eth"
import { BlockchainType, PromiseResult } from "@fxhash/shared"

interface UseLoginProps {
  onConnect?: (
    chain: BlockchainType,
    manager: TezosWalletManager | EthereumWalletManager
  ) => void
  onDisconnect?: (chain: BlockchainType) => void
  onAuthenticate?: (chain: BlockchainType) => void
}

export function useLogin(props: UseLoginProps): {
  isChainConnected: (chain: BlockchainType) => boolean
  connect: (chain: BlockchainType) => PromiseResult<void, Error>
  disconnect: (chain: BlockchainType) => PromiseResult<void, Error>
  isConnected: boolean
} {
  const { subscribe, unsubscribe, walletManagers, isConnected } = useClient()
  const { connect: connectEth, disconnect: disconnectEth } = useEthereumWallet()
  const { connect: connectTez, disconnect: disconnectTez } = useTezosWallet()

  useEffect(() => {
    const { onConnect } = props
    if (!onConnect) return
    subscribe(ClientContextEvent.onConnect, onConnect)
    return () => {
      unsubscribe(ClientContextEvent.onConnect, onConnect)
    }
  }, [props.onConnect])

  useEffect(() => {
    const { onDisconnect } = props
    if (!onDisconnect) return
    subscribe(ClientContextEvent.onDisconnect, onDisconnect)
    return () => {
      unsubscribe(ClientContextEvent.onDisconnect, onDisconnect)
    }
  }, [props.onDisconnect])

  useEffect(() => {
    const { onAuthenticate } = props
    if (!onAuthenticate) return
    subscribe(ClientContextEvent.onAuthenticate, onAuthenticate)
    return () => {
      unsubscribe(ClientContextEvent.onAuthenticate, onAuthenticate)
    }
  }, [props.onAuthenticate])

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
