import { OpKind, type WalletOperation } from "@taquito/taquito"
import { getGentkLocalIDFromObjkt } from "@/utils/entities/gentk"
import { FxhashContracts } from "../../types/Contracts"
import { getGentkFA2Contract } from "../../utils/gentk"
import {
  buildParameters,
  EBuildableParams,
} from "../parameters-builder/BuildParameters"
import { TezosContractOperation } from "./ContractOperation"
import type { Objkt, User } from "@fxhash/shared"

export type TListingOperationParams = {
  token: Pick<Objkt, "id" | "version">
  owner: Pick<User, "id">
  price: bigint
}

/**
 * List a gentk on the Marketplace
 */
export class ListingOperation extends TezosContractOperation<TListingOperationParams> {
  async prepare() {}

  async call(): Promise<WalletOperation> {
    // recent V3 tokens have an ID of "FXN-{id}", so we need to extract the ID
    // part only for these recent tokens
    const id = getGentkLocalIDFromObjkt(this.params.token)

    const updateOperatorsParams = [
      {
        add_operator: {
          owner: this.params.owner.id,
          operator: FxhashContracts.MARKETPLACE_V2,
          token_id: id,
        },
      },
    ]

    const listingParams = {
      gentk: {
        id: id,
        version: this.params.token.version,
      },
      price: Number(this.params.price),
    }

    return this.manager.tezosToolkit.wallet
      .batch()
      .with([
        {
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
        },
        {
          kind: OpKind.TRANSACTION,
          to: FxhashContracts.MARKETPLACE_V2,
          amount: 0,
          parameter: {
            entrypoint: "listing",
            value: buildParameters(listingParams, EBuildableParams.LISTING),
          },
          storageLimit: 450,
        },
      ])
      .send()
  }

  success(): string {
    return "your listing has been created!"
  }
}
