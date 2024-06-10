import { useEffect } from "react"
import { useClient } from "./useClient.js"
import { ClientContextEvent } from "../index.js"
import { TezosWalletManager } from "@fxhash/tez"
import { EthereumWalletManager } from "@fxhash/eth"
import { BlockchainType } from "@fxhash/shared"

interface UseLoginProps {
  onConnect?: (
    chain: BlockchainType,
    manager: TezosWalletManager | EthereumWalletManager
  ) => void
  onDisconnect?: (chain: BlockchainType) => void
}

export function useLogin(props: UseLoginProps) {
  const { subscribe, unsubscribe } = useClient()

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
}
