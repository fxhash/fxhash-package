import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { TransactionReceipt } from "viem"
import { FX_ROLE_REGISTRY_ABI } from "@/abi/FxRoleRegistry"

import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { ETH_ROLES } from "./EthRoles"
import { FxhashContracts } from "@/contracts/Contracts"

export type TGrantOrRevokeRoleEthV1OperationParams = {
  user: `0x${string}`
  role: `0x${string}`
  action: "grant" | "revoke"
}

/**
 * Grant or revoke a role for a user
 */
export class GrantOrRevokeRoleEthV1Operation extends EthereumContractOperation<TGrantOrRevokeRoleEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    if (!ETH_ROLES.includes(this.params.role)) {
      throw new Error(`Role ${this.params.role} is not supported`)
    }
    const functionName =
      this.params.action === "grant" ? "grantRole" : "revokeRole"
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_ROLE_REGISTRY as `0x${string}`,
      abi: FX_ROLE_REGISTRY_ABI,
      functionName: functionName,
      args: [this.params.role, this.params.user],
      account: this.manager.address,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully set role (${this.params.action}) for user ${this.params.user}`
  }
}
