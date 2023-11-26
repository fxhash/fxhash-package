import { graphql } from "@/generated"

/**
 * Exposes the most basic details for general purposes.
 */
export const Frag_WalletBaseDetails = graphql(`
  fragment Wallet_BaseDetails on Wallet {
    address
    network
    accountId
    walletUser {
      flag
    }
  }
`)
