import {
  ContractAbstraction,
  OpKind,
  TransactionWalletOperation,
  Wallet,
  WalletOperation,
  WalletParamsWithKind,
} from "@taquito/taquito"
import { FxhashContracts } from "@/types/Contracts"
import { GenerativeToken } from "@/types/entities/GenerativeToken"
import { EReserveMethod } from "@/types/entities/Reserve"
import { IReserveConsumption } from "@/types/Reserve"
import { genTokCurrentPrice } from "@/utils/genTokCurrentPrice"
import { isTicketOwner, isTicketUsed } from "@/services/Blockchain"
import { prepareReserveConsumption } from "@/utils/pack/reserves"
import { TezosContractOperation } from "./ContractOperation"
import {
  EBuildableParams,
  buildParameters,
} from "../parameters-builder/BuildParameters"

const isValidTicket = async (
  pkh: string,
  ticketId: number
): Promise<[isUsed: boolean, isOwned: boolean]> => {
  return Promise.all([isTicketUsed(ticketId), isTicketOwner(ticketId, pkh)])
}

const getFirstTicketAvailable = async (
  pkh: string,
  ticketIds: number[]
): Promise<number | null> => {
  for (const ticketId of ticketIds) {
    const [isUsed, isOwner] = await isValidTicket(pkh, ticketId)
    if (!isUsed && isOwner) {
      return ticketId
    }
  }
  return null
}

export type TMintV3AbstractionOperationParams = {
  // if a ticket ID or array of ticketID is provided, uses the first ticket available; otherwise mints on issuer
  ticketId: number | number[] | null
  token: GenerativeToken
  inputBytes: string
  consumeReserve?: IReserveConsumption | null
}

/**
 * Provides a single entity to either:
 * - mint with a ticket, if provided
 * - mint directly on the issuer, with input bytes
 */
export class TezosMintV3AbstractionOperation extends TezosContractOperation<TMintV3AbstractionOperationParams> {
  contract: ContractAbstraction<Wallet> | null = null
  useTicket: boolean | null = null
  ticketId: number | null = null
  reserveInput: string | null = null
  payloadPacked: string | null = null
  payloadSignature: string | null = null

  async prepare() {
    this.useTicket = this.params.ticketId !== null
    this.contract = await this.manager.getContract(FxhashContracts.ISSUER_V3)

    // if there is a consume method, pack the data
    if (this.params.consumeReserve) {
      const { reserveInput, payloadPacked, payloadSignature } =
        await prepareReserveConsumption(this.params.consumeReserve)
      this.reserveInput = reserveInput
      this.payloadPacked = payloadPacked
      this.payloadSignature = payloadSignature
    }
  }

  async validate(): Promise<boolean> {
    if (this.useTicket) {
      const pkh = await this.manager.beaconWallet.getPKH()
      if (this.params.ticketId instanceof Array) {
        const availableTicketId = await getFirstTicketAvailable(
          pkh,
          this.params.ticketId
        )
        if (availableTicketId) {
          this.ticketId = availableTicketId
          return true
        }
        throw new Error("No tickets remaining.")
      } else {
        const [isUsed, isOwner] = await isValidTicket(
          pkh,
          this.params.ticketId!
        )

        if (isUsed) throw new Error("Ticket is already used.")
        if (!isOwner) throw new Error("Ticket is not owned by you.")

        this.ticketId = this.params.ticketId
      }
    }
    return true
  }

  async call(): Promise<TransactionWalletOperation | WalletOperation> {
    await this.validate()

    if (this.useTicket) {
      return this.mintWithTicket()
    }

    const ops = this.generateWalletOperations()
    return this.manager.tezosToolkit.wallet.batch().with(ops).send()
  }

  private mintWithTicket(): Promise<TransactionWalletOperation> {
    return this.contract!.methodsObject.mint_with_ticket({
      issuer_id: this.params.token.id,
      ticket_id: this.ticketId,
      input_bytes: this.params.inputBytes,
      recipient: null,
    }).send()
  }

  private generateWalletOperations(): WalletParamsWithKind[] {
    const ops: WalletParamsWithKind[] = []

    // Add mint pass consumption operation if necessary
    if (this.needsMintPassConsumption()) {
      ops.push(this.createMintPassConsumptionOperation())
    }

    // Add main mint operation
    ops.push(this.createMintOperation())

    return ops
  }

  private needsMintPassConsumption(): boolean {
    return this.params.consumeReserve?.method === EReserveMethod.MINT_PASS
  }

  private createMintPassConsumptionOperation(): WalletParamsWithKind {
    return {
      kind: OpKind.TRANSACTION,
      to: this.params.consumeReserve!.data.reserveData,
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
    }
  }

  private createMintOperation(): WalletParamsWithKind {
    return {
      kind: OpKind.TRANSACTION,
      to: FxhashContracts.ISSUER_V3,
      amount: genTokCurrentPrice(this.params.token),
      mutez: true,
      parameter: {
        entrypoint: "mint",
        value: buildParameters(
          {
            issuer_id: this.params.token.id,
            referrer: null,
            reserve_input: this.reserveInput,
            create_ticket: null,
            recipient: null,
            input_bytes: this.params.inputBytes,
          },
          EBuildableParams.MINT_V3
        ),
      },
    }
  }

  success(): string {
    return this.useTicket
      ? `You have successfully exchanged one ticket for an iteration of "${this.params.token.name}".`
      : `You have successfully minted an iteration of "${this.params.token.name}".`
  }
}
