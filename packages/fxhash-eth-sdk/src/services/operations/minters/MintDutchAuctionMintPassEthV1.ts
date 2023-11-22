import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { DUTCH_AUCTION_MINTER_ABI } from "@/abi/DutchAuctionMinter"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

/**
 * The TMintDAMintPassEthV1OperationParams type represents the parameters required for a mint operation in a
 * decentralized exchange.
 * @property {string} token - A string representing the token being used in the operation.
 * @property {bigint} price - The `price` property is of type `bigint`, which represents an arbitrary
 * precision integer. It is used to store the price value for an operation.
 * @property {bigint} amount - The `amount` property represents the quantity or amount of a token to be
 * used in an operation. It is of type `bigint`, which is a built-in JavaScript type that represents
 * arbitrary-precision integers.
 * @property {number} reserveId - The `reserveId` property is a number that represents the identifier
 * of a reserve.
 */
export type TMintDAMintPassEthV1OperationParams = {
  token: string
  price: bigint
  amount: bigint
  reserveId: number
  index: number
  signature: string
  to: string
}

/**
 * Mint an unique iteration of a Generative Token using Dutch Auction pricing minter
 * @dev contract interface: function buy(address _token, uint256 _mintId, uint256 _amount, address _to)
 */
export class MintDAMintPassEthV1Operation extends EthereumContractOperation<TMintDAMintPassEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_DUTCH_AUCTION_V1 as `0x${string}`,
      abi: DUTCH_AUCTION_MINTER_ABI,
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
    return `Successfully minted dutch auction token ${this.params.token} for ${this.params.price} ETH using mint pass`
  }
}
