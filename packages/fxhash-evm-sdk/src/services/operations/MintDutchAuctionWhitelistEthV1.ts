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

export type TMintDutchAuctionWhitelistEthV1OperationParams = {
  token: string
  price: bigint
  amount: bigint
  reserveId: number
}

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
