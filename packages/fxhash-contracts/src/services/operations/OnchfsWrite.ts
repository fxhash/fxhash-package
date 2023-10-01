import { ContractAbstraction, Wallet, WalletOperation } from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"
import type { Inscription } from "onchfs"
import Onchfs from "onchfs"
import { uint8hex } from "@/utils/convert"

export type TOnchfsWriteOperationParams = {
  inscriptions: Inscription[]
}

export class OnchfsWriteOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosOnchfsWriteOperation
      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * List a gentk on the Marketplace
 */
export class TezosOnchfsWriteOperation extends TezosContractOperation<TOnchfsWriteOperationParams> {
  onchfsKt: ContractAbstraction<Wallet> | null = null
  bytesLength: number = 0

  async prepare() {
    this.onchfsKt = await this.manager.getContract(FxhashContracts.ONCHFS_FILES)
    this.bytesLength = Onchfs.inscriptions.inscriptionsBytesLength(
      this.params.inscriptions
    )
  }

  private inscriptionOperation(ins: Inscription) {
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
    const batch = this.manager.tezosToolkit.wallet.batch()

    console.log(this.params.inscriptions)
    for (const ins of this.params.inscriptions) {
      console.log(this.inscriptionOperation(ins))
      batch.withContractCall(this.inscriptionOperation(ins))
    }

    return batch.send()
  }

  success(): string {
    return `You have written ${this.params.inscriptions.length} inscriptions for a total of ${this.bytesLength} bytes on the On-Chain File System`
  }
}
