import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { DUTCH_AUCTION_MINTER_ABI } from "@/abi/DutchAuctionMinter"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { MintDutchAutionWhitelistEthV1Operation } from "./MintDutchAuctionWhitelistEthV1"

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
  to: string | null
  whitelist: boolean
}

/**
 * Mint an unique iteration of a Generative Token using Dutch Auction pricing minter
 * @dev contract interface: function buy(address _token, uint256 _mintId, uint256 _amount, address _to)
 */
export class MintDAEthV1Operation extends EthereumContractOperation<TMintDAEthV1OperationParams> {
  private mintDutchAuctionWhitelistEthV1Operation: MintDutchAutionWhitelistEthV1Operation
  async prepare() {
    if (this.params.whitelist) {
      this.mintDutchAuctionWhitelistEthV1Operation =
        new MintDutchAutionWhitelistEthV1Operation(this.manager, this.params)
      return
    }
    if (!this.params.to) {
      this.params.to = this.manager.address
    }
  }
  async call(): Promise<TransactionReceipt> {
    if (this.params.whitelist) {
      return this.mintDutchAuctionWhitelistEthV1Operation.call()
    }
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_DUTCH_AUCTION_V1 as `0x${string}`,
      abi: DUTCH_AUCTION_MINTER_ABI,
      functionName: "buy",
      args: [
        this.params.token,
        this.params.reserveId,
        this.params.amount,
        this.params.to,
      ],
      account: this.manager.address as `0x${string}`,
      value: this.params.price,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    if (this.params.whitelist) {
      return this.mintDutchAuctionWhitelistEthV1Operation.success()
    }
    return `Successfully minted dutch auction token ${this.params.token}`
  }
}
