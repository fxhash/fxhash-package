import { graphql } from ".."

export const Mu_CreateWhitelist = graphql(`
  mutation CreateWhitelist($whitelist: jsonb!) {
    set_whitelist(whitelist: $whitelist) {
      merkleRoot
      message
      success
    }
  }
`)
