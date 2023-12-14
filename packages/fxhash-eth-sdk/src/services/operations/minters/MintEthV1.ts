import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { MintFixedPriceWhitelistEthV1Operation } from "./MintFixedPriceWhitelistEthV1"
import { prepareMintParams } from "@/utils"
import { MintDutchAutionWhitelistEthV1Operation } from "./MintDutchAuctionWhitelistEthV1"
import { MintFixedPriceEthV1Operation } from "./MintFixedPriceEthV1"
import { MintDAEthV1Operation } from "./MintDutchAuctionEthV1"

export type TMintEthV1OperationParams = {
  token: `0x${string}`
  to: string | null
  whitelist: boolean
  price: bigint
}

/**
 * Mint an unique iteration of a Generative Token using the Fixed Priced minter
 * @dev contract interface: function buy(address _token, uint256 _mintId, uint256 _amount, address _to)
 */
export class MintEthV1Operation extends EthereumContractOperation<TMintEthV1OperationParams> {
  private mintOperation: EthereumContractOperation<unknown>

  async prepare() {
    const { pricing, indexAndProof, reserve } = await prepareMintParams(
      this.params.token,
      this.params.whitelist ? (this.params.to as `0x${string}`) : null
    )

    const isFixed = pricing.__typename === "pricing_fixed"
    if (!this.params.whitelist) {
      if (isFixed) {
        this.mintOperation = new MintFixedPriceEthV1Operation(this.manager, {
          token: this.params.token,
          to: this.params.to,
          reserveId: Number(pricing.id.split("-")[1]),
          price: this.params.price,
          amount: 1n,
        })
      } else {
        this.mintOperation = new MintDAEthV1Operation(this.manager, {
          token: this.params.token,
          to: this.params.to,
          reserveId: Number(pricing.id.split("-")[1]),
          amount: 1n,
          price: this.params.price,
        })
      }
      return
    }

    if (isFixed) {
      this.mintOperation = new MintFixedPriceWhitelistEthV1Operation(
        this.manager,
        {
          token: this.params.token,
          to: this.params.to,
          index: indexAndProof.index,
          proof: indexAndProof.proof,
          reserveId: reserve.data.reserveId,
          price: this.params.price,
          amount: 1n,
        }
      )
    } else {
      this.mintOperation = new MintDutchAutionWhitelistEthV1Operation(
        this.manager,
        {
          token: this.params.token,
          to: this.params.to,
          index: indexAndProof.index,
          proof: indexAndProof.proof,
          reserveId: reserve.data.reserveId,
          amount: 1n,
          price: this.params.price,
        }
      )
    }
  }
  async call(): Promise<TransactionReceipt> {
    return (await this.mintOperation.call()) as TransactionReceipt
  }

  success(): string {
    return `Successfully minted token ${this.params.token}`
  }
}
