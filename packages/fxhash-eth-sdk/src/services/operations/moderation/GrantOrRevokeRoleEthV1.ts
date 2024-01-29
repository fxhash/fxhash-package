import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { encodeFunctionData } from "viem"
import { FX_ROLE_REGISTRY_ABI } from "@/abi/FxRoleRegistry"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { ETH_ROLES, ETH_ROLES_MAP } from "@/utils/roles"
import { FxhashContracts } from "@/contracts/Contracts"
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"
import { proposeSafeTransaction } from "@/services/Safe"
import { TransactionType } from "@fxhash/contracts-shared"

export type TGrantOrRevokeRoleEthV1OperationParams = {
  user: `0x${string}`
  role: ETH_ROLES
  action: "grant" | "revoke"
  collabAddress?: `0x${string}`
}

/**
 * Grant or revoke a role for a user
 */
export class GrantOrRevokeRoleEthV1Operation extends EthereumContractOperation<TGrantOrRevokeRoleEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const functionName =
      this.params.action === "grant" ? "grantRole" : "revokeRole"
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const safeTransactionData: SafeTransactionDataPartial = {
        to: FxhashContracts.ETH_ROLE_REGISTRY as `0x${string}`,
        data: encodeFunctionData({
          abi: FX_ROLE_REGISTRY_ABI,
          functionName: functionName,
          args: [ETH_ROLES_MAP[this.params.role], this.params.user],
        }),
        value: "0",
      }
      const transactionHash = await proposeSafeTransaction(
        [safeTransactionData],
        this.manager
      )
      return {
        type: TransactionType.OFFCHAIN,
        hash: transactionHash,
      }
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: FxhashContracts.ETH_ROLE_REGISTRY as `0x${string}`,
        abi: FX_ROLE_REGISTRY_ABI,
        functionName: functionName,
        args: [ETH_ROLES_MAP[this.params.role], this.params.user],
        account: this.manager.address as `0x${string}`,
      }
      const transactionHash = await simulateAndExecuteContract(
        this.manager,
        args
      )
      return {
        type: TransactionType.ONCHAIN,
        hash: transactionHash,
      }
    }
  }

  success(): string {
    return `Successfully set role (${this.params.action}) for user ${this.params.user}`
  }
}
