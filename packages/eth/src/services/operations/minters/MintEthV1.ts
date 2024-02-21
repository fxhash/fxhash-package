import { EthereumContractOperation } from "../contractOperation"
import { MintFixedPriceWhitelistEthV1Operation } from "./MintFixedPriceWhitelistEthV1"
import { prepareMintParams } from "@/utils"
import { MintDutchAutionWhitelistEthV1Operation } from "./MintDutchAuctionWhitelistEthV1"
import { MintFixedPriceEthV1Operation } from "./MintFixedPriceEthV1"
import { MintDAEthV1Operation } from "./MintDutchAuctionEthV1"
import { TransactionType, invariant } from "@fxhash/shared"

export type TMintEthV1OperationParams = {
  token: `0x${string}`
  to: string | null
  qty: bigint
  whitelist: boolean
  price: bigint
}

/**
 * Mint an unique iteration of a Generative Token using the Fixed Priced minter
 * @dev contract interface: function buy(address _token, uint256 _mintId, uint256 _amount, address _to)
 */
export class MintEthV1Operation extends EthereumContractOperation<TMintEthV1OperationParams> {
  private mintOperation: EthereumContractOperation<unknown> | undefined =
    undefined

  async prepare() {
    const { pricing, indexesAndProofs, reserve } = await prepareMintParams(
      this.params.token,
      this.params.qty,
      this.params.whitelist ? (this.params.to as `0x${string}`) : null
    )

    const isFixed = pricing.__typename === "pricing_fixed"
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
    return await this.mintOperation.call()
  }

  success(): string {
    return `Successfully minted token ${this.params.token}`
  }
}
