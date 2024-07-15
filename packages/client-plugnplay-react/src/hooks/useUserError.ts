import { UserConsistencyError } from "@fxhash/client-sdk"
import { useClient } from "./useClient.js"

type Ret = UserConsistencyError | null

export function useUserError(): Ret {
  return useClient().userError
}
