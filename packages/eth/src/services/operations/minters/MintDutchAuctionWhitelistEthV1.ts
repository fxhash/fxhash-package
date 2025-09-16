import { dutchAuctionV2Abi } from "@/__generated__/wagmi.js"
import { EthereumContractOperation } from "../contractOperation.js"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"

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
  index: number[]
  proof: string[][]
  to: string
}

/* The MintDutchAutionWhitelistEthV1Operation class is responsible for minting a fixed price token with
a whitelist in a Dutch auction on the Ethereum network. */
export class MintDutchAutionWhitelistEthV1Operation extends EthereumContractOperation<TMintDutchAuctionWhitelistEthV1OperationParams> {
  async prepare() {
    if (!this.params.to) {
      this.params.to = this.manager.address
    }
  }
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const args: SimulateAndExecuteContractRequest<
      typeof dutchAuctionV2Abi,
      "buyAllowlist"
    > = {
      address: currentConfig.contracts.dutch_auction_minter_v1,
      abi: dutchAuctionV2Abi,
      functionName: "buyAllowlist",
      args: [
        this.params.token as `0x${string}`,
        BigInt(this.params.reserveId),
        this.params.to as `0x${string}`,
        this.params.index.map(BigInt),
        this.params.proof as `0x${string}`[][],
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
