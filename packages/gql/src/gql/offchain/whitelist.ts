import { graphql } from "@/generated"

export const Frag_WhitelistEntries = graphql(`
  fragment WhitelistEntries on Whitelist {
    entries {
      walletAddress
      whitelistIndex
    }
  }
`)

export const Qu_GetWhitelists = graphql(`
  query GetWhitelists($where: Whitelist_bool_exp = {}) {
    offchain {
      Whitelist(where: $where) {
        merkleRoot
        ...WhitelistEntries
      }
    }
  }
`)

export const Qu_GetWhitelist = graphql(`
  query GetWhitelist($merkleRoot: String = "") {
    offchain {
      Whitelist_by_pk(merkleRoot: $merkleRoot) {
        merkleRoot
        ...WhitelistEntries
      }
    }
  }
`)
