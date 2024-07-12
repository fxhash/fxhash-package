import { UserReconciliationError } from "@fxhash/client-sdk"
import { useClient } from "./useClient.js"

type Ret = UserReconciliationError | null

export function useUserError(): Ret {
  return useClient().userError
}
