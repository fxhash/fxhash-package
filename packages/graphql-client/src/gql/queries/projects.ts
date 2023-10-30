import { graphql } from "@/generated"

export const Qu_getProjects = graphql(`
  query GetProjects($where: Project_bool_exp = {}) {
    Project(where: $where) {
      id
      pricing
      description
      state
      storage
    }
  }
`)

export const Qu_getWallets = graphql(`
  query GetWallets($where1: Wallet_bool_exp = {}) {
    Wallet(where: $where1) {
      address
      network
    }
  }
`)
