import { graphql } from "@/generated"

/**
 * ETH Primary splits
 */
export const Qu_GetEthPrimarySplits = graphql(`
  query GetEthPrimarySplits($where: eth_primary_splits_bool_exp = {}) {
    onchain {
      __typename
      eth_primary_splits {
        id
        receiver
        receivers
        allocations
        chain
      }
    }
  }
`)
