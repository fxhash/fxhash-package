import { FARCASTER_FRAME_FIXED_PRICE_MINTER } from "@/abi/FarcasterFrameFixedPriceMinter.js"
import { FIXED_PRICE_MINTER_V2_ABI } from "@/abi/FixedPriceMinterV2.js"
import { EthereumContractOperation } from "../contractOperation.js"
import { FIXED_PRICE_MINTER_ABI } from "@/abi/FixedPriceMinter.js"
import { getConfigForChain, getCurrentChain } from "@/services/Wallet.js"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { GenerativeTokenVersion, TransactionType } from "@fxhash/shared"

/**
 * The above type represents the parameters required for a fixed price mint pass operation in Ethereum.
 * @property {string} token - A string representing the token being minted.
 * @property {bigint} price - The `price` property is of type `bigint` and represents the fixed price
 * at which the token will be minted.
 * @property {number} reserveId - The `reserveId` property is a number that represents the identifier
 * of a reserve.
 * @property {bigint} amount - The `amount` property represents the quantity or number of tokens to be
 * minted. It is of type `bigint`, which is a built-in JavaScript type that represents
 * arbitrary-precision integers.
 * @property {number} index - The `index` property is a number that represents the position or order of
 * the operation. It is used to determine the sequence in which the operations should be executed.
 */
export type TMintFixedPriceMintPassEthV1OperationParams = {
  token: string
  price: bigint
  reserveId: number
  amount: bigint
  index: number
  signature: string
  to: string | null
  version: GenerativeTokenVersion
}

/* The MintFixedPriceMintPassEthV1Operation class is responsible for minting a fixed price token using
a mint pass in Ethereum. */
export class MintFixedPriceMintPassEthV1Operation extends EthereumContractOperation<TMintFixedPriceMintPassEthV1OperationParams> {
  async prepare() {
    if (!this.params.to) {
      this.params.to = this.manager.address
    }
  }
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)

    const isV2 =
      this.params.version === GenerativeTokenVersion.ETH_V2 ||
      this.params.version === GenerativeTokenVersion.BASE_V2
    const minter = isV2
      ? currentConfig.contracts.fixed_price_minter_v2
      : currentConfig.contracts.fixed_price_minter_v1

    const abi = isV2 ? FIXED_PRICE_MINTER_V2_ABI : FIXED_PRICE_MINTER_ABI
    const args: SimulateAndExecuteContractRequest = {
      address: minter,
      abi: abi,
      functionName: "buyMintPass",
      args: [
        this.params.token,
        this.params.reserveId,
        this.params.amount,
        this.params.to,
        this.params.index,
        this.params.signature,
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
