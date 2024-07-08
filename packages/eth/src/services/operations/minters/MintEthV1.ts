import { EthereumContractOperation } from "../contractOperation.js"
import { MintFixedPriceWhitelistEthV1Operation } from "./MintFixedPriceWhitelistEthV1.js"
import { prepareMintParams } from "@/utils/index.js"
import { MintDutchAutionWhitelistEthV1Operation } from "./MintDutchAuctionWhitelistEthV1.js"
import { MintFixedPriceEthV1Operation } from "./MintFixedPriceEthV1.js"
import { MintDAEthV1Operation } from "./MintDutchAuctionEthV1.js"
import {
  GenerativeTokenVersion,
  TransactionType,
  invariant,
} from "@fxhash/shared"

export type TMintEthV1OperationParams = {
  token: `0x${string}`
  to: string | null
  qty: bigint
  whitelist: boolean
  price: bigint
  isFrame: boolean
  version: GenerativeTokenVersion
}

const MAX_RETRIES = 15 // 12 second block time + a few seconds for good measure
const ONE_SECOND = 1000
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Mint an unique iteration of a Generative Token using the Fixed Priced minter
 * @dev contract interface: function buy(address _token, uint256 _mintId, uint256 _amount, address _to)
 */
export class MintEthV1Operation extends EthereumContractOperation<TMintEthV1OperationParams> {
  private retries = 0
  private mintOperation: EthereumContractOperation<unknown> | undefined =
    undefined

  async prepare() {
    const { pricing, indexesAndProofs, reserve, isFixed } =
      await prepareMintParams(
        this.params.token,
        this.params.qty,
        this.params.whitelist ? (this.params.to as `0x${string}`) : null
      )

    if (pricing.opens_at && pricing.opens_at > new Date().toISOString())
      throw new Error("Minting is not yet open")

    if (!this.params.whitelist) {
      if (isFixed) {
        this.mintOperation = new MintFixedPriceEthV1Operation(
          this.manager,
          {
            token: this.params.token,
            to: this.params.to,
            reserveId: Number(pricing.id.split("-")[1]),
            price: this.params.price,
            amount: this.params.qty,
            isFrame: this.params.isFrame,
            version: this.params.version,
          },
          this.chain
        )
      } else {
        this.mintOperation = new MintDAEthV1Operation(
          this.manager,
          {
            token: this.params.token,
            to: this.params.to,
            reserveId: Number(pricing.id.split("-")[1]),
            amount: this.params.qty,
            price: this.params.price,
          },
          this.chain
        )
      }
      return
    } else {
      if (!indexesAndProofs || !reserve)
        throw new Error("No indexes or proofs found")
      if (isFixed) {
        this.mintOperation = new MintFixedPriceWhitelistEthV1Operation(
          this.manager,
          {
            token: this.params.token,
            to: this.params.to,
            index: indexesAndProofs.indexes,
            proof: indexesAndProofs.proofs,
            reserveId: reserve.data.reserveId,
            price: this.params.price,
            amount: this.params.qty,
            version: this.params.version,
          },
          this.chain
        )
      } else {
        this.mintOperation = new MintDutchAutionWhitelistEthV1Operation(
          this.manager,
          {
            token: this.params.token,
            to: this.params.to,
            index: indexesAndProofs.indexes,
            proof: indexesAndProofs.proofs,
            reserveId: reserve.data.reserveId,
            amount: this.params.qty,
            price: this.params.price,
          },
          this.chain
        )
      }
    }
  }

  async call(): Promise<{ type: TransactionType; hash: string }> {
    invariant(this.mintOperation, "Mint operation not prepared")
    try {
      return await this.mintOperation.call()
    } catch (e: unknown) {
      if (this.retries++ >= MAX_RETRIES) throw e
      if (e instanceof Error && e.message.includes("NotStarted")) {
        // retry in case the current block started before minting opened
        await sleep(ONE_SECOND)
        return this.call()
      }
      if (e instanceof Error && e.message.includes("InvalidPayment")) {
        // retry in case the current block started before the DA tier changed
        await sleep(ONE_SECOND)
        return this.call()
      }
      throw e
    }
  }

  success(): string {
    return `Successfully minted token ${this.params.token}`
  }
}
