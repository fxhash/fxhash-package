import { CleanUserReconciliationError } from "@fxhash/client-basic"
import { useClient } from "./useClient.js"

type Ret = CleanUserReconciliationError | null

export function useUserError(): Ret {
  return useClient().userError
}
