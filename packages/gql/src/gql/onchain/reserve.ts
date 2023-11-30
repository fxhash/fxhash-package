import { graphql } from "@/generated"

export const Qu_GetReserves = graphql(`
  query GetReserves($where: reserve_bool_exp = {}) {
    onchain {
      reserve(where: $where) {
        data
        id
        method
        token_id
        amount
      }
    }
  }
`)
