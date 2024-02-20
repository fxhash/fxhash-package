import { EthereumContractOperation } from "../contractOperation"
import { FIXED_PRICE_MINTER_ABI } from "@/abi/FixedPriceMinter"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { TransactionType } from "@fxhash/contracts-shared"

/**
 * The above type represents the parameters required for a mint fixed price whitelist Ethereum V1
 * operation.
 * @property {string} token - A string representing the token address or identifier.
 * @property {number} mintId - The `mintId` property is a number that represents the unique identifier
 * for a mint operation.
 * @property {bigint} price - The `price` property is of type `bigint` and represents the fixed price
 * at which the token will be minted.
 * @property {number[]} indexes - The `indexes` property is an array of numbers. It represents the
 * indexes of the elements in the `proofs` array that correspond to the given `mintId`.
 * @property {string[]} proofs - The `proofs` property is an array of strings that represents the
 * proofs for the given operation. Each proof is a cryptographic proof that verifies the validity of
 * the operation.
 * @property {bigint} amount - The `amount` property in the
 * `TMintFixedPriceWhitelistEthV1OperationParams` type represents the quantity or number of tokens to
 * be minted. It is of type `bigint`, which is a built-in JavaScript type that represents
 * arbitrary-precision integers.
 */
export type TMintFixedPriceWhitelistEthV1OperationParams = {
  token: string
  reserveId: number
  index: number[]
  proof: string[][]
  price: bigint
  amount: bigint
  to: string | null
}

/* The MintFixedPriceWhitelistEthV1Operation class is responsible for minting a fixed price token for a
specified price in ETH and using a whitelist. */
export class MintFixedPriceWhitelistEthV1Operation extends EthereumContractOperation<TMintFixedPriceWhitelistEthV1OperationParams> {
  async prepare() {
    if (!this.params.to) {
      this.params.to = this.manager.address
    }
  }
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const args: SimulateAndExecuteContractRequest = {
      address: currentConfig.contracts.fixed_price_minter_v1,
      abi: FIXED_PRICE_MINTER_ABI,
      functionName: "buyAllowlist",
      args: [
        this.params.token,
        this.params.reserveId,
        this.params.to,
        this.params.index,
        this.params.proof,
      ],
      account: this.manager.address as `0x${string}`,
      value: this.params.price,
      chain: getCurrentChain(this.chain),
    }
    const transactionHash = await simulateAndExecuteContract(this.manager, args)
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `Successfully minted fixed price token ${this.params.token}`
  }
}
