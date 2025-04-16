import {
  OpKind,
  type WalletOperation,
  type WalletParamsWithKind,
} from "@taquito/taquito"
import { getGentkLocalID } from "@/utils/entities/gentk"
import { FxhashContracts } from "../../types/Contracts"
import { getGentkFA2Contract } from "../../utils/gentk"
import { getListingCancelEp, getListingFA2Contract } from "../../utils/listing"
import {
  buildParameters,
  EBuildableParams,
} from "../parameters-builder/BuildParameters"
import { TezosContractOperation } from "./ContractOperation"
import type { Objkt, Offer } from "@fxhash/shared"

export type TOfferAcceptOperationParams = {
  offer: Pick<Offer, "id">
  token: Pick<Objkt, "id" | "version"> & {
    activeListing: Pick<Objkt["activeListing"], "id" | "version">
    owner_id: string
  }
}

/**
 * List a gentk on the Marketplace
 */
export class OfferAcceptOperation extends TezosContractOperation<TOfferAcceptOperationParams> {
  async prepare() {}

  async call(): Promise<WalletOperation> {
    const updateOperatorsParams = [
      {
        add_operator: {
          owner: this.params.token.owner_id,
          operator: FxhashContracts.MARKETPLACE_V2,
          token_id: getGentkLocalID(this.params.token.id),
        },
      },
    ]

    // the list of operationd
    const operations: WalletParamsWithKind[] = []

    // if there's an active listing, it must first be cancelled
    if (this.params.token.activeListing) {
      operations.push({
        kind: OpKind.TRANSACTION,
        to: getListingFA2Contract(this.params.token.activeListing),
        amount: 0,
        parameter: {
          entrypoint: getListingCancelEp(this.params.token.activeListing),
          value: buildParameters(
            this.params.token.activeListing.id,
            EBuildableParams.LISTING_CANCEL
          ),
        },
        storageLimit: 150,
      })
    }

    // add the marketplace v2 as an operator
    operations.push({
      kind: OpKind.TRANSACTION,
      to: getGentkFA2Contract(this.params.token),
      amount: 0,
      parameter: {
        entrypoint: "update_operators",
        value: buildParameters(
          updateOperatorsParams,
          EBuildableParams.UPDATE_OPERATORS
        ),
      },
      storageLimit: 300,
    })

    // accept the offer
    operations.push({
      kind: OpKind.TRANSACTION,
      to: FxhashContracts.MARKETPLACE_V2,
      amount: 0,
      parameter: {
        entrypoint: "offer_accept",
        value: buildParameters(
          this.params.offer.id,
          EBuildableParams.OFFER_ACCEPT
        ),
      },
      storageLimit: 450,
    })

    return this.manager.tezosToolkit.wallet.batch().with(operations).send()
  }

  success(): string {
    return "You have accepted the offer"
  }
}
