import { cleanup, intialization } from "@fxhash/utils"
import { IWalletsSource, UserSourceEventEmitter } from "../_index.js"
import { IAccountSource } from "../auth/_interfaces.js"
import { invariant } from "@fxhash/shared"
import { reconciliationState } from "../utils/user-reconciliation.js"

type Options = {
  wallets: IWalletsSource
  account: IAccountSource
}

/**
 * Provide some account/wallets reconciliation utilities and control flows.
 * This module hooks to the account/wallets change events and automatically
 * computes the reconciliation state, eventually emitting a success/error
 * depending on the reconciliation state.
 */
export function userReconciliation({ wallets, account }: Options) {
  const init = intialization()
  const clean = cleanup()
  const emitter = new UserSourceEventEmitter()

  const _reconciliationState = () => {
    return reconciliationState(
      account.getAccount(),
      wallets.getWalletManagers()
    )
  }

  const _reconciliate = () => {
    console.log("_reconciliate")
    const reconciliation = _reconciliationState()
    console.log({ reconciliation })
    if (reconciliation.isSuccess()) {
      emitter.emit("user-changed")
    } else {
      emitter.emit("error", reconciliation.error)
    }
  }

  return {
    emitter,

    init: async () => {
      // This module expects the Account Source & Wallets Source to be fully
      // initialized before it's initialized. This is to enforce a certain flow
      // for api consumers

      console.log({ wallets, account })

      invariant(
        account.initialized(),
        `Account Source must be initialized when userReconciliation is initialized, to ensure the initial state is ready when the first reconciliation happens.`
      )
      invariant(
        wallets.initialized(),
        `Wallets Source must be initialized when userReconciliation is initialized, to ensure the initial state is ready when the first reconciliation happens.`
      )

      init.start()
      clean.add(
        account.emitter.on("account-changed", _reconciliate),
        wallets.emitter.on("wallets-changed", _reconciliate)
      )
      init.finish()
    },

    reconciliationState: _reconciliationState,
    reconciliate: _reconciliate,

    release: () => clean.clear(),
  }
}
