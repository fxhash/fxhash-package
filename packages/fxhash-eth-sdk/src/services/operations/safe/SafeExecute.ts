import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { getSafeService } from "@/services/Safe"

/**
 * The above type defines the parameters for executing a safe multisig transaction operation in
 * Ethereum v1.
 * @property {string} safeTxHash - A string representing the hash of a safe transaction.
 */
export type TExecuteSafeMultisigTxEthV1OperationParams = {
  safeTxHash: string
}

/**
 * Execute a Safe Multisig transaction
 */
export class ExecuteSafeMultisigTxEthV1Operation extends EthereumContractOperation<TExecuteSafeMultisigTxEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    const safeService = getSafeService(this.manager.signer)
    const tx = await safeService.getTransaction(this.params.safeTxHash)
    const executeTxResponse = await this.manager.safe.executeTransaction(tx)
    const receipt =
      executeTxResponse.transactionResponse &&
      (await executeTxResponse.transactionResponse.wait())
    console.log(receipt)
    return receipt.transactionHash
  }

  success(): string {
    return `Successfully executed Safe multisig tx: ${this.params.safeTxHash}`
  }
}
