import Safe, { SafeAccountConfig } from "@safe-global/protocol-kit"
import { EthereumContractOperation } from "../contractOperation"
import { getSafeFactory } from "@/services/Safe"
import { TransactionType } from "@fxhash/shared"

/**
 * The above type represents the parameters required to create a safe multisig Ethereum V1 operation.
 * @property {string[]} owners - An array of Ethereum addresses representing the owners of the multisig
 * wallet. These addresses are used to authorize transactions.
 * @property {number} threshold - The threshold property represents the minimum number of owners
 * required to approve a transaction in a safe multisig Ethereum V1 operation.
 */
export type TCreateSafeMultisigEthV1OperationParams = {
  owners: string[]
  threshold: number
}

/**
 * Create a Safe Multisig contract for an artist collaboration
 */
export class CreateSafeMultisigEthV1Operation extends EthereumContractOperation<TCreateSafeMultisigEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    // We use params as the user is not yet connected to a Safe
    const safeFactory = await getSafeFactory(this.manager.signer)

    const safeAccountConfig: SafeAccountConfig = {
      owners: this.params.owners,
      threshold: this.params.threshold,
    }

    const safeInstance: Safe = await safeFactory.deploySafe({
      safeAccountConfig,
    })
    this.manager.safe = safeInstance
    return {
      type: TransactionType.OFFCHAIN,
      hash: await safeInstance.getAddress(),
    }
  }

  success(): string {
    return `Successfully created Safe multisig instance`
  }
}
