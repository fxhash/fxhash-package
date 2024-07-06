import {
  ChallengeInput,
  ChallengeResult,
  Mu_AuthGenerateChallenge,
} from "@fxhash/gql"
import { GraphQLError, UnexpectedError } from "@/util/Error.js"
import { GqlOptions, gqlDefaultOptions } from "@/util/gql.js"

/**
 * Generate a challenge for the user
 * @param input {ChallengeInput}
 * @param props {GqlOptions}
 * @returns {ChallengeResult}
 * @throws {Error}
 * @example
 * ```ts
 *  const { text, challenge } = await generateChallenge({
 *    chain: BlockchainType.ETHEREUM,
 *    address: "0x1234567890",
 *  })
 * ```
 */

export async function generateChallenge(
  input: ChallengeInput,
  options: GqlOptions = gqlDefaultOptions
): Promise<ChallengeResult> {
  const { gqlClient } = options
  const { data, error } = await gqlClient.mutation(Mu_AuthGenerateChallenge, {
    input,
  })
  if (error) {
    throw new GraphQLError(error.message)
  }
  if (!data || !data.generate_challenge) {
    throw new UnexpectedError()
  }
  return data.generate_challenge
}
