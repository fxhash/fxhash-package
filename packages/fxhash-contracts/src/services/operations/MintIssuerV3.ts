import { ContractAbstraction, Wallet, WalletOperation } from "@taquito/taquito"
import {
  EBuildableParams,
  pack,
} from "@/services/parameters-builder/BuildParameters"
import { stringToByteString, uint8hex } from "@/utils/convert"
import { getIpfsSlash, getOnchfsSlash } from "@/utils/ipfs"
import {
  FxhashCollabFactoryCalls,
  FxhashContracts,
} from "../../types/Contracts"
import { GenerativeTokenMetadata } from "../../types/Metadata"
import { MintGenerativeData } from "../../types/Mint"
import { mapReserveDefinition } from "@/utils/generative-token/reserve"
import { packPricing } from "../../utils/pack/pricing"
import { packReserveData } from "../../utils/pack/reserves"
import { transformGenTokFormToNumbers } from "../../utils/transformers/gen-tok-input-form"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"
import Onchfs, { Inscription } from "onchfs"

export type TMintIssuerV3OperationParams = {
  data: MintGenerativeData<string>
  metadata: GenerativeTokenMetadata
  metadataBytes: string
  // todo: have some better data for ticket settings ?
  ticketMetadataBytes: string
}

export class MintIssuerV3Operation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosMintIssuerV3Operation
      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * Mint an unique iteration of a Generative Token
 */
class TezosMintIssuerV3Operation extends TezosContractOperation<TMintIssuerV3OperationParams> {
  contract: ContractAbstraction<Wallet> | null = null
  onchfsKt: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(
      this.params.data.collaboration?.id || FxhashContracts.ISSUER_V3
    )
    if (this.params.data.onChain) {
      this.onchfsKt = await this.manager.getContract(
        FxhashContracts.ONCHFS_FILES
      )
    }
  }

  private inscriptionOperation(ins: Inscription) {
    if (!this.onchfsKt)
      throw new Error(`The onchfs contract wasn't initialized!`)
    switch (ins.type) {
      case "chunk":
        return this.onchfsKt.methods.write_chunk(uint8hex(ins.content))
      case "file":
        return this.onchfsKt.methodsObject.create_file({
          chunk_pointers: ins.chunks.map(buf => uint8hex(buf)),
          metadata: uint8hex(ins.metadata),
        })
      case "directory": {
        const formatted = Object.fromEntries(
          Object.entries(ins.files).map(([_, buf]) => [_, uint8hex(buf)])
        )
        return this.onchfsKt.methodsObject.create_directory(formatted)
      }
    }
    throw new Error("Unknown error")
  }

  async call(): Promise<WalletOperation> {
    // transform the string values in the form into some numbers so that
    // it can be sent to contract correctly (or packed)
    const numbered = transformGenTokFormToNumbers(this.params.data)

    // let's pack the pricing (only sub-field "details" gets packed)
    const packedPricing = packPricing(numbered.distribution!.pricing)

    const distribution = numbered.distribution!
    const informations = numbered.informations!

    // let's build the reserves array
    const reserves = distribution.reserves.map(reserve => ({
      amount: reserve.amount,
      method_id: mapReserveDefinition[reserve.method].id,
      data: packReserveData(reserve),
    }))

    const params = {
      amount: distribution.editions!,
      enabled: !!distribution.enabled,
      metadata: this.params.metadataBytes,
      pricing: packedPricing,
      primary_split: distribution.splitsPrimary,
      reserves: reserves,
      royalties: distribution.royalties!,
      royalties_split: distribution.splitsSecondary,
      tags: informations.labels,
      mint_ticket_settings:
        this.params.data.params!.inputBytesSize > 0
          ? {
              gracing_period: this.params.data.distribution?.gracingPeriod || 7,
              metadata: this.params.ticketMetadataBytes,
            }
          : null,
      open_editions: null,
      codex: {
        codex_entry: this.params.data.onChain
          ? {
              type: 2, // ONCHFS
              value: this.params.data.cidUrlParams!,
            }
          : {
              type: 0, // IPFS
              value: stringToByteString(
                getIpfsSlash(this.params.data.cidUrlParams!)
              ),
            },
      },
      input_bytes_size: this.params.data.params!.inputBytesSize,
    }

    const batch = this.manager.tezosToolkit.wallet.batch()

    // if onchain, project JSON metadata is written on-chain as part in a batch
    if (this.params.data.onChain) {
      const metadataEncoded = new TextEncoder().encode(
        JSON.stringify(this.params.metadata, null, 2)
      )
      const metadataInode = Onchfs.files.prepare({
        content: metadataEncoded,
        path: "metadata.json",
      })
      const metadataInscriptions = Onchfs.inscriptions.prepare(metadataInode)
      for (const ins of metadataInscriptions) {
        batch.withContractCall(this.inscriptionOperation(ins))
      }
    }

    // if collab, call the collab contract proposal EP instead
    if (this.params.data.collaboration) {
      const packed = pack(params, EBuildableParams.MINT_ISSUER_V3)
      batch.withContractCall(
        this.contract!.methodsObject.make_proposal({
          call_id: FxhashCollabFactoryCalls.MINT_ISSUER_V3,
          call_params: packed,
        })
      )
    } else {
      batch.withContractCall(this.contract!.methodsObject.mint_issuer(params))
    }

    return batch.send()
  }

  success(): string {
    return this.params.data.collaboration
      ? `A request to publish ${this.params.metadata.name} was successfully sent`
      : `Your project ${this.params.metadata.name} is successfully published`
  }
}
