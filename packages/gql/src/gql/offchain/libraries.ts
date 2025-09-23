import { graphql } from "@/generated"

export const Qu_GetLibraries = graphql(`
  query Get_Libraries {
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
