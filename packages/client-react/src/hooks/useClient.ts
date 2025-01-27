import { useContext } from "react"
import { ClientPlugnPlayContext } from "@/providers/client.js"

/**
 * The active PlugnPlay client instance.
 */
export function useClient() {
  return useContext(ClientPlugnPlayContext)
}
