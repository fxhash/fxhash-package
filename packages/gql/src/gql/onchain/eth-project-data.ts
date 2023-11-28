import { graphql } from "@/generated"

/**
 * ETH Project data
 * @dev mostly used for fetching the primary and secondary receivers
 * stored on chain
 */
export const Qu_GetEthProjectData = graphql(`
  query GetEthProjectData($where: eth_project_data_bool_exp = {}) {
    onchain {
      eth_project_data(where: $where) {
        id
        primary_receiver
        secondary_receiver
      }
    }
  }
`)
