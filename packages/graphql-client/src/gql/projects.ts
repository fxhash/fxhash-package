import { graphql } from "@/generated"

/**
 * Project base details, should be included in any query which requires to fetch
 * project data as considered idiomatic to describe a project.
 */
export const Frag_ProjectBaseDetails = graphql(`
  fragment Project_BaseDetails on Project {
    id
    title
    description
    releaseAt
    blockchain
    storage
    pricing
    curator {
      id
      status
      username
    }
    author {
      id
      status
      username
    }
    projectMedias {
      index
      media {
        id
        url
      }
    }
  }
`)

/**
 * The data which is only accessible by users on their projects.
 */
export const Frag_ProjectUserSecrets = graphql(`
  fragment Project_UserSecrets on Project {
    state
  }
`)

/**
 * Get all the projects with their base details, without any kind of filtering.
 */
export const Qu_getAllProjects = graphql(`
  query GetAllProjects {
    Project {
      ...Project_BaseDetails
    }
  }
`)

/**
 * A user to get their submissions.
 * **Note**: This requires the user asking for their submissions to be
 * authenticated, because it requests secrets fields only available to them.
 */
export const Qu_getUserSubmissions = graphql(`
  query GetUserSubmissions($authorId: uuid!) {
    Project(where: { authorId: { _eq: $authorId } }) {
      ...Project_BaseDetails
      ...Project_UserSecrets
    }
  }
`)
