import { Result, failure, success } from "@fxhash/shared"
import {
  AccountAuthenticatedButNoWalletConnectedError,
  UserReconciliationError,
  WalletConnectedButNoAccountAuthenticatedError,
  WalletDoesntBelongAccountError,
} from "../_errors.js"
import { WalletManagersMap } from "../_interfaces.js"
import { BlockchainNetworks, anyActiveManager } from "../_index.js"
import { GetSingleUserAccountResult } from "../auth/_index.js"

/**
 * Given an Account and some Wallet Managers, returns a failure with an error
 * if the values are not valid, otherwise returns a success.
 * @param account Updated authenticated account (or lack thereof)
 * @param managers Updated active wallet managers
 * @returns Success or Failure (with reconciliation error)
 */
export function reconciliationState(
  account: GetSingleUserAccountResult | null,
  managers: WalletManagersMap
): Result<true, UserReconciliationError> {
  // any of the active wallet managers
  const _anyActiveManager = anyActiveManager(managers)
  const noWalletConnected = !_anyActiveManager

  if (!account) {
    if (noWalletConnected) {
      return success(true)
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

  return success(true)
}
