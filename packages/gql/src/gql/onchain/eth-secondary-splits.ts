import { graphql } from "@/generated"

/**
 * ETH Primary splits
 */
export const Qu_GetEthSecondarySplits = graphql(`
  query GetEthSecondarySplits($where: eth_secondary_splits_bool_exp = {}) {
    onchain {
      __typename
      eth_secondary_splits {
        id
        receiver
        receivers
        allocations
        basis_points
        chain
      }
    }
  }
`)
