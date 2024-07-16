import { UserConsistencyError } from "@fxhash/client-sdk"
import { useClient } from "./useClient.js"

export type UseUserError = UserConsistencyError | null

export function useUserError(): UseUserError {
  return useClient().userError
}
