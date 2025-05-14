import { graphql } from "@/generated"

export const Qu_GetLibraries = graphql(`
  query GetLibraries {
    offchain {
      Library {
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
  }
`)
