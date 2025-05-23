import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import { encodeFunctionData } from "viem"
import { FX_ROLE_REGISTRY_ABI } from "@/abi/FxRoleRegistry.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { type ETH_ROLES, ETH_ROLES_MAP } from "@/utils/roles.js"
import type { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types"
import { proposeSafeTransaction } from "@/services/Safe.js"
import { TransactionType } from "@fxhash/shared"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"

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
    const currentConfig = getConfigForChain(this.chain)
    const functionName =
      this.params.action === "grant" ? "grantRole" : "revokeRole"
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const safeTransactionData: SafeTransactionDataPartial = {
        to: currentConfig.contracts.role_registry_v1,
        data: encodeFunctionData({
          abi: FX_ROLE_REGISTRY_ABI,
          functionName: functionName,
          args: [ETH_ROLES_MAP[this.params.role], this.params.user],
        }),
        value: "0",
      }
      const transactionHash = await proposeSafeTransaction(
        this.chain,
        [safeTransactionData],
        this.manager
      )
      return {
        type: TransactionType.OFFCHAIN,
        hash: transactionHash,
      }
    }

    const args: SimulateAndExecuteContractRequest<
      typeof FX_ROLE_REGISTRY_ABI,
      typeof functionName
    > = {
      address: currentConfig.contracts.role_registry_v1,
      abi: FX_ROLE_REGISTRY_ABI,
      functionName: functionName,
      args: [ETH_ROLES_MAP[this.params.role], this.params.user],
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
    return `Successfully set role (${this.params.action}) for user ${this.params.user}`
  }
}
