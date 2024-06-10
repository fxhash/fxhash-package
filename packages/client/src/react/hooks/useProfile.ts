import { GetSingleUserProfileResult } from "@/auth/profile.js"
import { useEffect, useState } from "react"
import { useClient } from "./useClient.js"
import { ClientContextEvent, useLogin } from "../index.js"

interface UseProfileHookResult {
  profile: GetSingleUserProfileResult | null
  isAuthenticated: boolean
}

export function useProfile(): UseProfileHookResult {
  const { client, isConnected } = useClient()
  const [profile, setProfile] = useState<GetSingleUserProfileResult | null>(
    null
  )
  useLogin({
    [ClientContextEvent.onAuthenticate]: async () => {
      const profile = await client.getProfile()
      setProfile(profile)
    },
  })
  // When all wallets are disconnected, profile should be null
  useEffect(() => {
    if (profile && !isConnected) setProfile(null)
  }, [isConnected, profile])
  return { profile, isAuthenticated: !!profile }
}
