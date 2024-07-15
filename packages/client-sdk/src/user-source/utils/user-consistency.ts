import { Result, failure, success } from "@fxhash/shared"
import {
  AccountAuthenticatedButNoWalletConnectedError,
  UserConsistencyError,
  WalletConnectedButNoAccountAuthenticatedError,
  WalletDoesntBelongAccountError,
} from "../_errors.js"
import { WalletManagersMap } from "../_interfaces.js"
import { BlockchainNetworks, anyActiveManager } from "../_index.js"
import { GetSingleUserAccountResult } from "../auth/_index.js"

/**
 * Given an Account and some Wallet Managers, returns a failure with an error
 * if there is any inconsistency with the account & wallets (ex: wallet doesn't
 * belong to account). For the list of all the potential errors, look into the
 * `UserConsistency` union returned as a failure by this module.
 *
 * @param account Updated authenticated account (or lack thereof)
 * @param managers Updated active wallet managers
 *
 * @returns Success or Failure (with coherency error)
 */
export function isUserStateConsistent(
  account: GetSingleUserAccountResult | null,
  managers: WalletManagersMap
): Result<void, UserConsistencyError> {
  // any of the active wallet managers
  const _anyActiveManager = anyActiveManager(managers)
  const noWalletConnected = !_anyActiveManager

  console.log({ account, managers, _anyActiveManager, noWalletConnected })

  if (!account) {
    if (noWalletConnected) {
      return success()
    }
    return failure(
      new WalletConnectedButNoAccountAuthenticatedError(_anyActiveManager)
    )
  }

  // account is authenticated but no wallet is currently connected
  if (noWalletConnected) {
    return failure(new AccountAuthenticatedButNoWalletConnectedError())
  }

  // check whether the wallets currently connected are owned by the account
  for (const net of BlockchainNetworks) {
    const man = managers[net] || null
    if (!man) continue
    if (!account.wallets.find(w => w.address === man.address)) {
      return failure(new WalletDoesntBelongAccountError(man))
    }
  }

  return success()
}
