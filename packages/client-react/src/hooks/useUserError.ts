import { UserSourceEventsTypemap } from "@fxhash/sdk"
import { useClient } from "./useClient.js"

export type UseUserError = UserSourceEventsTypemap["error"]["error"] | null

export function useUserError(): UseUserError {
  return useClient().userError
}
