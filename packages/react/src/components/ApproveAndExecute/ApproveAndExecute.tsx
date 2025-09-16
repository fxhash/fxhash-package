"use client"

import { getCurrentChain } from "@fxhash/eth"
import { type BlockchainType } from "@fxhash/shared"
import { useEffect, useRef } from "react"
import { useERC20Approval } from "@/hooks/useERC20Approval"
import {
  IndexedContractOperationStatus,
  type UseIndexedContractOperationProps,
  useIndexedContractOperation,
} from "@/hooks/useIndexedContractOperation"
import { useWalletPreferenceStore } from "./store"
import { Button, cn, Text } from "@fxhash/ui"
import {
  ContractOperationStatus,
  type ContractOperationSuccess,
} from "@/hooks/useContractOperation"
import { useCapabilities, useConnect } from "wagmi"
import { useEvmWalletManager } from "@/hooks/useEvmWallet"
import { toast } from "sonner"
import { Chain } from "viem"

interface UseTransactionWithApprovalProps<TInput>
  extends UseIndexedContractOperationProps<TInput> {
  tokenAddress: `0x${string}`
  spenderAddress: `0x${string}`
  getExecuteParams: () => TInput
  chain: BlockchainType
  disabled?: boolean
  requiredAmount: bigint
  executeCopy?: React.ReactNode
  canExecute?: boolean
  className?: string
  onIndexed?: (data: ContractOperationSuccess) => void
  error?: string
  onExecute?: () => void
}

const supportsBatchedTransactions = (capabilities: any, chain: Chain) => {
  return ["supported", "ready"].includes(
    (capabilities as Record<string, any>)?.[chain.id]?.atomic?.status
  )
}

export function ApproveAndExecute<TInput>({
  chain,
  operation,
  tokenAddress,
  spenderAddress,
  getExecuteParams,
  disabled = false,
  requiredAmount,
  executeCopy = "execute",
  canExecute = true,
  className,
  onIndexed,
  onExecute,
  error: propsError,
}: UseTransactionWithApprovalProps<TInput>) {
  const evmWalletManager = useEvmWalletManager()
  const { connect, connectors } = useConnect()
  const { useSmartAccount, setUseSmartAccount } = useWalletPreferenceStore()

  const { allowance, loading, refetchAllowance } = useERC20Approval({
    tokenAddress,
    spenderAddress,
  })

  const { status, execute, reset, data, error } = useIndexedContractOperation({
    operation,
  })

  const hasIndexed = useRef(false)
  useEffect(() => {
    if (status === ContractOperationStatus.ERROR) {
      toast.error("Transaction failed", {
        description: error?.message,
      })
    }
    if (
      data &&
      status === IndexedContractOperationStatus.INDEXED &&
      !hasIndexed.current
    ) {
      onIndexed?.(data)
      refetchAllowance()
      hasIndexed.current = true
    }
  }, [status, error, data, onIndexed, refetchAllowance])

  const result = useCapabilities({
    account: evmWalletManager?.address as `0x${string}`,
    query: {
      enabled: !!evmWalletManager?.address,
      // disable auto refetching
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
    },
  })
  const walletSupportsBatching = supportsBatchedTransactions(
    result.data,
    getCurrentChain(chain)
  )

  // Whether batching is actually enabled (capability + user preference)
  const batchingEnabled = walletSupportsBatching && useSmartAccount

  const requiresApproval = allowance !== undefined && allowance < requiredAmount

  const handleExecute = async (batchingEnabled: boolean) => {
    onExecute?.()
    hasIndexed.current = false
    reset()

    // makes no sense but apparently this line is needed for coinbase wallet
    await evmWalletManager?.prepareSigner({ blockchainType: chain })

    try {
      const params = getExecuteParams()
      await execute(chain, {
        ...params,
        approval: requiresApproval
          ? {
              tokenAddress,
              spenderAddress,
              amount: requiredAmount,
              useSmartAccount: batchingEnabled,
            }
          : undefined,
      })
    } catch (error: any) {
      if (error.message?.includes("User rejected account upgrade")) {
        // update the smart account preference
        setUseSmartAccount(false)
        // try again with use smart account disabled
        handleExecute(false)
        return
      }
      console.error(error)
      toast.error("Failed to submit transaction", {
        description: error.message,
      })
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {!evmWalletManager ? (
        <Button onClick={() => connect({ connector: connectors[0] })}>
          {executeCopy}
        </Button>
      ) : null}
      {evmWalletManager ? (
        <Button
          className="w-full"
          disabled={disabled || !canExecute}
          loading={
            loading ||
            [
              ContractOperationStatus.CALLING,
              ContractOperationStatus.WAITING_CONFIRMATION,
              IndexedContractOperationStatus.CALLING,
              IndexedContractOperationStatus.WAITING_CONFIRMATION,
            ].includes(status)
          }
          onClick={() => handleExecute(batchingEnabled)}
        >
          {executeCopy}
        </Button>
      ) : null}
      {propsError ? (
        <div className="flex w-full flex-col gap-2 rounded-xs bg-red-100 p-2 text-center">
          <Text as="p" color="red">
            {propsError}
          </Text>
        </div>
      ) : null}
    </div>
  )
}
