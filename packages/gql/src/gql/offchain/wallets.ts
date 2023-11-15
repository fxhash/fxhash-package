import { graphql } from "@/generated"

/**
 * Base details of a wallet
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
