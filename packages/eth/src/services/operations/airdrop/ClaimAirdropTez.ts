import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { tezAirdropAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type TClaimAirdropTezOperationParams = {
  // Amount of tokens to claim
  amount: bigint
  // Tezos wallet address
  wallet: string
  // EIP712 signature proving Tezos wallet ownership
  signature: `0x${string}`
  // Array of hashes forming the merkle proof
  merkleProof: `0x${string}`[]
}

export class ClaimAirdropTezOperation extends EthereumContractOperation<TClaimAirdropTezOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof tezAirdropAbi,
      "claim"
    > = {
      address: config.base.contracts.fx_tez_airdrop,
      abi: tezAirdropAbi,
      functionName: "claim",
      args: [
        this.params.amount,
        this.params.wallet,
        this.params.signature,
        this.params.merkleProof,
      ],
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
