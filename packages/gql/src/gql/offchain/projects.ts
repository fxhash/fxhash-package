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
    tokenId
    releaseAt
    blockchain
    storage
    pricing
    curator {
      id
      status
      username
      wallets {
        ...Wallet_BaseDetails
      }
    }
    author {
      ...Account_BaseDetails
    }
    collaborators {
      account {
        ...Account_BaseDetails
      }
    }
    collaborators {
      account {
        ...Account_BaseDetails
      }
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
    offchain {
      Project {
        ...Project_BaseDetails
      }
    }
  }
`)

export const Qu_getAllProjectsAfterDate = graphql(`
  query GetAllProjectsAfterDate($afterDate: timestamptz!) {
    offchain {
      Project(where: { releaseAt: { _gte: $afterDate } }) {
        ...Project_BaseDetails
      }
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
    offchain {
      Project(where: { authorId: { _eq: $authorId } }) {
        ...Project_BaseDetails
        ...Project_UserSecrets
      }
    }
  }
`)

/**
 * Create a project.
 * **Note**: User must be authenticated, and will be set as the Author.
 */
export const Mu_createProject = graphql(`
  mutation CreateProject($object: Project_insert_input!) {
    offchain {
      insert_Project_one(object: $object) {
        projectMedias {
          index
          media {
            id
            name
          }
        }
        id
        description
        author {
          id
        }
        title
        state
        releaseAt
      }
    }
  }
`)

/**
 * Update a project, using a 3-step operation:
 *  - delete all the medias associated with a given project
 *  - update the project data
 *  - add the project medias entries
 * The user must be authenticated and the author of the project for the query to
 * work.
 */
export const Mu_updateProject = graphql(`
  mutation Update_Project(
    $projectId: uuid!
    $projectData: Project_set_input
    $projectMedias: [ProjectMedia_insert_input!]!
    $projectCollaborators: [ProjectCollaborator_insert_input!]!
  ) {
    offchain {
      delete_ProjectMedia(where: { projectId: { _eq: $projectId } }) {
        affected_rows
      }
      delete_ProjectCollaborator(where: { projectId: { _eq: $projectId } }) {
        affected_rows
      }
      update_Project(where: { id: { _eq: $projectId } }, _set: $projectData) {
        affected_rows
      }
      insert_ProjectMedia(objects: $projectMedias) {
        affected_rows
      }
      insert_ProjectCollaborator(objects: $projectCollaborators) {
        affected_rows
      }
    }
  }
`)
