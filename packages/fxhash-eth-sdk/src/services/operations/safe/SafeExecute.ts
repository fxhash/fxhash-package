import { EthereumContractOperation } from "../contractOperation"
import { getSafeService } from "@/services/Safe"
import { TransactionType } from "@fxhash/contracts-shared"

/**
 * The above type defines the parameters for executing a safe multisig transaction operation in
 * Ethereum v1.
 * @property {string} safeTxHash - A string representing the hash of a safe transaction.
 */
export type TExecuteSafeMultisigTxEthV1OperationParams = {
  collabAddress: string
  safeTxHash: string
}

/**
 * Execute a Safe Multisig transaction
 */
export class ExecuteSafeMultisigTxEthV1Operation extends EthereumContractOperation<TExecuteSafeMultisigTxEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    await this.manager.connectSafe(this.params.collabAddress)

    const safeService = getSafeService()
    const tx = await safeService.getTransaction(this.params.safeTxHash)
    const executeTxResponse = await this.manager.safe.executeTransaction(tx)
    const receipt =
      executeTxResponse.transactionResponse &&
      (await executeTxResponse.transactionResponse.wait())
    console.log("Safe executed", receipt)
    return {
      type: TransactionType.OFFCHAIN,
      hash: receipt.hash,
    }
  }

  success(): string {
    return `Successfully executed Safe multisig tx: ${this.params.safeTxHash}`
  }
}
