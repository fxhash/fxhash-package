import {
  BlockchainNetwork,
  GetSingleUserAccountResult,
  invariant,
  Wallet,
} from "@fxhash/sdk"
import { useClient } from "./useClient.js"
import { useMemo } from "react"

export type UseAccount = {
  account: GetSingleUserAccountResult | null
  authenticated: boolean
}

/**
 * Returns the account currenly authenticated by the configured user source.
 */
export function useAccount(): UseAccount {
  const client = useClient()
  return { account: client.account, authenticated: !!client.account }
}

/**
 * Returns the wallets in context of the current account, aswell as the account
 * itself. If the account has less than 2 wallets, it will return the network
 * of the wallet that is not connected. If the account is not available,
 * it will return null.
 */
export function useAccountWallets(): {
  account: GetSingleUserAccountResult
  wallets: Wallet[]
  primaryWallet: Wallet
  unlinkedNetwork: BlockchainNetwork | null
} | null {
  const { account } = useAccount()
  const wallets = account?.wallets as Wallet[]
  const unlinkedNetwork: BlockchainNetwork | null = useMemo(() => {
    if (!wallets) return null
    return wallets?.length < 2
      ? [BlockchainNetwork.TEZOS, BlockchainNetwork.ETHEREUM].filter(
          chain => wallets.findIndex(w => w.network !== chain) > -1
        )[0]
      : null
  }, [wallets])
  if (!account) return null
  const primaryWallet = wallets.find(
    w => w.address === account.mainWallet.address
  )
  invariant(primaryWallet, "No primary wallet found in account")
  return {
    account,
    wallets,
    primaryWallet,
    unlinkedNetwork,
  }
}
