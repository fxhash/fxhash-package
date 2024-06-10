import { useEffect } from "react"
import { BlockchainType, invariant } from "@fxhash/shared"
import { AccountInfo, BeaconEvent } from "@airgap/beacon-sdk"
import { TezosWalletManager } from "@fxhash/tez"
import { config as fxhashConfig } from "@fxhash/config"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { TezosToolkit } from "@taquito/taquito"
import { TezosWalletsConfig } from "./Client.js"
import { useClient } from "../index.js"

interface TezosWalletProps {
  config: TezosWalletsConfig
}

export function TezosWallet(props: TezosWalletProps) {
  const { config } = props
  const { setWalletManager } = useClient()

  function createAccountSetHandler(
    wallet: BeaconWallet,
    tezosToolkit: TezosToolkit
  ) {
    return async function handleAccountSet(account?: AccountInfo) {
      console.log("conntect tez", account)
      if (!account) {
        setWalletManager(BlockchainType.TEZOS, null)
        return
      }
      tezosToolkit.setWalletProvider(config.beaconWallet)

      const twm = new TezosWalletManager({
        wallet,
        tezosToolkit,
        rpcNodes: fxhashConfig.tez.apis.rpcs,
        address: account.address,
      })
      console.log("conntect tez", twm)
      setWalletManager(BlockchainType.TEZOS, twm)
    }
  }

  useEffect(() => {
    invariant(config.tezosToolkit, "TezosToolkit is required")
    invariant(config.beaconWallet, "BeaconWallet is required")
    const { tezosToolkit, beaconWallet } = config
    beaconWallet.client.subscribeToEvent(
      BeaconEvent.ACTIVE_ACCOUNT_SET,
      createAccountSetHandler(beaconWallet, tezosToolkit)
    )
    // We manually retrieve the active account on mount
    beaconWallet.client
      .getActiveAccount()
      .then(createAccountSetHandler(beaconWallet, tezosToolkit))
  }, [config])

  return null
}
