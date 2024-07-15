import { cleanup, intialization } from "@fxhash/utils"
import {
  AccountAuthenticatedButNoWalletConnectedError,
  IUserSource,
  IWalletsSource,
  UserSourceEventEmitter,
  WalletConnectedButNoAccountAuthenticatedError,
  anyActiveManager,
} from "../_index.js"
import { IAuthAccountSource } from "../auth/_interfaces.js"
import { userReconciliation } from "./user-reconciliation.js"

type Options = {
  wallets: IWalletsSource
  account: IAuthAccountSource<any>
}

/**
 * Controls the logic for triggering authentication when a wallet is connected,
 * as well as reconciliating the wallets/account currently connected by emitting
 * clean user events as well as errors when reconciliation fails. This module
 * doesn't handle reconciliation errors except when a wallet is connected, in
 * which case it automatically starts a signing process with the provided
 * authenticator.
 * @deprecated
 */
export function walletsAndAccount({ wallets, account }: Options): IUserSource {
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

          // todo: authenticate doesn't always have the same signature here,
          // what to do ?
          // todo maybe pass `wallets` instance and let the auth module handle
          // how it should use it ?
          const result = await account.authenticate(anyManager)
          console.log({ result })

          // in case of failure, we reset the
          if (result.isFailure()) {
            // todo: should we provide a way to get feedback here ?
            await _reset()
          }
          // otherwise events will be automatically broadcasted
          return
        }
        // in a case where account is authenticated but no wallet is connected,
        // logout the account
        else if (err instanceof AccountAuthenticatedButNoWalletConnectedError) {
          await account.logoutAccount()
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
    if (auth) promises.push(account.logoutAccount())
    if (_wallets) promises.push(wallets.disconnectAllWallets())
    return Promise.all(promises)
  }

  return {
    emitter,
    initialized: () => init.finished,

    getAccount: account.getAccount,
    logoutAccount: account.logoutAccount,

    getWalletManagers: wallets.getWalletManagers,
    disconnectWallet: wallets.disconnectWallet,
    disconnectAllWallets: wallets.disconnectAllWallets,

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

        const results = await Promise.allSettled([
          account.logoutAccount(),
          wallets.disconnectAllWallets(),
        ])
        console.log({ results })
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
