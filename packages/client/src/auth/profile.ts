import {
  Account_Bool_Exp,
  GetAccountWalletsQuery,
  Qu_GetAccountWallets,
} from "@fxhash/gql"
import { GqlOptions, gqlDefaultOptions } from "@/util/gql.js"
import { GraphQLError, UnexpectedError } from "@/index.js"

// TODO: Is there a better soltuon for this?
export type GetSingleUserProfileResult = NonNullable<
  NonNullable<NonNullable<GetAccountWalletsQuery["offchain"]>["Account"]>[0]
>

export async function getUserProfile(
  where: Account_Bool_Exp,
  options: GqlOptions = gqlDefaultOptions
): Promise<GetSingleUserProfileResult> {
  const { gqlClient } = options
  const { data, error } = await gqlClient.query(Qu_GetAccountWallets, {
    where,
  })
  if (error) {
    throw new GraphQLError(error.message)
  }
  if (!data || !data.offchain?.Account) {
    throw new UnexpectedError()
  }
  return data.offchain.Account[0]
}

export function profileContainsAddress(
  profile: GetSingleUserProfileResult,
  address: string | `0x${string}`
) {
  return profile.wallets.find(w => w.address === address)
}
