import { FxhashContracts } from "@/contracts/Contracts"
import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { FIXED_PRICE_MINTER_ABI } from "@/abi/FixedPriceMinter"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

/**
 * The following type represents the parameters required for a mint operation in a fixed price Ethereum
 * contract.
 * @property {string} token - A string representing the token address or identifier.
 * @property {bigint} price - The `price` property is a `bigint` type, which represents an arbitrary
 * precision integer. It is used to store the price of a token in a fixed price ETH mint operation.
 * @property {number} reserveId - The `reserveId` property is a number that represents the identifier
 * of a reserve.
 * @property {bigint} amount - The `amount` property represents the quantity or number of tokens to be
 * minted.
 */
export type TMintFixedPriceEthV1OperationParams = {
  token: string
  price: bigint
  reserveId: number
  amount: bigint
  to: string
}

/**
 * Mint an unique iteration of a Generative Token using the Fixed Priced minter
 * @dev contract interface: function buy(address _token, uint256 _mintId, uint256 _amount, address _to)
 */
export class MintFixedPriceEthV1Operation extends EthereumContractOperation<TMintFixedPriceEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_FIXED_PRICE_MINTER_V1 as `0x${string}`,
      abi: FIXED_PRICE_MINTER_ABI,
      functionName: "buy",
      args: [
        this.params.token,
        this.params.reserveId,
        this.params.amount,
        this.params.to,
      ],
      account: this.manager.address,
      value: this.params.price,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully minted fixed price token ${this.params.token} for ${this.params.price} ETH`
  }
}
