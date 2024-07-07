import { useContext } from "react"
import { ClientContext } from "../provider/Client.js"

export function useClient(): ClientContext {
  return useContext(ClientContext)
}
