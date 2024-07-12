import { GetSingleUserAccountResult } from "@fxhash/client-sdk"
import { useClient } from "./useClient.js"

type Ret = {
  account: GetSingleUserAccountResult | null
  authenticated: boolean
}

export function useAccount(): Ret {
  const client = useClient()
  return { account: client.account, authenticated: !!client.account }
}
