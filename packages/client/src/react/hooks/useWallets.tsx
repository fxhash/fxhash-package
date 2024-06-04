import { useContext } from "react"
import { WalletsContext } from "../provider/Wallets.js"

export function useWallets(): WalletsContext {
  return useContext(WalletsContext)
}
