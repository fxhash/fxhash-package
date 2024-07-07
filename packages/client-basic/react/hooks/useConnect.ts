import { useEffect, useRef, useState } from "react"
import { useClient } from "./useClient.js"
import { WalletManagers } from "../index.js"

type UseConnectCallback = (walletManagers: WalletManagers) => void

export function useConnect(callback: UseConnectCallback) {
  const { isConnected: _isConnected, walletManagers } = useClient()
  const [isConnected, setIsConnected] = useState(_isConnected)
  const lastIsConnected = useRef(_isConnected)

  useEffect(() => {
    if (lastIsConnected.current !== _isConnected) {
      lastIsConnected.current = _isConnected
      if (_isConnected) {
        setIsConnected(true)
        callback(walletManagers)
      } else {
        setIsConnected(false)
      }
    }
  }, [_isConnected, lastIsConnected.current])
  return { isConnected }
}
