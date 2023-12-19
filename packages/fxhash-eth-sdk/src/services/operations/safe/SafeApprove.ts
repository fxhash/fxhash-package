import { EthereumContractOperation } from "../contractOperation"
import { getSafeService } from "@/services/Safe"
import { TransactionType } from "@fxhash/contracts-shared"

/**
 * The above type represents the parameters required for approving a safe multisig transaction on the
 * Ethereum network.
 * @property {string} txHash - A string representing the transaction hash.
 */
export type TApproveSafeMultisigTxEthV1OperationParams = {
  txHash: string
  collabAddress: string
}

/**
 * Approve a Safe Multisig transaction
 */
export class ApproveSafeMultisigTxEthV1Operation extends EthereumContractOperation<TApproveSafeMultisigTxEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    await this.manager.connectSafe(this.params.collabAddress)

    const safeService = getSafeService()
    const signature = await this.manager.safe.signTransactionHash(
      this.params.txHash
    )
    await safeService.confirmTransaction(this.params.txHash, signature.data)
    return {
      type: TransactionType.OFFCHAIN,
      hash: this.params.txHash,
    }
  }

  success(): string {
    return `Successfully approved Safe multisig tx: ${this.params.txHash}`
  }
}
