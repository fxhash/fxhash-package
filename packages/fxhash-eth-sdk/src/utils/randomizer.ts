import { FX_GEN_ART_721_ABI } from "@/abi"
import { Interface, type TransactionReceipt } from "ethers"
import { Hash } from "viem"

const genArtInterface = new Interface(FX_GEN_ART_721_ABI)

/**
 * Given a transaction receipt, outputs a list of seeds which have been emitted
 * during the transaction.
 * @param transactionReceipt
 * @returns An array of the seeds which have been emitted in the transaction
 */
export function getSeedsFromMintTransaction(
  transactionReceipt: Readonly<TransactionReceipt>
): Hash[] {
  const seeds: Hash[] = []
  for (const log of transactionReceipt.logs) {
    const desc = genArtInterface.parseLog({
      topics: log.topics as string[],
      data: log.data,
    })
    if (desc?.name === "SeedFulfilled") {
      seeds.push(desc.args.getValue("_seed") as Hash)
    }
  }
  return seeds
}
