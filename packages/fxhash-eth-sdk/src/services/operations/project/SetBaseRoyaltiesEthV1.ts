import { EthereumContractOperation } from "../contractOperation"
import { encodeFunctionData, getAddress } from "viem"
import {
  prepareReceivers,
  ReceiverEntry,
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { proposeSafeTransaction } from "@/services/Safe"
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"
import { TransactionType } from "@fxhash/contracts-shared"

export type TSetBaseRoyaltiesEthV1OperationParams = {
  token: string
  receivers: ReceiverEntry[]
  basisPoints: bigint
  collabAddress?: string
}

/**
 * Set royalties split for token
 */
export class SetBaseRoyaltiesEthV1Operation extends EthereumContractOperation<TSetBaseRoyaltiesEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    if (this.params.basisPoints > 2500) {
      throw Error("Royalties should be lower or equal to 25%")
    }

    const preparedPrimaryReceivers = prepareReceivers(
      this.params.receivers,
      "secondary"
    )
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const safeTransactionData: MetaTransactionData = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: FX_GEN_ART_721_ABI,
          functionName: "setBaseRoyalties",
          args: [
            preparedPrimaryReceivers.map(r => r.address),
            preparedPrimaryReceivers.map(r => r.pct),
            this.params.basisPoints,
          ],
        }),
        value: "0",
      }
      const transactionHash = await proposeSafeTransaction(
        [safeTransactionData],
        this.manager
      )
      return {
        type: TransactionType.OFFCHAIN,
        hash: transactionHash,
      }
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: getAddress(this.params.token) as `0x${string}`,
        abi: FX_GEN_ART_721_ABI,
        functionName: "setBaseRoyalties",
        args: [
          preparedPrimaryReceivers.map(r => r.address),
          preparedPrimaryReceivers.map(r => r.pct),
          this.params.basisPoints,
        ],
        account: this.manager.address as `0x${string}`,
      }
      const transactionHash = await simulateAndExecuteContract(
        this.manager,
        args
      )
      return {
        type: TransactionType.ONCHAIN,
        hash: transactionHash,
      }
    }
  }

  success(): string {
    return `Successfully updates allocations for primary receiver`
  }
}
