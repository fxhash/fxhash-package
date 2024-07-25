import { DefaultBeaconWalletConfig } from "@fxhash/tez"
import { WalletEventEmitter } from "../_interfaces.js"
import {
  type DAppClientOptions,
  type AccountInfo,
  BeaconEvent,
} from "@airgap/beacon-sdk"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { invariant } from "@fxhash/shared"
import { TezosWindowWallet } from "./_interfaces.js"
import { intialization } from "@fxhash/utils"

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
export function tzip10WalletConnector({
  beaconConfig,
}: Options): TezosWindowWallet {
  const emitter = new WalletEventEmitter()
  const _init = intialization()
  const _beaconConfig = beaconConfig ?? DefaultBeaconWalletConfig
  let _beaconWallet: BeaconWallet | null = null
  let _info: AccountInfo | null = null

  // todo async
  const _handleAccountSet = (account?: AccountInfo) => {
    const prevInfo = _info
    _info = account || null
    if (_info?.address !== prevInfo?.address) {
      emitter.emit("wallet-changed", _info)
    }
  }

  return {
    emitter,

    init: async () => {
      _init.start()
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
      _init.finish()
    },

    release: () => {},

    requestConnection: () => {
      _beaconWallet?.requestPermissions()
    },

    getWallet: () => {
      invariant(_beaconWallet, "Beacon Wallet not instanciated")
      return _beaconWallet
    },

    getInfo: () => _info,

    disconnect: async () => {
      await _beaconWallet?.clearActiveAccount()
    },

    requirements: () => ({
      userInput: true,
    }),
  }
}
