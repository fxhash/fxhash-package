import { useContext } from "react"
import { ClientPlugnPlayContext } from "@/providers/client.js"

export function useClient() {
  return useContext(ClientPlugnPlayContext)
}
