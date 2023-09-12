import { config } from "@fxhash/config"

/**
 * Given an operation hash, checks if the operation was included in the blockchain (check it the
 * status is applied, etc...)
 * Fetch periodically TZKT to check for the inclusion of the operation
 * @param hash the transaction hash to look for
 * @param intervalMs how much time between each call made to get transaction details
 * @param maxDurationMs how much time before throwing a timeout error
 */
export async function isOperationApplied(
  hash: string,
  intervalMs = 5000,
  maxDurationMs = 60000
): Promise<any[]> {
  //TODO: TBD to refactor according to Eth indexer
  // will be set if the max duration promise reaches the end
  let stopped = false

  try {
    const opData = await Promise.race([
      // eslint-disable-next-line no-async-promise-executor
      new Promise<void>(async (resolve, reject) => {
        //await sleep(maxDurationMs)
        stopped = true
        return reject(
          new Error(
            `Could not find the operation after ${
              maxDurationMs / 1000
            }s of search. Check your wallet to verify the transaction status.`
          )
        )
      }),
      // eslint-disable-next-line no-async-promise-executor
      new Promise<any[]>(async (resolve, reject) => {
        resolve([])
      }),
    ])

    // if it resolved without and didn't throw, then it was applied successfully
    return opData as any[]
  } catch (error: any) {
    const message =
      error.message ||
      "Error when confirming the operation. Please check your wallet to check the operation status."
    throw new Error(message)
  }
}
