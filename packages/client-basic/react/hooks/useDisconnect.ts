import { useEffect, useRef, useState } from "react"
import { WalletManagers, useClient } from "../index.js"

type UseDisconnectCallback = (walletManagers: WalletManagers) => void

export function useDisconnect(callback: UseDisconnectCallback) {
  const { isConnected: _isConnected, walletManagers } = useClient()
  const [isDisonnected, setIsDisconnected] = useState(!_isConnected)
  const lastIsConnected = useRef(_isConnected)
  useEffect(() => {
    if (lastIsConnected.current !== _isConnected) {
      lastIsConnected.current = _isConnected
      if (!_isConnected) {
        setIsDisconnected(true)
        callback(walletManagers)
      } else {
        setIsDisconnected(false)
      }
    }
  }, [_isConnected, lastIsConnected.current])
  return { isDisonnected }
}
