import { graphql } from "@/generated"

/**
 * Exposes the most basic details for general purposes.
 */
export const Frag_AccountBaseDetails = graphql(`
  fragment Account_BaseDetails on Account {
    id
    username
    profile {
      picture
    }
  }
`)

export const Frag_AccountWallets = graphql(`
  fragment Account_Wallets on Account {
    wallets {
      ...Wallet_BaseDetails
    }
    mainWallet {
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

/**
 * Generic-purpose query for getting accounts with arbitrary filters, returning
 * the base details of such accounts.
 */
export const Qu_GetAccountsBaseDetails = graphql(`
  query GetAccounts($where: Account_bool_exp = {}) {
    offchain {
      Account(where: $where) {
        ...Account_BaseDetails
      }
    }
  }
`)

/**
 * Queries the account base details & their wallets, with artbitrary account
 * filters.
 */
export const Qu_GetAccountWallets = graphql(`
  query GetAccountWallets($where: Account_bool_exp = {}) {
    offchain {
      Account(where: $where) {
        ...Account_BaseDetails
        ...Account_Wallets
      }
    }
  }
`)
