import { GetMyAccountQuery, Qu_GetMyAccount } from "@fxhash/gql"
import { GqlOptions, gqlDefaultOptions } from "@/util/gql.js"
import { GraphQLError, UnexpectedError } from "@/index.js"

export type GetSingleUserAccountResult = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<NonNullable<GetMyAccountQuery["offchain"]>["UserAccount"]>[0]
    >
  >["account"]
>

/**
 * @returns The profile of the user currently authenticated against the backend.
 * The client should be configured for handling credentials if not hanlded
 * automatically by cookies.
 */
export async function getMyProfile(
  options: GqlOptions = gqlDefaultOptions
): Promise<GetSingleUserAccountResult> {
  const { gqlClient } = options
  const { data, error } = await gqlClient.query(Qu_GetMyAccount, {})
  if (error) {
    throw new GraphQLError(error.message)
  }
  if (!data || !data.offchain?.UserAccount[0]?.account) {
    throw new UnexpectedError()
  }
  return data.offchain.UserAccount[0].account
}

/**
 * @param profile
 * @param address
 * @returns `true` if provided profile has a given wallet, `false` otherwise
 */
export function profileContainsAddress(
  profile: GetSingleUserAccountResult,
  address: string | `0x${string}`
) {
  return profile.wallets.find(w => w.address === address)
}
