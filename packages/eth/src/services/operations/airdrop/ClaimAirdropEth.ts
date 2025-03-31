import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { fxAirdropAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type TClaimAirdropEthOperationParams = {
  // Amount of tokens to claim
  amount: bigint
  // Array of hashes forming the merkle proof
  merkleProof: `0x${string}`[]
}

export class ClaimAirdropEthOperation extends EthereumContractOperation<TClaimAirdropEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof fxAirdropAbi,
      "claim"
    > = {
      address: config.base.contracts.fx_airdrop,
      abi: fxAirdropAbi,
      functionName: "claim",
      args: [this.params.amount, this.params.merkleProof],
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
    return "Successfully claimed tokens"
  }
}
