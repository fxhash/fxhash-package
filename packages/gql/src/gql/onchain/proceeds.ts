import { graphql } from "@/generated"

/**
 * ETH Minter proceeds
 */
export const Qu_GetEthProceeds = graphql(`
  query GetProceeds($where: eth_token_proceeds_bool_exp = {}) {
    onchain {
      eth_token_proceeds(where: $where) {
        dutch_auction_proceeds
        fixed_price_proceeds
        total_proceeds
      }
    }
  }
`)
