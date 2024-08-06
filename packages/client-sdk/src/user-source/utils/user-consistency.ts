import { BlockchainNetworks, Result, failure, success } from "@fxhash/shared"
import { WalletsMap } from "../_index.js"
import { GetSingleUserAccountResult } from "../auth/_index.js"
import { anyActiveManager } from "../wallets/common/utils.js"
import {
  AccountAuthenticatedButNoWalletConnectedError,
  UserConsistencyError,
  WalletConnectedButNoAccountAuthenticatedError,
  WalletDoesntBelongAccountError,
} from "@/index.js"

/**
 * Given an Account and some Wallet Managers, returns a failure with an error
 * if there is any inconsistency with the account & wallets (ex: wallet doesn't
 * belong to account). For the list of all the potential errors, look into the
 * `UserConsistency` union returned as a failure by this module.
 *
 * @param account Updated authenticated account (or lack thereof)
 * @param wallets Updated map of the Wallets for which state consistency wants
 * to be tested.
 *
 * @returns Success or Failure (with coherency error)
 */
export function isUserStateConsistent(
  account: GetSingleUserAccountResult | null,
  wallets: WalletsMap
): Result<void, UserConsistencyError> {
  // any of the active wallet managers
  const _anyActiveManager = anyActiveManager(wallets)
  const noWalletConnected = !_anyActiveManager

  if (!account) {
    return noWalletConnected
      ? success()
      : failure(
          new WalletConnectedButNoAccountAuthenticatedError(_anyActiveManager)
        )
  }

  // account is authenticated but no wallet is currently connected
  if (noWalletConnected) {
    return failure(new AccountAuthenticatedButNoWalletConnectedError())
  }

  // check whether the wallets currently connected are owned by the account
  for (const net of BlockchainNetworks) {
    const wallet = wallets[net]?.connected || null
    if (!wallet) continue
    if (!account.wallets.find(w => w.address === wallet.info.address)) {
      return failure(new WalletDoesntBelongAccountError(wallet))
    }
  }

  return success()
}
