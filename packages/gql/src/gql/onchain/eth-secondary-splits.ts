import { graphql } from "@/generated"

/**
 * ETH Primary splits
 */
export const Qu_GetEthSecondarySplits = graphql(`
  query GetEthSecondarySplits($id: String!) {
    onchain {
      eth_secondary_splits_by_pk(id: $id) {
        allocations
        basis_points
        chain
        id
        receiver
        receivers
      }
    }
  }
`)
