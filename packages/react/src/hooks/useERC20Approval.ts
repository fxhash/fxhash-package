import { useCallback } from "react"
import { useAccount, useReadContract } from "wagmi"
import { erc20Abi } from "viem"
import { Erc20ApproveEthOperation } from "@fxhash/eth"
import { BlockchainType } from "@fxhash/shared"
import { config } from "@fxhash/config"
import { useContractOperation } from "./useContractOperation"

const REFRESH_INTERVAL = 1000 * 10 // 10 seconds

type UseERC20ApprovalReturn = {
  allowance: bigint | undefined
  approve: (amount: bigint) => Promise<void>
  isCheckingAllowance: boolean
  approvalStatus: ReturnType<typeof useContractOperation>["status"]
  approvalError: unknown
  approveReset: () => void
  allowanceError: unknown
  refetchAllowance: () => Promise<void>
  loading: boolean
}

export function useERC20Approval({
  tokenAddress,
  spenderAddress,
  refreshInterval = REFRESH_INTERVAL,
}: {
  tokenAddress: `0x${string}`
  spenderAddress: `0x${string}`
  refreshInterval?: number
}): UseERC20ApprovalReturn {
  const { address: ethAddress } = useAccount()
  const chainId = Number(config.base.config.chainId.split(":")[1])

  const {
    data: allowance,
    refetch,
    isLoading: isCheckingAllowance,
    error: allowanceError,
  } = useReadContract({
    address: tokenAddress,
    chainId,
    abi: erc20Abi,
    functionName: "allowance",
    args: [ethAddress as `0x${string}`, spenderAddress],
    query: {
      enabled: !!ethAddress,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      refetchInterval: refreshInterval,
    },
  })

  const {
    execute: approveOperation,
    status: approvalStatus,
    error: approvalError,
    reset: approveReset,
    loading: approveLoading,
  } = useContractOperation({
    [BlockchainType.ETHEREUM]: Erc20ApproveEthOperation,
    [BlockchainType.BASE]: Erc20ApproveEthOperation,
    [BlockchainType.TEZOS]: Erc20ApproveEthOperation,
  })

  const refetchAllowance = useCallback(async () => {
    await refetch() // swallow TanStack return type
  }, [refetch])

  const approve = useCallback(
    async (amount: bigint) => {
      await approveOperation(BlockchainType.BASE, {
        tokenAddress,
        spenderAddress,
        amount,
      })
      await refetchAllowance()
    },
    [approveOperation, refetchAllowance, tokenAddress, spenderAddress]
  )

  return {
    allowance,
    approve,
    isCheckingAllowance,
    approvalStatus,
    approvalError,
    approveReset,
    allowanceError,
    refetchAllowance,
    loading: approveLoading || isCheckingAllowance,
  }
}
