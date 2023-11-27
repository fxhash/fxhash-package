import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { DUTCH_AUCTION_MINTER_ABI } from "@/abi/DutchAuctionMinter"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import {
  getProof,
  getWhitelist,
  getUserWhitelistIndex,
  getWhitelistTree,
  getMerkleRootForToken,
} from "@/utils/whitelist"

/**
 * The above type represents the parameters required for a MintDutchAuctionWhitelistEthV1 operation in
 * TypeScript.
 * @property {string} token - A string representing the token address or identifier.
 * @property {bigint} price - The `price` property represents the starting price of the Dutch auction.
 * It is of type `bigint`, which means it can hold large integer values.
 * @property {bigint} amount - The `amount` property represents the quantity or number of tokens being
 * auctioned in the Dutch auction.
 * @property {number} reserveId - The `reserveId` property is a number that represents the identifier
 * of a reserve in the Mint Dutch Auction Whitelist Eth V1 operation.
 */
export type TMintDutchAuctionWhitelistEthV1OperationParams = {
  token: string
  price: bigint
  amount: bigint
  reserveId: number
  to: string | null
}

/* The MintDutchAutionWhitelistEthV1Operation class is responsible for minting a fixed price token with
a whitelist in a Dutch auction on the Ethereum network. */
export class MintDutchAutionWhitelistEthV1Operation extends EthereumContractOperation<TMintDutchAuctionWhitelistEthV1OperationParams> {
  async prepare() {
    if (!this.params.to) {
      this.params.to = this.manager.address
    }
  }
  async call(): Promise<TransactionReceipt> {
    const merkleRoot = await getMerkleRootForToken(this.params.token)
    if (merkleRoot === undefined) {
      throw new Error("No merkle root found for token " + this.params.token)
    }
    const whitelists = await getWhitelist(merkleRoot)
    if (whitelists.length === 0) {
      throw new Error(
        "No active whitelists found for token " + this.params.token
      )
    } else {
      const activeWhitelist = whitelists[0]
      const index = getUserWhitelistIndex(
        activeWhitelist.whitelist,
        this.manager.address
      )
      const proof = getProof(
        getWhitelistTree(activeWhitelist.whitelist),
        activeWhitelist.whitelist,
        this.manager.address
      )
      const args: SimulateAndExecuteContractRequest = {
        address: FxhashContracts.ETH_DUTCH_AUCTION_V1 as `0x${string}`,
        abi: DUTCH_AUCTION_MINTER_ABI,
        functionName: "buyAllowlist",
        args: [
          this.params.token,
          this.params.reserveId,
          this.params.to,
          [index],
          [proof],
        ],
        account: this.manager.address as `0x${string}`,
        value: this.params.price,
      }
      return simulateAndExecuteContract(this.manager, args)
    }
  }

  success(): string {
    return `Successfully minted fixed price token ${this.params.token}`
  }
}
