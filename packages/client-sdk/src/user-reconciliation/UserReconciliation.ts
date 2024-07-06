import { type WalletsOrchestrator } from "@/wallets/index.js"
import { type Authenticator } from "@/auth/index.js"
import { reconciliationState } from "./utils.js"
import { TypedEventTarget } from "@fxhash/utils"
import {
  UserReconciliationErrorEvent,
  UserReconciliationEventsTypemap,
  ValidUserChanged,
} from "./events.js"

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
export class UserReconciliation extends TypedEventTarget<UserReconciliationEventsTypemap> {
  public authenticator: Authenticator
  public wallets: WalletsOrchestrator

  private _cleanup: (() => void)[] = []

  constructor({ authenticator, wallets }: UserReconciliationParams) {
    super()
    this.authenticator = authenticator
    this.wallets = wallets
  }

  public async init() {
    this.authenticator.addEventListener("account-updated", this._reconciliate)
    this.wallets.addEventListener("wallet-changed", this._reconciliate)

    this._cleanup.push(() => {
      this.authenticator.removeEventListener(
        "account-updated",
        this._reconciliate
      )
      this.wallets.removeEventListener("wallet-changed", this._reconciliate)
    })
  }

  private _reconciliate = () => {
    const account = this.authenticator.account
    const activeManagers = this.wallets.getActiveManagers()
    const reconciliation = reconciliationState(account, activeManagers)
    if (reconciliation.isSuccess()) {
      this.dispatchTypedEvent("valid-user-changed", new ValidUserChanged())
    } else {
      this.dispatchTypedEvent(
        "user-reconciliation-error",
        new UserReconciliationErrorEvent(reconciliation.error)
      )
    }
  }

  public release() {
    this._cleanup.forEach(f => f())
    this._cleanup = []
  }
}
