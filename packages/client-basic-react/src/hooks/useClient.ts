import { useContext } from "react"
import { FxhashClientBasicContext } from "@/providers/ClientBasic.js"

export function useClient() {
  return useContext(FxhashClientBasicContext)
}
