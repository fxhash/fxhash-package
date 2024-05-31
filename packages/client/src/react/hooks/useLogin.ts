import { useState } from "react"
import { TezosWalletManager } from "@fxhash/tez"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { TezosToolkit } from "@taquito/taquito"
import { BlockchainType } from "@fxhash/shared"

interface UseLoginHookOptions {
  [BlockchainType.TEZOS]?: {
    tezosToolkit?: TezosToolkit
    beaconWallet?: BeaconWallet
  }
}

export function useLogin(options?: UseLoginHookOptions) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [tezosWalletManager, setTezosWalletManager] = useState<
    TezosWalletManager | undefined
  >(undefined)

  const tezOptions = options?.[BlockchainType.TEZOS]
  const handleConnectTezosWallet = async () => {
    try {
      setIsConnecting(true)
      const tezosWalletManager = await TezosWalletManager.fromBeaconWallet({
        tezosToolkit: tezOptions?.tezosToolkit,
        wallet: tezOptions?.beaconWallet,
      })
      setTezosWalletManager(tezosWalletManager)
    } catch (e) {
      setError(e as Error)
    } finally {
      setIsConnecting(false)
    }
  }

  return {
    isConnecting,
    error,
    handleConnectTezosWallet,
    tezosWalletManager,
  }
}
