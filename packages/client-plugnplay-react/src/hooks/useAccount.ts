import { GetSingleUserAccountResult } from "@fxhash/client-sdk"
import { useClient } from "./useClient.js"

export type UseAccount = {
  account: GetSingleUserAccountResult | null
  authenticated: boolean
}

/**
 * Returns the account currenly authenticated by the configured user source.
 */
export function useAccount(): UseAccount {
  const client = useClient()
  return { account: client.account, authenticated: !!client.account }
}
