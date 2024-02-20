import { EthereumContractOperation } from "./contractOperation"
import { encodeFunctionData, TransactionReceipt } from "viem"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { config } from "@fxhash/config"
import { MULTICALL3_ABI } from "@/abi/Multicall3"
import { DUTCH_AUCTION_MINTER_ABI } from "@/abi"
import { TransactionType } from "@fxhash/contracts-shared"
import { getConfigForChain, getCurrentChain } from "../Wallet"

export type TRefundAllEthOperationParams = {
  token: string
  minter: string
  reserveIds: number[]
}

/**
 * Refund all ETH from the dutch auction minter contract across all reserves
 * for a given token and minter. Makes a multicall.
 */
export class RefundAllEthOperation extends EthereumContractOperation<TRefundAllEthOperationParams> {
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const multicallArgs = this.params.reserveIds.map(reserveId => ({
      address: currentConfig.contracts.dutch_auction_minter_v1,
      data: encodeFunctionData({
        abi: DUTCH_AUCTION_MINTER_ABI,
        functionName: "refund",
        args: [this.params.token, reserveId, this.params.minter],
      }),
    }))

    const callRequests = multicallArgs.map(call => ({
      target: call.address,
      callData: call.data,
    }))

    const args: SimulateAndExecuteContractRequest = {
      address: config.eth.contracts.multicall3,
      abi: MULTICALL3_ABI,
      functionName: "aggregate",
      args: [callRequests],
      account: this.manager.address as `0x${string}`,
      chain: getCurrentChain(this.chain),
    }

    const transactionHash = await simulateAndExecuteContract(this.manager, args)
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `Successfully refunded excess dutch auction payments for token ${this.params.token}`
  }
}
