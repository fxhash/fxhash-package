// https://wagmi.sh/react/ethers-adapters#wallet-client--signer
import { useMemo } from "react"
import { useClient, Config, useConnectorClient } from "wagmi"
import { clientToProvider, clientToSigner } from "@fxhash/eth"

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const client = useClient<Config>({ chainId })
  return useMemo(
    () => (client ? clientToProvider(client) : undefined),
    [client]
  )
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}
