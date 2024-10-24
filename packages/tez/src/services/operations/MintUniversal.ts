import {
  GenerativeTokenVersion,
  type GenerativeToken,
  type IReserveConsumption,
} from "@fxhash/shared"
import { TezosContractOperation } from "./ContractOperation"
import { MintOperation } from "./Mint"
import { MintV3Operation } from "./MintV3"
import { invariant } from "@fxhash/utils"
import type { WalletOperation } from "@taquito/taquito"

export type TMintUniversalOperationParams = {
  token: Pick<GenerativeToken, "id" | "version">
  price: number
  consumeReserve: IReserveConsumption | null
  createTicket: boolean
  inputBytes: string
}

export class MintUniversalOperation extends TezosContractOperation<TMintUniversalOperationParams> {
  private mintOperation:
    | TezosContractOperation<TMintUniversalOperationParams>
    | undefined = undefined

  async prepare() {
    if (this.params.token.version === GenerativeTokenVersion.PRE_V3) {
      this.mintOperation = new MintOperation(
        this.manager,
        this.params,
        this.chain
      )
    } else if (this.params.token.version === GenerativeTokenVersion.V3) {
      this.mintOperation = new MintV3Operation(
        this.manager,
        this.params,
        this.chain
      )
    } else {
      throw new Error("Invalid token version")
    }
    await this.mintOperation?.prepare()
  }

  async call(): Promise<WalletOperation> {
    invariant(this.mintOperation, "Mint operation not prepared")
    return await this.mintOperation.call()
  }

  success(): string {
    return "Successfully minted token"
  }
}
