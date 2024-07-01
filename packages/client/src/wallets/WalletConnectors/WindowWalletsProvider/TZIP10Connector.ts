import { DefaultBeaconWalletConfig } from "@fxhash/tez"
import { ITezosWalletConnector } from "../interfaces.js"
import {
  type DAppClientOptions,
  type AccountInfo,
  BeaconEvent,
} from "@airgap/beacon-sdk"
import { TypedEventTarget } from "@/util/TypedEventTarget.js"
import { WindowWalletChanged, WindowWalletEventsMap } from "./events.js"
import { SetProviderOptions } from "@taquito/taquito"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { invariant } from "@fxhash/shared"

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
  extends TypedEventTarget<WindowWalletEventsMap>
  implements ITezosWalletConnector
{
  private _beaconWallet: BeaconWallet | null = null
  private _beaconConfig: DAppClientOptions

  constructor(beaconConfig?: DAppClientOptions) {
    super()
    this._beaconConfig = beaconConfig ?? DefaultBeaconWalletConfig
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
    await this._beaconWallet.client
      .getActiveAccount()
      .then(this._handleAccountSet)
  }

  private _handleAccountSet = (account?: AccountInfo) => {
    // todo: do something internally with account here
    console.log({ account })

    this.dispatchTypedEvent("changed", new WindowWalletChanged())
  }

  public getTaquitoProvider(): SetProviderOptions {
    invariant(this._beaconWallet, "Beacon Wallet not instanciated")

    return {
      wallet: this._beaconWallet,
    }
  }
}
