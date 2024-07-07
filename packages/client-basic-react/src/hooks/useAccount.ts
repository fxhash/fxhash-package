import { useClient } from "./useClient.js"

export function useAccount() {
  const client = useClient()
  return { account: client.account, authenticated: !!client.account }
}
