import { DefaultBeaconWalletConfig } from "@fxhash/tez"
import { type DAppClientOptions, type AccountInfo } from "@airgap/beacon-sdk"
import type { BeaconWallet } from "@taquito/beacon-wallet"
import { BlockchainNetwork } from "@fxhash/shared"
import { failure, success } from "@fxhash/utils"
import { IWindowWalletsSource } from "./_interfaces.js"
import { TezosClientNotAvailableError } from "@/index.js"
import { createTezosWalletManager, walletSource } from "../common/_private.js"
import { intialization } from "@fxhash/utils"
import {
  WalletSourceRequestConnectionUnknownError,
  WalletSourceRequestConnectionRejectedError,
} from "@fxhash/errors"

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
  const _init = intialization()
  const _beaconConfig = beaconConfig ?? DefaultBeaconWalletConfig
  let _beaconWallet: BeaconWallet | null = null

  const wallet = walletSource({
    network: BlockchainNetwork.TEZOS,
    init: async () => {
      try {
        _init.start()
        const _handleAccountSet = (account?: AccountInfo) =>
          wallet.utils.update(account || null)
        /**
         * Note: BeaconWallet uses getDAppClientInstance() under the hood, ensuring
         * there's only a single Beacon Wallet instance in all times.
         */
        const BeaconWallet = (await import("@taquito/beacon-wallet"))
          .BeaconWallet
        const BeaconEvent = (await import("@airgap/beacon-sdk")).BeaconEvent
        _beaconWallet = new BeaconWallet(_beaconConfig)
        _beaconWallet.client.subscribeToEvent(
          BeaconEvent.ACTIVE_ACCOUNT_SET,
          _handleAccountSet
        )
        const activeAccount = await _beaconWallet.client.getActiveAccount()
        await _handleAccountSet(activeAccount)
        _init.finish()
      } catch (err) {
        console.error(err)
        throw _init.fail(err)
      }
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
    requestConnection: async () => {
      try {
        await _beaconWallet?.requestPermissions()
      } catch (e) {
        const AbortedBeaconError = (await import("@airgap/beacon-sdk"))
          .AbortedBeaconError
        if (e instanceof AbortedBeaconError)
          return failure(new WalletSourceRequestConnectionRejectedError())
        return failure(
          new WalletSourceRequestConnectionUnknownError(
            (e as Error).message ?? "Unknown error"
          )
        )
      }
      return success()
    },
  }
}
