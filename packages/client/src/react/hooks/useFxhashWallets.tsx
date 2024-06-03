import { useContext } from "react"
import { FxhashWalletContext } from "../provider/Wallet.js"

export function useFxhashWallets() {
  return useContext(FxhashWalletContext)
}
