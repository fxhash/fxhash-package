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

export const Mu_LinkWalletToAccount = graphql(`
  mutation LinkWalletToAccount($input: LinkWalletInput!) {
    link_wallet_to_account(input: $input)
  }
`)

export const Mu_UnlinkWalletFromAccount = graphql(`
  mutation UnlinkWalletFromAccount($input: UnlinkWalletInput) {
    unlink_wallet_from_account(input: $input)
  }
`)
