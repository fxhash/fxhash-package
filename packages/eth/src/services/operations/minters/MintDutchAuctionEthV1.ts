import { dutchAuctionV2Abi } from "@/__generated__/wagmi.js"
import { EthereumContractOperation } from "../contractOperation.js"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"

/**
 * The TMintDAEthV1OperationParams type represents the parameters required for a mint operation in a
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
export type TMintDAEthV1OperationParams = {
  token: string
  price: bigint
  amount: bigint
  reserveId: number
  to: string
}

/**
 * Mint an unique iteration of a Generative Token using Dutch Auction pricing minter
 * @dev contract interface: function buy(address _token, uint256 _mintId, uint256 _amount, address _to)
 */
export class MintDAEthV1Operation extends EthereumContractOperation<TMintDAEthV1OperationParams> {
  async prepare() {
    if (!this.params.to) {
      this.params.to = this.manager.address
    }
  }
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const args: SimulateAndExecuteContractRequest<
      typeof dutchAuctionV2Abi,
      "buy"
    > = {
      address: currentConfig.contracts.dutch_auction_minter_v1,
      abi: dutchAuctionV2Abi,
      functionName: "buy",
      args: [
        this.params.token as `0x${string}`,
        BigInt(this.params.reserveId),
        this.params.amount,
        this.params.to as `0x${string}`,
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
