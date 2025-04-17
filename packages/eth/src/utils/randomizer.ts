import { FX_GEN_ART_721_ABI } from "@/abi/index.js"
import { tokenLaunchpadAbi as FX_TOKEN_LAUNCHPAD_ABI } from "@/__generated__/wagmi"
import { Interface, type TransactionReceipt } from "ethers"
import { Hash } from "viem"

const genArtInterface = new Interface(FX_GEN_ART_721_ABI)

export interface Output {
  seed: Hash
  iteration: number
}

/**
 * Given a transaction receipt, outputs a list of seeds which have been emitted
 * during the transaction.
 * @param transactionReceipt
 * @returns An array of the seeds which have been emitted in the transaction
 */
export function getOutputsFromMintTransaction(
  transactionReceipt: Readonly<TransactionReceipt>
): Output[] {
  const outputs = new Map<bigint, Output>()
  for (const log of transactionReceipt.logs) {
    const desc = genArtInterface.parseLog({
      topics: log.topics as string[],
      data: log.data,
    })
    if (desc?.name === "SeedFulfilled") {
      const id = desc.args.getValue("_tokenId")
      outputs.set(id, {
        iteration: id,
        seed: desc.args.getValue("_seed") as Hash,
      } as Output)
    }
  }
  return Array.from(outputs.values())
}

const tokenLaunchpadInterface = new Interface(FX_TOKEN_LAUNCHPAD_ABI)

export function getCreatorTokenFromLaunchTransaction(
  transactionReceipt: Readonly<TransactionReceipt>
): string {
  console.log(transactionReceipt)
  for (const log of transactionReceipt.logs) {
    const desc = tokenLaunchpadInterface.parseLog({
      topics: log.topics as string[],
      data: log.data,
    })
    if (desc?.name === "Launched") {
      const id = desc.args.getValue("creatorToken")
      return id
    }
  }
  throw new Error("failed to find launch event")
}
