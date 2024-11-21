import { useState, useCallback, useRef, useEffect } from "react"
import {
  TContractOperation,
  WalletManager,
  TransactionType,
  TEthereumContractOperation,
  TTezosContractOperation,
  IEquatableError,
  PromiseResult,
  Success,
  Failure,
  invariant,
  BlockchainType,
  BlockchainNetwork,
} from "@fxhash/sdk"
import {
  useEvmWallet,
  useEvmWalletConnected,
  useTezosWallet,
  useTezosWalletConnected,
} from "./useWallets.js"
import { useClient } from "./useClient.js"

/**
 * A value for the state of the transaction
 */
export enum ContractOperationStatus {
  NONE = "NONE",
  CALLING = "CALLING",
  WAITING_CONFIRMATION = "WAITING_CONFIRMATION",
  INJECTED = "INJECTED",
  ERROR = "ERROR",
}

/**
 * An deferrable task is a function that can be executed multiple times and that can be in a pending state.
 */
export type DeferrableTask<
  TData,
  TError extends IEquatableError = never,
  TInput = void,
> = (input: TInput) => PromiseResult<TData, TError>

/**
 * The initial state of a deferred task.
 */
export type DeferredTaskIdle = {
  status: ContractOperationStatus.NONE
  called: false
  loading: false
  data: undefined
  error: undefined
  params: undefined
  txHash: undefined
}

/**
 * The state of a deferred task during the first call.
 */
export type DeferredTaskFirstCall = {
  status:
    | ContractOperationStatus.CALLING
    | ContractOperationStatus.WAITING_CONFIRMATION
  called: true
  loading: true
  data: undefined
  error: undefined
  params: any
  txHash: undefined
}

/**
 * The state of a deferred task during the n-th call
 * with data from the previous successful call.
 */
export type DeferredTaskNthCall<TData> = {
  status:
    | ContractOperationStatus.CALLING
    | ContractOperationStatus.WAITING_CONFIRMATION
  called: true
  loading: true
  data: TData
  error: undefined
  params: any
  txHash: string
}

/**
 * The state of a deferred task after a successful call.
 */
export type DeferredTaskSuccess<TData> = {
  status: ContractOperationStatus.INJECTED
  called: true
  loading: false
  data: TData
  error: undefined
  params: any
  txHash: string
}

/**
 * The state of a deferred task after a failed call.
 */
export type DeferredTaskFailed<TError extends IEquatableError> = {
  status: ContractOperationStatus.ERROR
  called: boolean
  loading: false
  data: undefined
  error: TError
  params: any
  txHash: string | undefined
}

/**
 * The possible statuses of a deferred task.
 */
export type DeferredTaskState<TData, TError extends IEquatableError> =
  | DeferredTaskIdle
  | DeferredTaskFirstCall
  | DeferredTaskNthCall<TData>
  | DeferredTaskSuccess<TData>
  | DeferredTaskFailed<TError>

/**
 * An deferred task React Hook is a tiny wrapper around an asynchronous function
 * that provides a way to determine when the task is running and also provide access
 * the last error that occurred during the execution of the task.
 *
 * It provides a type-safe way to consume the state of the task.
 * ```ts
 * const { called, loading, data, error, execute }: UseDeferredTask<TData, TError, TInput> = useAnyDeferredTask();
 *
 *
 * if (!called) {
 *   // data === undefined
 *   // error === undefined
 *   return <p>Click the button to execute the task</p>;
 * }
 *
 * if (loading) {
 *   // data === undefined on first call
 *   // data === TData from previous successful call
 *   // error === undefined
 *   return <p>Loading...</p>;
 * }
 *
 * if (error) {
 *   // data === undefined
 *   // error === TError
 *   return <p>Something went wrong: {error.message}</p>;
 * }
 *
 * // data === TData
 * return <p>Task completed: {data}</p>;
 * ```
 */

type TBlockchainContractOperation = {
  [K in BlockchainType]: TContractOperation<any, any, any>
}

// Extract the error type from WalletManager.sendTransaction
type ExtractPendingOrRejectedError<T> =
  T extends Success<unknown> ? never : T extends Failure<infer U> ? U : never
