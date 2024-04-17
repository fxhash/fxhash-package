import { graphql } from "@/generated"

/**
 * ETH User proceeds
 */
export const Qu_GetFrameData = graphql(`
  query GetFrameData($id: String = "") {
    onchain {
      eth_frame_data_by_pk(id: $id) {
        id
        frame_minter_data
      }
    }
  }
`)
