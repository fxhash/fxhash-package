import { gql } from "@/__generated__"
import { useApolloClient } from "@apollo/client"
import type { TEthereumContractOperation } from "@fxhash/eth"
import { BlockchainType } from "@fxhash/shared"
import { failure, success, type PromiseResult } from "@fxhash/utils"
import { useCallback, useState } from "react"
import { useIsMounted } from "./useIsMounted"
import {
  ContractOperationStatus,
  ContractOperationSuccess,
  useContractOperation,
} from "./useContractOperation"

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const IndexedTransactionQuery = gql(/* GraphQL */ `
  query IndexedTransactionQuery($txId: String!) {
    onchain {
      action(where: { op_hash: { _eq: $txId } }) {
        id
      }
    }
  }
`)

export enum IndexedContractOperationStatus {
  NONE = "NONE",
  CALLING = "CALLING",
  WAITING_CONFIRMATION = "WAITING_CONFIRMATION",
  INDEXING = "INDEXING",
  INDEXED = "INDEXED",
  ERROR = "ERROR",
}

export interface UseIndexedContractOperationProps<TInput> {
  operation: TEthereumContractOperation<TInput>
  pollingInterval?: number
  indexingTimeout?: number
}

interface UseIndexedContractOperationReturn<TInput> {
  status: IndexedContractOperationStatus | ContractOperationStatus
  loading: boolean
  execute: <TBlockchain extends BlockchainType>(
    blockchainType: TBlockchain,
    params: TInput
  ) => PromiseResult<
    Awaited<
      ReturnType<InstanceType<TEthereumContractOperation<TInput>>["call"]>
    >,
    any
  >
  data: ContractOperationSuccess | undefined
  error: Error | undefined
  reset: () => void
}

export const useIndexedContractOperation = <TInput>({
  operation,
  pollingInterval = 1000,
  indexingTimeout = 60000,
}: UseIndexedContractOperationProps<TInput>): UseIndexedContractOperationReturn<TInput> => {
  const isMounted = useIsMounted()
  const [state, setState] = useState({
    status: IndexedContractOperationStatus.NONE,
    loading: false,
  })

  const apolloClient = useApolloClient()
  const { status, execute, data, loading, error, reset } = useContractOperation(
    {
      [BlockchainType.ETHEREUM]: operation,
      [BlockchainType.BASE]: operation,
      [BlockchainType.TEZOS]: operation,
    }
  )

  const pollTransactionStatus = useCallback(
    async (txId: string) => {
      const startedAt = Date.now()
      while (Date.now() - startedAt < indexingTimeout) {
        if (!isMounted()) return failure(Error("unmounted"))

        const data = await apolloClient.query({
          query: IndexedTransactionQuery,
          variables: {
            txId,
          },
          fetchPolicy: "network-only",
        })

        const actionId = data.data.onchain?.action[0]?.id
        if (actionId) {
          return success(txId)
        }

        await delay(pollingInterval)
      }

      return failure(Error(`Timeout waiting for transaction ${txId}`))
    },
    [apolloClient, indexingTimeout, pollingInterval]
  )

  const executeIndexed = useCallback(
    async <TBlockchain extends BlockchainType>(
      blockchainType: TBlockchain,
      params: TInput
    ) => {
      const result = await execute(blockchainType, params as any)
      if (result.isFailure()) {
        return result
      }

      if (!isMounted()) return result
      setState({
        status: IndexedContractOperationStatus.INDEXING,
        loading: true,
      })

      const pollResult = await pollTransactionStatus(result.value.hash)
      if (pollResult.isFailure()) {
        return result
      }

      // Refetch the active queries on the page (mounted components)
      // Don't refetch some queries which are not needed but active all the time like the
      // indexer status query
      await apolloClient.refetchQueries({
        include: "active",
        onQueryUpdated(observableQuery) {
          const noUpdateQueries = [
            "IndexedTransactionQuery",
            "IndexerStatusQuery",
          ]
          if (
            observableQuery.queryName &&
            noUpdateQueries.includes(observableQuery.queryName)
          ) {
            return false
          }
          return true
        },
      })

      if (!isMounted()) return result
      setState({
        status: IndexedContractOperationStatus.INDEXED,
        loading: false,
      })

      return result
    },
    [execute, apolloClient, pollTransactionStatus, isMounted]
  )

  const resetIndexed = useCallback(() => {
    reset()
    setState({
      status: IndexedContractOperationStatus.NONE,
      loading: false,
    })
  }, [reset])

  return {
    status: status !== ContractOperationStatus.INJECTED ? status : state.status,
    loading: loading,
    execute: executeIndexed,
    data,
    error,
    reset: resetIndexed,
  }
}
