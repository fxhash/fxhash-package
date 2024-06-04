import { useEffect } from "react"
import { invariant } from "@fxhash/shared"
import { AccountInfo, BeaconEvent } from "@airgap/beacon-sdk"
import { TezosWalletsConfig } from "./Wallets.js"
import { TezosWalletManager } from "@fxhash/tez"
import { config as fxhashConfig } from "@fxhash/config"
import { useWallets } from "../index.js"

interface TezosWalletProps {
  config: TezosWalletsConfig
}

export function TezosWallet(props: TezosWalletProps) {
  const { config } = props
  const { setTezosWalletManager } = useWallets()
  useEffect(() => {
    invariant(config.tezosToolkit, "TezosToolkit is required")
    invariant(config.beaconWallet, "BeaconWallet is required")
    const { tezosToolkit, beaconWallet } = config
    beaconWallet.client.subscribeToEvent(
      BeaconEvent.ACTIVE_ACCOUNT_SET,
      async (account?: AccountInfo) => {
        if (!account) return
        tezosToolkit.setWalletProvider(beaconWallet)

        const twm = new TezosWalletManager({
          wallet: beaconWallet,
          tezosToolkit,
          rpcNodes: fxhashConfig.tez.apis.rpcs,
          address: account.address,
        })
        console.log("conntect tez", twm)
        setTezosWalletManager(twm)
      }
    )
  }, [config])
  return null
}
