import { GetSingleUserAccountResult, TActiveManagersMap } from "@/index.js"
import { Result, failure, success } from "@fxhash/shared"
import {
  AccountAuthenticatedButNoWalletConnectedError,
  UserReconciliationError,
  WalletConnectedButNoAccountAuthenticatedError,
  WalletDoesntBelongAccountError,
} from "./errors.js"
import { BlockchainEnvs } from "@/wallets/WalletConnectors/events.js"

/**
 * Given an Account and some Wallet Managers, returns a failure with an error
 * if the values are not valid, otherwise returns a success.
 * @param account Updated authenticated account (or lack thereof)
 * @param managers Updated active wallet managers
 * @returns Success or Failure (with reconciliation error)
 */
export function reconciliationState(
  account: GetSingleUserAccountResult | null,
  managers: TActiveManagersMap
): Result<true, UserReconciliationError> {
  // any of the active wallet managers
  const anyActiveManager = managers.EVM || managers.TEZOS
  const noWalletConnected = !anyActiveManager

  if (!account) {
    if (noWalletConnected) {
      return success(true)
    }
    return failure(
      new WalletConnectedButNoAccountAuthenticatedError(
        anyActiveManager.manager
      )
    )
  }

  // account is authenticated but no wallet is currently connected
  if (noWalletConnected) {
    return failure(new AccountAuthenticatedButNoWalletConnectedError())
  }

  // check whether the wallets currently connected are owned by the account
  for (const env of BlockchainEnvs) {
    const man = managers[env]?.manager
    if (!man) continue
    if (!account.wallets.find(w => w.address === man.address)) {
      return failure(new WalletDoesntBelongAccountError(man))
    }
  }

  return success(true)
}
