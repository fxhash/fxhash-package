import { EthereumContractOperation } from "../contractOperation.js"
import { getSafeService } from "@/services/Safe.js"
import { getAddress } from "viem"
import { TransactionType } from "@fxhash/shared"
import { invariant } from "@fxhash/utils"

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
    invariant(this.manager.safe, "Safe not connected")

    const safeService = getSafeService(this.chain)
    const signedSafeTx = await this.manager.safe.signTransaction(
      await safeService.getTransaction(this.params.txHash)
    )
    const signatures = new Map(
      [...signedSafeTx.signatures].map(([k, v]) => [getAddress(k), v])
    )
    const userSignature = signatures.get(getAddress(this.manager.address))
    if (!userSignature) {
      throw new Error("User signature not found")
    }
    await safeService.confirmTransaction(this.params.txHash, userSignature.data)
    return {
      type: TransactionType.OFFCHAIN,
      hash: this.params.txHash,
    }
  }

  success(): string {
    return `Successfully approved Safe multisig tx: ${this.params.txHash}`
  }
}
