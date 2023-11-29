import { graphql } from "@/generated"

/**
 * ETH Minter proceeds
 */
export const Qu_GetEthMinterProceeds = graphql(`
  query GetEthMinterProceeds($where: eth_minter_proceeds_bool_exp = {}) {
    onchain {
      eth_minter_proceeds(where: $where) {
        id
        minter_address
        primary_receiver
        reserve_id
        token_address
        user_address
        amount
      }
    }
  }
`)
