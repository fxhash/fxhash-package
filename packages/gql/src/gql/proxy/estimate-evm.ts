import { graphql } from "@/generated"

export const Qu_EstimateEvmTransaction = graphql(`
  query EstimateEvmTransaction($input: EstimateEvmTransactionInput!) {
    estimate_evm_transaction(input: $input) {
      error
      changes {
        amount
        assetType
        changeType
        contractAddress
        decimals
        from
        name
        rawAmount
        symbol
        to
        tokenId
      }
      gasUsed
    }
  }
`)
