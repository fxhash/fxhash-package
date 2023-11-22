import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { getSafeService } from "@/services/Safe"

/**
 * The above type represents the parameters required for approving a safe multisig transaction on the
 * Ethereum network.
 * @property {string} txHash - A string representing the transaction hash.
 */
export type TApproveSafeMultisigTxEthV1OperationParams = {
  txHash: string
}

/**
 * Approve a Safe Multisig transaction
 */
export class ApproveSafeMultisigTxEthV1Operation extends EthereumContractOperation<TApproveSafeMultisigTxEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    const safeService = getSafeService(this.manager.signer)
    const signature = await this.manager.safe.signTransactionHash(
      this.params.txHash
    )
    await safeService.confirmTransaction(this.params.txHash, signature.data)
    return this.params.txHash
  }

  success(): string {
    return `Successfully approved Safe multisig tx: ${this.params.txHash}`
  }
}
