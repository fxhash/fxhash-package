import { gql } from "@apollo/client"

export const librariesListQuery = gql`
  query Libraries {
    libraries {
      id
      name
      license
      versions {
        filename
        id
        onchfsPointer
        content
      }
      authors
      createdAt
      description
      docUrl
    }
  }
`
