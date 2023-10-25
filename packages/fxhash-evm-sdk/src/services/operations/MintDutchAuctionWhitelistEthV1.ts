import { FxhashContracts } from "@/contracts/Contracts"
import { ContractOperation } from "./contractOperation"
import { TransactionReceipt } from "viem"
import { ABI as DAMinterABI } from "@/abi/DutchAuctionMinter"
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
}

/* The MintDutchAutionWhitelistEthV1Operation class is responsible for minting a fixed price token with
a whitelist in a Dutch auction on the Ethereum network. */
export class MintDutchAutionWhitelistEthV1Operation extends ContractOperation<TMintDutchAuctionWhitelistEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const account = this.manager.walletClient.account.address

    const whitelist = getWhitelistForToken(this.params.token)
    const index = getUserWhitelistIndex(whitelist, account)
    const proof = getProof(getWhitelistTree(whitelist), whitelist, account)
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_DUTCH_AUCTION_V1 as `0x${string}`,
      abi: DAMinterABI,
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
