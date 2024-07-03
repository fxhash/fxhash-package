import { GetSingleUserProfileResult } from "@/auth/profile.js"
import { useState } from "react"
import { useClient } from "./useClient.js"
import { useConnect } from "./useConnect.js"
import { useDisconnect } from "./useDisconnect.js"

interface UseProfileHookResult {
  profile: GetSingleUserProfileResult | null
  isAuthenticated: boolean
}

export function useProfile(): UseProfileHookResult {
  const { isConnected, client } = useClient()
  const [profile, setProfile] = useState<GetSingleUserProfileResult | null>(
    null
  )
  // When a wallet is connected we fetch the user profile
  useConnect(async () => {
    const profile = await client.auth.getProfile()
    setProfile(profile)
  })

  // When all wallets are disconnected, profile should be null
  useDisconnect(async () => {
    if (profile && !isConnected) setProfile(null)
  })
  return { profile, isAuthenticated: !!profile }
}
