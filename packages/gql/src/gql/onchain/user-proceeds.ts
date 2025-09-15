import { graphql } from "@/generated"

/**
 * ETH User proceeds
 */
export const Qu_GetEthUserProceeds = graphql(`
  query GetEthUserProceeds($where: eth_user_proceeds_bool_exp = {}) {
    onchain {
      eth_user_proceeds(where: $where) {
        id
        total_proceeds
      }
    }
  }
`)
