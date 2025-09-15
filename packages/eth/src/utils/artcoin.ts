import { projectTokenAbi } from "@/__generated__/wagmi"
import { Interface, type TransactionReceipt } from "ethers"

const projectTokenInterface = new Interface(projectTokenAbi)

interface BatchMintOutput {
  iteration: number
}

/**
 * Given a transaction receipt, outputs a list of iterations which have been created
 * during the transaction.
 * @param transactionReceipt
 * @returns An array of the iterations which have been created in the transaction
 */
export function getOutputsFromBatchMintTransaction(
  transactionReceipt: Readonly<TransactionReceipt>
): BatchMintOutput[] {
  const outputs = new Map<bigint, BatchMintOutput>()
  for (const log of transactionReceipt.logs) {
    try {
      const desc = projectTokenInterface.parseLog({
        topics: log.topics as string[],
        data: log.data,
      })
      if (desc?.name === "Transfer") {
        const id = desc.args.getValue("tokenId")
        outputs.set(id, {
          iteration: id,
        } as BatchMintOutput)
      }
    } catch (error) {
      // ignore other logs
    }
  }
  return Array.from(outputs.values())
}
