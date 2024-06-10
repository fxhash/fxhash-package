import { GetSingleUserProfileResult } from "@/auth/profile.js"
import { useState } from "react"
import { useClient } from "./useClient.js"
import { ClientContextEvent, useLogin } from "../index.js"

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
  })
  return { profile, isAuthenticated: !!profile }
}
