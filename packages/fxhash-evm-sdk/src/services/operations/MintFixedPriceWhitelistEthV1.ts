import { FxhashContracts } from "@/contracts/Contracts"
import { ContractOperation } from "./contractOperation"
import { TransactionReceipt } from "viem"
import { ABI as FixedPriceMinterABI } from "@/abi/FixedPriceMinter"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import {
  getProof,
  getWhitelistForToken,
  getUserWhitelistIndex,
  getWhitelistTree,
} from "@/utils/whitelist"

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
  price: bigint
  amount: bigint
}

/* The MintFixedPriceWhitelistEthV1Operation class is responsible for minting a fixed price token for a
specified price in ETH and using a whitelist. */
export class MintFixedPriceWhitelistEthV1Operation extends ContractOperation<TMintFixedPriceWhitelistEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const account = this.manager.walletClient.account.address

    const whitelist = getWhitelistForToken(this.params.token)
    const index = getUserWhitelistIndex(whitelist, account)
    const proof = getProof(getWhitelistTree(whitelist), whitelist, account)
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_FIXED_PRICE_MINTER_V1 as `0x${string}`,
      abi: FixedPriceMinterABI,
      functionName: "buyAllowlist",
      args: [
        this.params.token,
        this.params.reserveId,
        account,
        [index],
        [proof],
      ],
      account: account,
      value: this.params.price,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully minted fixed price token ${this.params.token} for ${this.params.price} ETH with whitelist`
  }
}
