import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { getSplitsClient } from "../../Splits"

export type TWithdrawFromSplitsEthV1OperationParams = {
  split: string
}

/**
 * Withdraw ETH earnings from a splits contract
 */
export class WithdrawFromSplitsEthV1Operation extends EthereumContractOperation<TWithdrawFromSplitsEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    const args = {
      splitAddress: this.params.split,
      tokens: ["0x0000000000000000000000000000000000000000"],
    }

    const event = await getSplitsClient(
      this.manager.publicClient,
      this.manager.walletClient
    ).batchDistributeAndWithdrawForAll(args)
    return event.events[0].transactionHash
  }

  success(): string {
    return `Successfully withdrew earnings from splits for account ${this.manager.address}`
  }
}
