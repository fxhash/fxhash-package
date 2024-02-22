import { EthereumContractOperation } from "../contractOperation"
import { getSafeService } from "@/services/Safe"
import { TransactionType, invariant } from "@fxhash/shared"

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
    invariant(this.manager.safe, "Safe not connected")

    await this.manager.connectSafe(this.params.collabAddress)

    const safeService = getSafeService(this.chain)
    const signedSafeTx = await this.manager.safe.signTransaction(
      await safeService.getTransaction(this.params.txHash)
    )
    await safeService.confirmTransaction(
      this.params.txHash,
      signedSafeTx.signatures[signedSafeTx.signatures.size - 1]
    )
    return {
      type: TransactionType.OFFCHAIN,
      hash: this.params.txHash,
    }
  }

  success(): string {
    return `Successfully approved Safe multisig tx: ${this.params.txHash}`
  }
}
