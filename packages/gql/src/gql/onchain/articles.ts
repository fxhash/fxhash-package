import { graphql } from "@/generated"

export const Frag_Article_BaseDetails = graphql(`
  fragment Article_BaseDetails on article {
    id
    created_at
    slug
    title
    description
    user {
      ...User_BaseDetails
    }
    thumbnail_uri
    thumbnail_caption
    media_image {
      id
      width
      height
      placeholder
    }
    display_uri
  }
`)

export const Frag_ArticleFullDetails = graphql(`
  fragment Article_FullDetails on article {
    ...Article_BaseDetails
    body
    tags
    language
    editions
    royalties
    metadata_uri
    metadata
    flag
    moderation_reason {
      id
      reason
    }
    splits {
      pct
      user {
        ...User_BaseDetails
      }
    }
    article_revisions {
      iteration
      metadata_uri
      created_at
      op_hash
    }
  }
`)

export const Qu_GetFullArticleById = graphql(`
  query GetFullArticleById($id: Int!) {
    onchain {
      article_by_pk(id: $id) {
        ...Article_FullDetails
      }
    }
  }
`)

export const Qu_GetFullArticleBySlug = graphql(`
  query GetFullArticleBySlug($slug: String!) {
    onchain {
      article(where: { slug: { _eq: $slug } }) {
        ...Article_FullDetails
      }
    }
  }
`)
