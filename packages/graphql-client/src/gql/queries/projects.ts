import { gql } from "graphql-tag"

export const Qu_getProjects = gql`
  query GetProjects($where: Project_bool_exp = {}) {
    Project(where: $where) {
      id
      pricing
      description
      state
      storage
    }
  }
`
