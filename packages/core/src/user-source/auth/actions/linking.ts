import { GqlOptions, gqlDefaultOptions } from "@/index.js"
import {
  LinkWalletError,
  LinkWalletErrors,
  UnlinkWalletError,
  UnlinkWalletErrors,
  WithGqlErrors,
  richResultFromGraphQLResponse,
} from "@fxhash/errors"
import {
  LinkWalletInput,
  Mu_LinkWalletToAccount,
  Mu_UnlinkWalletFromAccount,
  UnlinkWalletInput,
} from "@fxhash/gql"
import { PromiseResult } from "@fxhash/utils"

/**
 * Link a wallet to an account. The authenticated user must have the rights to
 * update the account wallet (only users can update their wallets).
 *
 * @param input
 * @param options
 */
export async function linkWalletToAccount(
  input: LinkWalletInput,
  options: GqlOptions = gqlDefaultOptions
): PromiseResult<true, WithGqlErrors<LinkWalletError>> {
  const { gqlClient } = options

  return richResultFromGraphQLResponse(
    await gqlClient.mutation(Mu_LinkWalletToAccount, {
      input: input,
    }),
    _ => true, // doesn't return any data
    LinkWalletErrors
  )
}

/**
 * Unlink a wallet from an account. The authenticated user must have the rights
 * to perform such action (only owners can remove wallets from their account).
 * The wallet must not be the main wallet account and must be already linked to
 * the account.
 *
 * @param input
 * @param options
 */
export async function unlinkWalletFromAccount(
  input: UnlinkWalletInput,
  options: GqlOptions = gqlDefaultOptions
): PromiseResult<true, WithGqlErrors<UnlinkWalletError>> {
  const { gqlClient } = options

  return richResultFromGraphQLResponse(
    await gqlClient.mutation(Mu_UnlinkWalletFromAccount, {
      input: input,
    }),
    _ => true, // doesn't return any data
    UnlinkWalletErrors
  )
}
