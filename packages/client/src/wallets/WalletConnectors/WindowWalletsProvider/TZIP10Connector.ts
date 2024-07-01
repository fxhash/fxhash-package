import { DefaultBeaconWalletConfig } from "@fxhash/tez"
import { ITezosWalletConnector } from "../interfaces.js"
import {
  getDAppClientInstance,
  type DAppClient,
  type DAppClientOptions,
  type AccountInfo,
  BeaconEvent,
} from "@airgap/beacon-sdk"

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
export class TZIP10Connector implements ITezosWalletConnector {
  private _beaconClient: DAppClient | null = null
  private _beaconConfig: DAppClientOptions

  constructor(beaconConfig?: DAppClientOptions) {
    this._beaconConfig = beaconConfig ?? DefaultBeaconWalletConfig
  }

  public async init(beaconConfigOverride?: DAppClientOptions) {
    if (beaconConfigOverride) this._beaconConfig = beaconConfigOverride
    this._beaconClient = getDAppClientInstance(this._beaconConfig)
    this._beaconClient.subscribeToEvent(
      BeaconEvent.ACTIVE_ACCOUNT_SET,
      this._handleAccountSet
    )
    await this._beaconClient.getActiveAccount().then(this._handleAccountSet)
  }

  private _handleAccountSet = (account?: AccountInfo) => {}

  public async getSigner() {}
}
