import { EthereumContractOperation } from "../contractOperation.js"
import { DUTCH_AUCTION_MINTER_ABI } from "@/abi/DutchAuctionMinter.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"

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
  async prepare() {
    if (!this.params.to) {
      this.params.to = this.manager.address
    }
  }
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const args: SimulateAndExecuteContractRequest<
      typeof DUTCH_AUCTION_MINTER_ABI,
      "buyMintPass"
    > = {
      address: currentConfig.contracts.dutch_auction_minter_v1,
      abi: DUTCH_AUCTION_MINTER_ABI,
      functionName: "buyMintPass",
      args: [
        this.params.token as `0x${string}`,
        BigInt(this.params.reserveId),
        this.params.amount,
        this.params.to as `0x${string}`,
        BigInt(this.params.index),
        this.params.signature as `0x${string}`,
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
    return `Successfully minted dutch auction token ${this.params.token}`
  }
}
