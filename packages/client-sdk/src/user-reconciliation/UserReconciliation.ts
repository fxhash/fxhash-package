import { type WalletsOrchestrator } from "@/wallets/index.js"
import { type Authenticator } from "@/auth/index.js"
import { reconciliationState } from "./utils.js"
import { UserReconciliationEventEmitter } from "./events.js"

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

  constructor({ authenticator, wallets }: UserReconciliationParams) {
    super()
    this.authenticator = authenticator
    this.wallets = wallets
  }

  public async init() {
    this.authenticator.on("account-updated", this._reconciliate)
    this.wallets.on("wallet-changed", this._reconciliate)

    this._cleanup.push(() => {
      this.authenticator.off("account-updated", this._reconciliate)
      this.wallets.off("wallet-changed", this._reconciliate)
    })
  }

  private _reconciliate = () => {
    const reconciliation = this.reconciliationState()
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
