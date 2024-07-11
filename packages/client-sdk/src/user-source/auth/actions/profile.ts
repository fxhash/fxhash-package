import { GetMyAccountQuery, Qu_GetMyAccount } from "@fxhash/gql"
import { GqlOptions, gqlDefaultOptions } from "@/util/gql.js"
import { GraphQLError, UnexpectedError } from "@/util/Error.js"

export type GetSingleUserAccountResult = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<NonNullable<GetMyAccountQuery["offchain"]>["UserAccount"]>[0]
    >
  >["account"]
>

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

export function profileContainsAddress(
  profile: GetSingleUserAccountResult,
  address: string | `0x${string}`
) {
  return profile.wallets.find(w => w.address === address)
}
