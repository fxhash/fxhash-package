import { useContext } from "react"
import { FxhashClientContext } from "../Provider.js"

export function useFxhashClient() {
  return useContext(FxhashClientContext)
}
