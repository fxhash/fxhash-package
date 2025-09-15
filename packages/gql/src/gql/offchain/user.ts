import { graphql } from "@/generated"

export const Frag_UserBaseDetails = graphql(`
  fragment User_BaseDetails on user {
    id
    name
  }
`)
