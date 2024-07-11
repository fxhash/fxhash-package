import { cleanup, intialization } from "@fxhash/utils"
import {
  IUserSource,
  IWalletsSource,
  UserSourceEventEmitter,
  WalletConnectedButNoAccountAuthenticatedError,
  anyActiveManager,
} from "../_index.js"
import { IWalletsAccountSource } from "../auth/_interfaces.js"
import { userReconciliation } from "./user-reconciliation.js"

type Options = {
  wallets: IWalletsSource
  account: IWalletsAccountSource
}

/**
 * Controls the logic for triggering authentication when a wallet is connected,
 * as well as reconciliating the wallets/account currently connected by emitting
 * clean user events as well as errors when reconciliation fails. This module
 * doesn't handle reconciliation errors except when a wallet is connected, in
 * which case it automatically starts a signing process with the provided
 * authenticator.
 */
export function walletsWithAccount({ wallets, account }: Options): IUserSource {
  const init = intialization()
  const clean = cleanup()
  const emitter = new UserSourceEventEmitter()
  const reconciliation = userReconciliation({ wallets, account })

  const _hookEvents = () => {
    clean.add(
      reconciliation.emitter.on("error", async err => {
        // if a wallet was connected, but there is no account we can attempt a
        // signing process with said wallet
        if (err instanceof WalletConnectedButNoAccountAuthenticatedError) {
          console.log("attemp sign in with wallet")
          const managers = wallets.getWalletManagers()
          const anyManager = anyActiveManager(managers)
          if (!anyManager) {
            throw Error(
              `something weird with the implementation, shouldn't reach this`
            )
          }
          const result = await account.authenticate(anyManager)

          // in case of failure, we reset the
          if (result.isFailure()) {
            // todo: should we provide a way to get feedback here ?
            await _reset()
          }
          // otherwise events will be automatically broadcasted
          return
        }

        // otherwise forward the error to be handlded by applications
        // todo ? should we enforce some reconciliation here ??
        emitter.emit("error", err)
      }),
      reconciliation.emitter.pipe("user-changed", emitter),
      wallets.emitter.pipe("wallets-changed", emitter),
      account.emitter.pipe("account-changed", emitter)
    )
  }

  const _reset = (
    {
      auth = true,
      wallets: _wallets = true,
    }: {
      auth: boolean
      wallets: boolean
    } = {
      auth: true,
      wallets: true,
    }
  ) => {
    const promises: Promise<void>[] = []
    if (auth) promises.push(account.logout())
    if (_wallets) promises.push(wallets.disconnectAll())
    return Promise.all(promises)
  }

  return {
    emitter,
    getAccount: account.getAccount,
    getWalletManagers: wallets.getWalletManagers,
    get initialized() {
      return init.finished
    },

    init: async () => {
      init.start()

      await Promise.all([wallets.init(), account.init()])
      await reconciliation.init()

      const recon = reconciliation.reconciliationState()
      if (recon.isFailure()) {
        // todo ? remove logs here ?
        console.log(
          `The wallets/account are in an incoherent state, the following error was emitted after initialization:`
        )
        console.log(recon.error)
        console.log(
          `Wallets/Account will be cleared as a coherent cannot be recovered at this stage.`
        )

        await Promise.allSettled([account.logout(), wallets.disconnectAll()])
      }

      emitter.emit("user-changed")
      _hookEvents()
    },

    release: () => {
      wallets.release?.()
      reconciliation?.release()
      clean.clear()
    },
  }
}
