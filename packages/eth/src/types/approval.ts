export interface ApprovalParams {
  approval?: {
    tokenAddress: `0x${string}`
    spenderAddress: `0x${string}`
    amount: bigint
    useSmartAccount: boolean
  }
}
