import { gqlClient as defaultClient } from "@fxhash/gql-client"
import {
  ChallengeInput,
  ChallengeResult,
  Mu_AuthGenerateChallenge,
} from "@fxhash/gql"
import { GraphQLError } from "@/util/Error.js"

/**
 * Generate a challenge for the user
 * @param {GenerateChallengeProps} props
 * @returns {GenerateChallengeResponse}
 * @throws {Error}
 * @example
 * ```ts
 *  const { text, challenge } = await generateChallenge({
 *    chain: BlockchainType.ETHEREUM,
 *    address: "0x1234567890",
 *  })
 * ```
 */

type GenerateChallengeOptions = {
  gqlClient: typeof defaultClient
}

const defaultOptions: GenerateChallengeOptions = {
  gqlClient: defaultClient,
}

export async function generateChallenge(
  input: ChallengeInput,
  options: GenerateChallengeOptions = defaultOptions
): Promise<ChallengeResult> {
  const { gqlClient } = options
  const { data, error } = await gqlClient.mutation(Mu_AuthGenerateChallenge, {
    input,
  })
  if (error) {
    throw new GraphQLError(error.message)
  }
  if (!data || !data.generate_challenge) {
    throw new GraphQLError("Unexpected error")
  }
  return data.generate_challenge
}
