import { EthereumContractOperation } from "../contractOperation"
import { getSplitsClient } from "../../Splits"
import { TransactionType, invariant } from "@fxhash/contracts-shared"

export type TWithdrawFromSplitsEthV1OperationParams = {
  split: string
}

/**
 * Withdraw ETH earnings from a splits contract
 */
export class WithdrawFromSplitsEthV1Operation extends EthereumContractOperation<TWithdrawFromSplitsEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args = {
      splitAddress: this.params.split,
      tokens: ["0x0000000000000000000000000000000000000000"],
    }

    const event = await getSplitsClient(
      this.chain,
      this.manager.publicClient,
      this.manager.walletClient
    ).batchDistributeAndWithdrawForAll(args)
    invariant(
      event.events.length > 0 && event.events[0].transactionHash,
      "Could not fetch withdraw event hash from splits batchDistributeAndWithdrawForAll operation"
    )
    return {
      type: TransactionType.OFFCHAIN,
      hash: event.events[0].transactionHash,
    }
  }

  success(): string {
    return `Successfully withdrew earnings from splits for account ${this.manager.address}`
  }
}
