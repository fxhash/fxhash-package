import {
  ContractAbstraction,
  OpKind,
  Wallet,
  WalletOperation,
  WalletParamsWithKind,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import {
  packMintReserveInput,
  prepareReserveConsumption,
} from "../../utils/pack/reserves"
import {
  buildParameters,
  EBuildableParams,
} from "../parameters-builder/BuildParameters"
import { TezosContractOperation } from "./ContractOperation"
import {
  type IReserveConsumption,
  EReserveMethod,
  type GenerativeToken,
} from "@fxhash/shared"

export type TMintOperationParams = {
  token: Pick<GenerativeToken, "id" | "version">
  price: number
  consumeReserve: IReserveConsumption | null
  createTicket: boolean
  inputBytes: string
}

/**
 * Mint an unique iteration of a Generative Token
 */
export class MintOperation extends TezosContractOperation<TMintOperationParams> {
  issuerContract: ContractAbstraction<Wallet> | null = null
  reserveInput: string | null = null
  payloadPacked: string | null = null
  payloadSignature: string | null = null

  async prepare() {
    this.issuerContract = await this.manager.getContract(FxhashContracts.ISSUER)

    // if there is a consume method, pack the data
    if (this.params.consumeReserve) {
      const consume = this.params.consumeReserve
      switch (consume.method) {
        case EReserveMethod.WHITELIST: {
          this.reserveInput = packMintReserveInput({
            method: EReserveMethod.WHITELIST,
            data: null,
          })
          break
        }
        case EReserveMethod.MINT_PASS: {
          // first we need to ask the backend to sign the payload
          const { reserveInput, payloadPacked, payloadSignature } =
            await prepareReserveConsumption(consume)
          this.reserveInput = reserveInput
          this.payloadPacked = payloadPacked
          this.payloadSignature = payloadSignature
          break
        }
      }
    }
  }

  async call(): Promise<WalletOperation> {
    const ops: WalletParamsWithKind[] = []

    // if we have a mint pass, we need to consume it
    if (this.params.consumeReserve?.method === EReserveMethod.MINT_PASS) {
      ops.push({
        kind: OpKind.TRANSACTION,
        to: this.params.consumeReserve.data.reserveData,
        amount: 0,
        parameter: {
          entrypoint: "consume_pass",
          value: buildParameters(
            {
              payload: this.payloadPacked,
              signature: this.payloadSignature,
            },
            EBuildableParams.MINT_PASS_CONSUME
          ),
        },
        storageLimit: 120,
      })
    }

    ops.push({
      kind: OpKind.TRANSACTION,
      to: FxhashContracts.ISSUER,
      amount: this.params.price,
      mutez: true,
      parameter: {
        entrypoint: "mint",
        value: buildParameters(
          {
            issuer_id: this.params.token.id,
            referrer: null,
            reserve_input: this.reserveInput,
          },
          EBuildableParams.MINT
        ),
      },
      storageLimit: 650,
    })

    return this.manager.tezosToolkit.wallet.batch().with(ops).send()

    // more naively it can be called likeso if there's no mint pass
    // mint passes are for our live events

    // return this.issuerContract!.methodsObject.mint({
    //   issuer_id: this.params.token.id,
    //   referrer: null,
    //   reserve_input: this.reserveInput,
    // }).send({
    //   amount: this.params.price,
    //   mutez: true,
    //   storageLimit: 650,
    // })
  }

  success(): string {
    return "Minted your unique iteration"
  }
}
