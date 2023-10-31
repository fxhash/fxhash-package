import { useTezosUserContext } from "./TezosUser"

export const useTezosAccount = (): { address: string | null } => {
  const { account } = useTezosUserContext()

  return { address: account }
}
