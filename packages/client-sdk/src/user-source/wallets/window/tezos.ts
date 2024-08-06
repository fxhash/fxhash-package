import { DefaultBeaconWalletConfig } from "@fxhash/tez"
import {
  type DAppClientOptions,
  type AccountInfo,
  BeaconEvent,
} from "@airgap/beacon-sdk"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { BlockchainNetwork, failure, success } from "@fxhash/shared"
import { IWindowWalletsSource } from "./_interfaces.js"
import { TezosClientNotAvailableError } from "@/index.js"
import { createTezosWalletManager, walletSource } from "../common/_private.js"

type Options = {
  beaconConfig: DAppClientOptions
}

/**
 * @author fxhash
 *
 * Implements wallet connection for TZIP-10 spec.
 * <https://tzip.tezosagora.org/proposal/tzip-10/>
 *
 * The TZIP-10 spec defines a common interface for browser wallets to expose
 * features to interact with the wallet in the page javascript window context.
 *
 * This WalletConnector is designed to:
 *  - query initial wallet state at startup
 *  - subscribe to tzip10 events to get wallet state using Beacon wallet
 *    implementation
 *  - expose a signer which can be used by a taquito instance to sign operations
 */
export function tzip10WalletSource({
  beaconConfig,
}: Options): IWindowWalletsSource {
  const _beaconConfig = beaconConfig ?? DefaultBeaconWalletConfig
  let _beaconWallet: BeaconWallet | null = null

  const wallet = walletSource({
    network: BlockchainNetwork.TEZOS,
    init: async () => {
      const _handleAccountSet = (account?: AccountInfo) =>
        wallet.utils.update(account || null)

      /**
       * Note: BeaconWallet uses getDAppClientInstance() under the hood, ensuring
       * there's only a single Beacon Wallet instance in all times.
       */
      _beaconWallet = new BeaconWallet(_beaconConfig)
      _beaconWallet.client.subscribeToEvent(
        BeaconEvent.ACTIVE_ACCOUNT_SET,
        _handleAccountSet
      )
      const activeAccount = await _beaconWallet.client.getActiveAccount()
      await _handleAccountSet(activeAccount)
    },
    disconnect: async () => {
      await _beaconWallet?.clearActiveAccount()
    },
    createManager: async info => {
      if (!info || !_beaconWallet)
        return failure(new TezosClientNotAvailableError())
      return success(
        createTezosWalletManager({
          info,
          source: {
            wallet: _beaconWallet,
          },
        })
      )
    },
    requirements: () => ({
      userInput: true,
    }),
  })

  return {
    ...wallet.source,
    requestConnection: () => {
      _beaconWallet?.requestPermissions()
    },
  }
}
