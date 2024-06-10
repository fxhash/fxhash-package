import {
  Account_Bool_Exp,
  GetAccountsQuery,
  Qu_GetAccountsBaseDetails,
} from "@fxhash/gql"
import { GqlOptions, gqlDefaultOptions } from "@/util/gql.js"
import { GraphQLError, UnexpectedError } from "@/index.js"

// TODO: Is there a better soltuon for this?
export type GetSingleUserProfileResult = NonNullable<
  NonNullable<NonNullable<GetAccountsQuery["offchain"]>["Account"]>[0]
>

export async function getUserProfile(
  where: Account_Bool_Exp,
  options: GqlOptions = gqlDefaultOptions
): Promise<GetSingleUserProfileResult> {
  const { gqlClient } = options
  const { data, error } = await gqlClient.query(Qu_GetAccountsBaseDetails, {
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
