import { useMemo } from "react"
import { useEthereumUserContext } from "./EthereumUser"
import { useTezosUserContext } from "./TezosUser"
import { BlockchainType } from "@fxhash/shared"

/**
 * Returns a mapping of blockchains -> blockchain user based on the users stored
 * in the context.
 *
 * @example
 *
 * const chainUsers = useBlockchainUsers()
 * chainUsers[BlockchainType.TEZOS].disonnect()
 * chainUsers.ETHREUM.disconnect()
 */
export function useBlockchainUsers() {
  const ethUser = useEthereumUserContext()
  const tezUser = useTezosUserContext()

  return useMemo(
    () => ({
      [BlockchainType.ETHEREUM]: ethUser,
      [BlockchainType.BASE]: ethUser,
      [BlockchainType.TEZOS]: tezUser,
    }),
    [ethUser, tezUser]
  )
}
