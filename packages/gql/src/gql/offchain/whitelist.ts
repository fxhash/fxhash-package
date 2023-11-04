import { graphql } from "@/generated"

export const Qu_GetWhitelists = graphql(`
  query GetWhitelists($where: Whitelist_bool_exp = {}) {
    offchain {
      Whitelist(where: $where) {
        merkleRoot
        entries {
          walletAddress
          whitelistIndex
        }
      }
    }
  }
`)
