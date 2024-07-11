import { DefaultBeaconWalletConfig } from "@fxhash/tez"
import { ITezosWalletConnector } from "../_interfaces.js"
import {
  type DAppClientOptions,
  type AccountInfo,
  BeaconEvent,
} from "@airgap/beacon-sdk"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { invariant } from "@fxhash/shared"
import { ITezosAccountDetails } from "../events.js"
import { IWindowWalletConnector } from "./_interfaces.js"

type AccountChangeHandler = (account?: ITezosAccountDetails) => Promise<void>

type TZIP10ConnectorParams = {
  beaconConfig?: DAppClientOptions
  onAccountChange: AccountChangeHandler
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
export class TZIP10Connector
  implements ITezosWalletConnector, IWindowWalletConnector
{
  private _beaconWallet: BeaconWallet | null = null
  private _beaconConfig: DAppClientOptions
  private _onAccountChange: AccountChangeHandler

  constructor({ beaconConfig, onAccountChange }: TZIP10ConnectorParams) {
    this._beaconConfig = beaconConfig ?? DefaultBeaconWalletConfig
    this._onAccountChange = onAccountChange
  }

  public async init(beaconConfigOverride?: DAppClientOptions) {
    if (beaconConfigOverride) this._beaconConfig = beaconConfigOverride

    /**
     * Note: BeaconWallet uses getDAppClientInstance() under the hood, ensuring
     * there's only a single Beacon Wallet instance in all times.
     */
    this._beaconWallet = new BeaconWallet(this._beaconConfig)

    this._beaconWallet.client.subscribeToEvent(
      BeaconEvent.ACTIVE_ACCOUNT_SET,
      this._handleAccountSet
    )
    const activeAccount = await this._beaconWallet.client.getActiveAccount()
    await this._handleAccountSet(activeAccount)
  }

  public release() {}

  public requestConnection() {
    this._beaconWallet?.requestPermissions()
  }

  private _handleAccountSet = (account?: AccountInfo) => {
    return this._onAccountChange(account)
  }

  public getWallet(): BeaconWallet {
    invariant(this._beaconWallet, "Beacon Wallet not instanciated")
    return this._beaconWallet
  }

  public async disconnect() {
    return this._beaconWallet?.disconnect()
  }
}
