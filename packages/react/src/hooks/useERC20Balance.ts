import { useAccount, useReadContract } from "wagmi"
import { erc20Abi } from "viem"
import { config } from "@fxhash/config"

const REFRESH_INTERVAL = 1000 * 10 // 10 seconds

export function useERC20Balance({
  account,
  tokenAddress,
  refreshInterval = REFRESH_INTERVAL,
}: {
  account?: `0x${string}`
  tokenAddress: `0x${string}`
  refreshInterval?: number
}) {
  const { address } = useAccount()
  const ethAddress = address
  const chainId = Number(config.base.config.chainId.split(":")[1])

  const data = useReadContract({
    chainId,
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account ? account : (ethAddress as `0x${string}`)],
    query: {
      enabled: !!ethAddress || !!account,
      // disable auto refetching
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Infinity,
      refetchInterval: refreshInterval,
    },
  })

  return data
}
