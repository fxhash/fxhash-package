import { FxhashContracts } from "@/contracts/Contracts"
import { ContractOperation } from "./contractOperation"
import { TransactionReceipt } from "viem"
import { ABI as DAMinterABI } from "@/abi/DutchAuctionMinter"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { getConfig } from "../Wallet"

export type TMintDAEthV1OperationParams = {
  token: string
  price: number
  amount: number
  reserveId: number
}

/**
 * Mint an unique iteration of a Generative Token using Dutch Auction pricing minter
 * @dev contract interface: function buy(address _token, uint256 _mintId, uint256 _amount, address _to)
 */
export class MintDAEthV1Operation extends ContractOperation<TMintDAEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const account = this.manager.walletClient.account.address
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_DUTCH_AUCTION_V1 as `0x${string}`,
      abi: DAMinterABI,
      functionName: "buy",
      args: [
        this.params.token,
        this.params.reserveId,
        this.params.amount,
        account,
      ],
      account: account,
      value: this.params.price,
    }
    return simulateAndExecuteContract(
      getConfig().publicClient,
      this.manager.walletClient,
      args
    )
  }

  success(): string {
    return `Successfully minted dutch auction token ${this.params.token} for ${this.params.price} ETH`
  }
}
