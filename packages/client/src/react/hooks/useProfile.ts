import { GetUserProfileResult } from "@/auth/profile.js"
import { useState } from "react"
import { useClient } from "./useClient.js"
import { ClientContextEvent, useLogin } from "../index.js"

interface UseProfileHookResult {
  profile: GetUserProfileResult | null
}

export function useProfile(): UseProfileHookResult {
  const { client } = useClient()
  const [profile, setProfile] = useState<GetUserProfileResult | null>(null)
  useLogin({
    [ClientContextEvent.onAuthenticate]: async () => {
      const profile = await client.getProfile()
      setProfile(profile)
    },
  })
  return { profile }
}
