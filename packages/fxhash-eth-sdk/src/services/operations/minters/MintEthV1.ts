import { EthereumContractOperation } from "../contractOperation"
import { TransactionReceipt } from "viem"
import { MintFixedPriceWhitelistEthV1Operation } from "./MintFixedPriceWhitelistEthV1"
import { apolloClient } from "@/services/Hasura"
import { Qu_GetTokenPricingsAndReserves } from "@fxhash/gql"
import {
  getFirstAvailableIndexAndProofForUser,
  getPricingAndReserveFromParams,
  getPricingFromParams,
  getWhitelist,
} from "@/utils"
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
    const tokenPricingsAndReserves = await apolloClient.query({
      query: Qu_GetTokenPricingsAndReserves,
      variables: {
        id: this.params.token,
      },
      fetchPolicy: "no-cache",
    })
    const { pricing } = getPricingFromParams(
      tokenPricingsAndReserves.data.onchain.generative_token_by_pk,
      this.params.whitelist
    )
    if (!pricing) {
      throw new Error("No pricing found")
    }

    const isFixed = pricing.__typename === "pricing_fixed"
    if (!this.params.whitelist) {
      if (isFixed) {
        this.mintOperation = new MintFixedPriceEthV1Operation(this.manager, {
          token: this.params.token,
          to: this.params.to,
          reserveId: pricing.id.split("-")[1],
          price: this.params.price,
          amount: 1n,
        })
      } else {
        this.mintOperation = new MintDAEthV1Operation(this.manager, {
          token: this.params.token,
          to: this.params.to,
          reserveId: pricing.id.split("-")[1],
          amount: 1n,
          price: this.params.price,
        })
      }
      return
    }

    let indexAndProof:
      | {
          index: number
          proof: string[]
        }
      | undefined = undefined
    let reserveSave: any = undefined
    for (const reserve of tokenPricingsAndReserves.data.onchain
      .generative_token_by_pk.reserves) {
      const merkleTreeWhitelist = await getWhitelist(reserve.data.merkleRoot)
      if (!merkleTreeWhitelist || merkleTreeWhitelist.length === 0) {
        throw new Error("No whitelist found")
      }
      const indexAndProofForUser = getFirstAvailableIndexAndProofForUser(
        this.params.to as any,
        merkleTreeWhitelist[0],
        reserve
      )
      if (indexAndProofForUser) {
        indexAndProof = indexAndProofForUser
        reserveSave = reserve
        break
      }
    }
    if (!indexAndProof) {
      throw new Error("No index and proof found")
    }

    if (isFixed) {
      this.mintOperation = new MintFixedPriceWhitelistEthV1Operation(
        this.manager,
        {
          token: this.params.token,
          to: this.params.to,
          index: indexAndProof.index,
          proof: indexAndProof.proof,
          reserveId: reserveSave.data.reserveId,
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
          reserveId: reserveSave.data.reserveId,
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