type TError = ExtractPendingOrRejectedError<
  Awaited<ReturnType<InstanceType<typeof WalletManager>["sendTransaction"]>>
>

class NoWalletConnectedError extends Error {
  name = "NoWalletConnectedError"
  message = "Wallet needs to be synced to run operations"
}

export function useContractOperation<
  TBlockchain extends BlockchainType,
  TOperations extends TBlockchainContractOperation,
  TData = {
    hash: string
    // TODO: fix this any
    operation: any
  },
  TInput = TOperations[TBlockchain] extends TTezosContractOperation<infer P>
    ? P
    : TOperations[TBlockchain] extends TEthereumContractOperation<infer P>
      ? P
      : never,
>(
  operations: TOperations
): DeferredTaskState<TData, TError> & {
  // We respecify the type of the execute function to make it work with the generic blockchainType
  // the result of the await execute(blockchainType, params) will be typed
  // however the result of data returned by the hook will be loosely typed
  // This is the best solution we found to have the type corresponding to the blockchainType call
  execute: <TBlockchain extends BlockchainType>(
    blockchainType: TBlockchain,
    params: TOperations[TBlockchain] extends TContractOperation<
      any,
      infer P,
      any
    >
      ? P
      : never
  ) => PromiseResult<
    Awaited<ReturnType<InstanceType<TOperations[TBlockchain]>["call"]>>,
    TError
  >
  rawExecute: <TBlockchain extends BlockchainType>(
    blockchainType: TBlockchain,
    params: TOperations[TBlockchain] extends TContractOperation<
      any,
      infer P,
      any
    >
      ? P
      : never
  ) => PromiseResult<
    Awaited<ReturnType<InstanceType<TOperations[TBlockchain]>["call"]>>,
    TError
  >
} {
  const tezosWalletManager = useTezosWallet()
  const ethereumWalletManager = useEvmWallet()
  const isTezosConnected = useTezosWalletConnected()
  const isEthereumConnected = useEvmWalletConnected()
  const { client } = useClient()

  const [state, setState] = useState<DeferredTaskState<TData, TError>>({
    status: ContractOperationStatus.NONE,
    called: false,
    loading: false,
    data: undefined,
    error: undefined,
    params: undefined,
    txHash: undefined,
  })

  const tezosWalletManagerRef = useRef(tezosWalletManager)
  const ethereumWalletManagerRef = useRef(ethereumWalletManager)

  useEffect(() => {
    tezosWalletManagerRef.current = tezosWalletManager
    ethereumWalletManagerRef.current = ethereumWalletManager
  }, [tezosWalletManager, ethereumWalletManager])

  const execute = useCallback(
    async <TBlockchain extends BlockchainType>(
      blockchainType: TBlockchain,
      params: TInput
    ) => {
      const connected = {
        [BlockchainType.BASE]: isEthereumConnected,
        [BlockchainType.ETHEREUM]: isEthereumConnected,
        [BlockchainType.TEZOS]: isTezosConnected,
      }

      // if there's no user synced, we request a sync
      if (!connected[blockchainType]) {
        try {
          await client?.connectWalletAsync(
            blockchainType === BlockchainType.TEZOS
              ? BlockchainNetwork.TEZOS
              : BlockchainNetwork.ETHEREUM
          )
        } catch (err) {
          setState({
            status: ContractOperationStatus.ERROR,
            called: false,
            loading: false,
            data: undefined,
            error: new NoWalletConnectedError() as TError,
            params,
            txHash: undefined,
          })
          return
        }
      }

      setState(({ data, txHash }): DeferredTaskState<TData, TError> => {
        if (data !== undefined) {
          return {
            status: ContractOperationStatus.CALLING,
            called: true,
            loading: true,
            data: data,
            error: undefined,
            params,
            txHash: txHash!,
          }
        }
        return {
          status: ContractOperationStatus.CALLING,
          called: true,
          loading: true,
          data: undefined,
          error: undefined,
          params,
          txHash: undefined,
        }
      })

      let walletManager = {
        [BlockchainType.BASE]: ethereumWalletManagerRef.current,
        [BlockchainType.ETHEREUM]: ethereumWalletManagerRef.current,
        [BlockchainType.TEZOS]: tezosWalletManagerRef.current,
      }[blockchainType]

      try {
        invariant(!!walletManager, "Wallet manager must be defined")

        const sendTransactionResult = await walletManager.sendTransaction(
          operations[blockchainType],
          params,
          blockchainType
        )

        if (sendTransactionResult.isFailure()) {
          setState({
            status: ContractOperationStatus.ERROR,
            called: true,
            loading: false,
            data: undefined,
            error: sendTransactionResult.error,
            params,
            txHash: undefined,
          })
          return sendTransactionResult
        }

        let confirmationResult: Awaited<
          ReturnType<typeof walletManager.waitForTransaction>
        > | null = null

        // Off chain transactions can't be waited for
        // It will only happen in Ethereum
        if (sendTransactionResult.value.type === TransactionType.ONCHAIN) {
          setState({
            status: ContractOperationStatus.WAITING_CONFIRMATION,
            called: true,
            loading: true,
            data: undefined,
            error: undefined,
            params,
            txHash: undefined,
          })
          confirmationResult = await walletManager.waitForTransaction({
            hash: sendTransactionResult.value.hash,
          })
          if (confirmationResult.isFailure()) {
            setState({
              status: ContractOperationStatus.ERROR,
              called: true,
              loading: false,
              data: undefined,
              error: confirmationResult.error as TError,
              params,
              txHash: sendTransactionResult.value.hash,
            })
            return confirmationResult
          }
        }

        setState({
          status: ContractOperationStatus.INJECTED,
          called: true,
          loading: false,
          data: {
            ...sendTransactionResult.value,
            operation: confirmationResult?.value,
          } as TData,
          error: undefined,
          params,
          txHash: sendTransactionResult.value.hash,
        })
        return sendTransactionResult
      } finally {
        setState(({ data, error, txHash }) => {
          if (data !== undefined) {
            return {
              status: ContractOperationStatus.INJECTED,
              called: true,
              data,
              error: undefined,
              loading: false,
              params,
              txHash: txHash!,
            }
          }
          if (error) {
            return {
              status: ContractOperationStatus.ERROR,
              called: true,
              data: undefined,
              error,
              loading: false,
              params,
              txHash,
            }
          }
          return {
            status: ContractOperationStatus.NONE,
            called: false,
            data: undefined,
            error: undefined,
            loading: false,
            params: undefined,
            txHash: undefined,
          }
        })
      }
    },
    [operations, tezosWalletManager, ethereumWalletManager]
  )

  /**
   * Make a raw call using the underlying operation, without altering the
   * internal React state of the useContractOperation hook. Can be usefull if
   * some operation requires a finer control on how it's being processed.
   * @param params The params to send to the Contract Operation abstraction
   * @returns A promise which resolved with the data from the call or rejects
   * if the call fails
   */
  const rawExecute = useCallback(
    async <TBlockchain extends BlockchainType>(
      blockchainType: TBlockchain,
      params: TInput
    ) => {
      let walletManager = {
        [BlockchainType.BASE]: ethereumWalletManager,
        [BlockchainType.ETHEREUM]: ethereumWalletManager,
        [BlockchainType.TEZOS]: tezosWalletManager,
      }[blockchainType]
      if (!walletManager) return

      const sendTransactionResult = await walletManager.sendTransaction(
        operations[blockchainType],
        params,
        blockchainType
      )
      if (sendTransactionResult.isFailure()) {
        throw sendTransactionResult.error
      }

      // It will only happen in Ethereum
      if (sendTransactionResult.value.type === TransactionType.ONCHAIN) {
        const confirmationResult = await walletManager.waitForTransaction({
          hash: sendTransactionResult.value.hash,
        })
        if (confirmationResult.isFailure()) {
          return confirmationResult
        }
      }

      return sendTransactionResult
    },
    [tezosWalletManager, ethereumWalletManager]
  )

  return {
    ...state,
    execute: execute as any,
    rawExecute: rawExecute as any,
  }
}
