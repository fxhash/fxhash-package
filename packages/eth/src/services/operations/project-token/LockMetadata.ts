import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { projectTokenAbi } from "@/__generated__/wagmi.js"

export enum EvolutionPermission {
  NoOne = 0,
  Everyone = 1,
  Custom = 2,
}

export type TProjectTokenLockMetadataEthOperationParams = {
  // The address of the project token
  projectToken: `0x${string}`
  tokenId: bigint
  permission: EvolutionPermission
}

export class ProjectTokenLockMetadataOperation extends EthereumContractOperation<TProjectTokenLockMetadataEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof projectTokenAbi,
      "lockMetadata"
    > = {
      address: this.params.projectToken,
      abi: projectTokenAbi,
      functionName: "lockMetadata",
      args: [this.params.tokenId, this.params.permission],
      account: this.manager.address as `0x${string}`,
      chain: getCurrentChain(this.chain),
    }
    const transactionHash = await simulateAndExecuteContract(this.manager, args)
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return "Successfully locked token"
  }
}
