import { GetSingleUserProfileResult } from "@/auth/profile.js"
import { useState } from "react"
import { useClient } from "./useClient.js"
import { ClientContextEvent, WalletManagers, useLogin } from "../index.js"
import { BlockchainType } from "@fxhash/shared"

interface UseProfileHookResult {
  profile: GetSingleUserProfileResult | null
  isAuthenticated: boolean
}

export function useProfile(): UseProfileHookResult {
  const { client } = useClient()
  const [profile, setProfile] = useState<GetSingleUserProfileResult | null>(
    null
  )
  useLogin({
    [ClientContextEvent.onAuthenticate]: async () => {
      const profile = await client.getProfile()
      setProfile(profile)
    },
    [ClientContextEvent.onDisconnect]: (
      _,
      data: { walletManagers: WalletManagers }
    ) => {
      // When there is no wallet connected we reset the profile
      const hasWalletConnected =
        data.walletManagers[BlockchainType.TEZOS] ||
        data.walletManagers[BlockchainType.ETHEREUM]
      if (!hasWalletConnected) setProfile(null)
    },
  })
  return { profile, isAuthenticated: !!profile }
}
