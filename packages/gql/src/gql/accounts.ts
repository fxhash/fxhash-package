import { graphql } from "@/generated"

/**
 * Exposes the most basic details for general purposes.
 */
export const Frag_AccountBaseDetails = graphql(`
  fragment Account_BaseDetails on Account {
    id
    username
    status
    profile {
      picture
      description
    }
    wallets {
      ...Wallet_BaseDetails
    }
  }
`)

/**
 * Generic-purpose query for getting accounts with arbitrary filters, returning
 * the base details of such accounts.
 */
export const Qu_GetAccounts = graphql(`
  query GetAccounts($where: Account_bool_exp = {}) {
    offchain {
      Account(where: $where) {
        ...Account_BaseDetails
      }
    }
  }
`)
