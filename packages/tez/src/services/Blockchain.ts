import { config } from "@fxhash/config"
import { TzktOperation } from "../types/Tzkt"
import { sleep, fetchRetry } from "@fxhash/utils"

export const API_BLOCKCHAIN_CONTRACT_STORAGE = (address: string) =>
  `${config.tez.apis.tzkt}contracts/${address}/storage`

export const API_BLOCKCHAIN_CONTRACT_DETAILS = (address: string) =>
  `${config.tez.apis.tzkt}contracts/${address}`

export const API_CYCLES_LIST = `${config.tez.apis.tzkt}bigmaps/updates\
?contract=${config.tez.contracts.cycles}\
&path=cycles\
&action=add_key\
&limit=500`

export const API_OPERATION = (hash: string) =>
  `${config.tez.apis.tzkt}operations/${hash}`

export const API_BLOCKCHAIN_CONTRACT_OPERATIONS = (
  address: string,
  cursorId: number,
  entrypoints: string[],
  limit = 1000
) => `${config.tez.apis.tzkt}operations/transactions\
?target=${address}\
&entrypoint.in=${entrypoints.join(",")}\
&offset.cr=${cursorId}\
&status=applied\
&select=id,level,timestamp,sender,amount,parameter,diffs,target,initiator,hash\
&limit=${limit}`

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
): Promise<TzktOperation[]> {
  // will be set if the max duration promise reaches the end
  let stopped = false

  try {
    const opData = await Promise.race([
      new Promise<void>(async (resolve, reject) => {
        await sleep(maxDurationMs)
        stopped = true
        return reject(
          new Error(
            `Could not find the operation after ${
              maxDurationMs / 1000
            }s of search. Check your wallet to verify the transaction status.`
          )
        )
      }),
      new Promise<TzktOperation[]>(async (resolve, reject) => {
        const url = API_OPERATION(hash)

        while (!stopped) {
          await sleep(intervalMs)
          if (stopped) break
          // fetch the blockchain to get the operation
          const result = await fetchRetry(url)
          const data = await result.json()
          // we get an array of transactions
          if (data && data.length > 0) {
            // check if all the transactions are accepted
            for (const transaction of data) {
              if (transaction.status !== "applied") {
                // error happened in the transaction, we throw the error
                return reject(
                  new Error(`Operation was not applied: ${transaction.status}`)
                )
              }
            }
            // operation was successfully applied
            return resolve(data)
          }
          // if no data or if array is empty, operation not found yet
        }
      }),
    ])

    // if it resolved without and didn't throw, then it was applied successfully
    return opData as TzktOperation[]
  } catch (error: any) {
    const message =
      error.message ||
      "Error when confirming the operation. Please check your wallet to check the operation status."
    throw new Error(message)
  }
}

export const isTicketUsed = async (ticketId: number) => {
  const url = `${config.tez.apis.tzkt}operations/transactions\
?target=${config.tez.contracts.issuer_tickets}\
&entrypoint.in=consume&parameter.token_id=${ticketId}&status=applied&limit=1`

  const result = await fetchRetry(url)
  const data = await result.json()
  return data.length > 0
}

export const isTicketOwner = async (ticketId: number, address: string) => {
  const url = `${config.tez.apis.tzkt}contracts\
/${config.tez.contracts.issuer_tickets}\
/bigmaps/ledger/keys?key=${ticketId}&select=value`

  const result = await fetchRetry(url)
  const [owner] = await result.json()
  return owner === address
}
