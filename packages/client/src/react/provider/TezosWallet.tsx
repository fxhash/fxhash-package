import { useEffect } from "react"
import { BlockchainType, invariant } from "@fxhash/shared"
import { AccountInfo, BeaconEvent } from "@airgap/beacon-sdk"
import { TezosWalletManager } from "@fxhash/tez"
import { config as fxhashConfig } from "@fxhash/config"
import { TezosWalletsConfig } from "./Client.js"
import { useClient } from "../index.js"
import {
  WalletDoesntBelongToUserError,
  profileContainsAddress,
} from "@/index.js"

interface TezosWalletProps {
  config: TezosWalletsConfig
}

export function TezosWallet(props: TezosWalletProps) {
  const { config } = props
  const { setWalletManager, client, setError, tezosWalletManager } = useClient()

  const handleAccountSet = async (account?: AccountInfo) => {
    // If the account is the same as the current one, we ignore the event
    if (tezosWalletManager?.address === account?.address) return

    const { tezosToolkit, beaconWallet: wallet } = config
    invariant(tezosToolkit, "TezosToolkit is required")
    invariant(wallet, "BeaconWallet is required")
    setError(null)
    if (!account) {
      setWalletManager(BlockchainType.TEZOS, null)
      return
    }

    // We have to verify that the wallet is part of the user profile
    if (client.profile) {
      const walletBelongsToAccount = profileContainsAddress(
        client.profile,
        account.address
      )
      // If wallet doesnt not belong to user, we clear the active account
      if (!walletBelongsToAccount) {
        wallet.clearActiveAccount()
        setError(new WalletDoesntBelongToUserError(BlockchainType.TEZOS))
        return
      }
    }

    tezosToolkit.setWalletProvider(config.beaconWallet)
    const twm = new TezosWalletManager({
      wallet,
      tezosToolkit,
      rpcNodes: fxhashConfig.tez.apis.rpcs,
      address: account.address,
    })
    setWalletManager(BlockchainType.TEZOS, twm)
  }

  useEffect(() => {
    invariant(config.beaconWallet, "BeaconWallet is required")
    const { beaconWallet } = config
    beaconWallet.client.subscribeToEvent(
      BeaconEvent.ACTIVE_ACCOUNT_SET,
      handleAccountSet
    )
    // We manually retrieve the active account on mount
    beaconWallet.client.getActiveAccount().then(handleAccountSet)
  }, [])

  return null
}
