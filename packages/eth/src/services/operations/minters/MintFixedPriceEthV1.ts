import { EthereumContractOperation } from "../contractOperation.js"
import { FIXED_PRICE_MINTER_ABI } from "@/abi/FixedPriceMinter.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"
import { getFirstValidReserve } from "@/utils/minters.js"
import { FARCASTER_FRAME_FIXED_PRICE_MINTER } from "@/abi/FarcasterFrameFixedPriceMinter.js"

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
  isFrame: boolean
}

/**
 * Mint an unique iteration of a Generative Token using the Fixed Priced minter
 * @dev contract interface: function buy(address _token, uint256 _mintId, uint256 _amount, address _to)
 */
export class MintFixedPriceEthV1Operation extends EthereumContractOperation<TMintFixedPriceEthV1OperationParams> {
  async prepare() {
    if (!this.params.to) {
      this.params.to = this.manager.address
    }
  }
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const reserveId = this.params.isFrame
      ? await getFirstValidReserve(
          currentConfig.contracts.farcaster_frame_fixed_price_minter_v1,
          this.manager.publicClient,
          FARCASTER_FRAME_FIXED_PRICE_MINTER as any,
          this.params.token as `0x${string}`
        )
      : this.params.reserveId
    const args: SimulateAndExecuteContractRequest<
      typeof FIXED_PRICE_MINTER_ABI,
      "buy"
    > = {
      address: this.params.isFrame
        ? currentConfig.contracts.farcaster_frame_fixed_price_minter_v1
        : currentConfig.contracts.fixed_price_minter_v1,
      abi: FIXED_PRICE_MINTER_ABI,
      functionName: "buy",
      args: [
        this.params.token as `0x${string}`,
        BigInt(reserveId),
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
    return `Successfully minted fixed price token ${this.params.token}`
  }
}
