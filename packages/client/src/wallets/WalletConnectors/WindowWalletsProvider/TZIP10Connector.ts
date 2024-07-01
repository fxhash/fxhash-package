import { DefaultBeaconWalletConfig } from "@fxhash/tez"
import { ITezosWalletConnector } from "../interfaces.js"
import {
  getDAppClientInstance,
  type DAppClient,
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
 * -
 */
export class TZIP10Connector implements ITezosWalletConnector {
  private beaconClient: DAppClient | null = null

  public async init() {
    this.beaconClient = getDAppClientInstance(DefaultBeaconWalletConfig)
    this.beaconClient.subscribeToEvent(
      BeaconEvent.ACTIVE_ACCOUNT_SET,
      this._handleAccountSet
    )
    await this.beaconClient.getActiveAccount().then(this._handleAccountSet)
  }

  private _handleAccountSet = (account?: AccountInfo) => {}

  public async getSigner() {}
}
