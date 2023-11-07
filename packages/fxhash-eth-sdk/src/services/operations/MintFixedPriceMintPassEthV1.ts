import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "./contractOperation"
import { TransactionReceipt } from "viem"
import { FIXED_PRICE_MINTER_ABI } from "@/abi/FixedPriceMinter"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

/**
 * The above type represents the parameters required for a fixed price mint pass operation in Ethereum.
 * @property {string} token - A string representing the token being minted.
 * @property {bigint} price - The `price` property is of type `bigint` and represents the fixed price
 * at which the token will be minted.
 * @property {number} reserveId - The `reserveId` property is a number that represents the identifier
 * of a reserve.
 * @property {bigint} amount - The `amount` property represents the quantity or number of tokens to be
 * minted. It is of type `bigint`, which is a built-in JavaScript type that represents
 * arbitrary-precision integers.
 * @property {number} index - The `index` property is a number that represents the position or order of
 * the operation. It is used to determine the sequence in which the operations should be executed.
 */
export type TMintFixedPriceMintPassEthV1OperationParams = {
  token: string
  price: bigint
  reserveId: number
  amount: bigint
  index: number
  signature: string
  to: string
}

/* The MintFixedPriceMintPassEthV1Operation class is responsible for minting a fixed price token using
a mint pass in Ethereum. */
export class MintFixedPriceMintPassEthV1Operation extends EthereumContractOperation<TMintFixedPriceMintPassEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_FIXED_PRICE_MINTER_V1 as `0x${string}`,
      abi: FIXED_PRICE_MINTER_ABI,
      functionName: "buyMintPass",
      args: [
        this.params.token,
        this.params.reserveId,
        this.params.amount,
        this.params.to,
        this.params.index,
        this.params.signature,
      ],
      account: this.manager.address,
      value: this.params.price,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully minted fixed price token ${this.params.token} for ${this.params.price} ETH with mint pass`
  }
}
