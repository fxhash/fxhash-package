import { useContext } from "react"
import { FxhashClientContext } from "../provider/Client.js"

export function useFxhashClient() {
  return useContext(FxhashClientContext)
}
