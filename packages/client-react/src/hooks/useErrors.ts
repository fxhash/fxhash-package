import { useEffect } from "react"
import { type UserSourceErrorEvents } from "@fxhash/sdk"
import { useClient } from "./useClient.js"

/**
 * Hook to listen to error events.
 * @param onError Callback to be called when an error event is emitted.
 */
export function useErrorEvents(
  onError: (error: UserSourceErrorEvents) => void
): void {
  const { client } = useClient()
  useEffect(() => {
    function handleErrors(error: UserSourceErrorEvents) {
      onError(error)
    }
    client.emitter.on("error", handleErrors)

    return () => {
      client.emitter.off("error", handleErrors)
    }
  }, [client, onError])
}
