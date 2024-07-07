import { type WalletsOrchestrator } from "@/wallets/index.js"
import { type Authenticator } from "@/auth/index.js"
import { reconciliationState } from "./utils.js"
import { UserReconciliationEventEmitter } from "./events.js"
import { invariant } from "@fxhash/shared"
import { intialization } from "@fxhash/utils"

export type UserReconciliationParams = {
  authenticator: Authenticator
  wallets: WalletsOrchestrator
}

/**
 * @author fxhash
 *
 * The UserReconciliation class plugs itself to the Authenticator & Wallets
 * Orchestrator events and emits success/error events based on the
 * reconciliation between these 2 states.
 */
export class UserReconciliation extends UserReconciliationEventEmitter {
  public authenticator: Authenticator
  public wallets: WalletsOrchestrator

  private _cleanup: (() => void)[] = []
  private _init = intialization()

  constructor({ authenticator, wallets }: UserReconciliationParams) {
    super()
    this.authenticator = authenticator
    this.wallets = wallets
  }

  public async init() {
    // This module expects the Authenticator & Wallet Orchestrator to be fully
    // initialized before it's initialized. This is to enforce a certain flow
    // for api consumers

    invariant(
      this.authenticator.initialized,
      `Authenticator must be initialized when the UserReconciliation is initialized, to ensure the initial state is ready when the first reconciliation happens.`
    )
    invariant(
      this.wallets.initialized,
      `WalletsOrchestrator must be initialized when the UserReconciliation is initialized, to ensure the initial state is ready when the first reconciliation happens.`
    )

    this._init.start()
    this._cleanup.push(
      this.authenticator.on("account-updated", this._reconciliate),
      this.wallets.on("wallet-changed", this._reconciliate)
    )
    this._init.finish()
  }

  private _reconciliate = () => {
    console.log("_reconciliate")
    const reconciliation = this.reconciliationState()
    console.log({ reconciliation })
    if (reconciliation.isSuccess()) {
      this.emit("valid-user-changed")
    } else {
      this.emit("user-reconciliation-error", reconciliation.error)
    }
  }

  public reconciliationState() {
    const account = this.authenticator.account
    const activeManagers = this.wallets.getActiveManagers()
    return reconciliationState(account, activeManagers)
  }

  public release() {
    this._cleanup.forEach(f => f())
    this._cleanup = []
  }
}
