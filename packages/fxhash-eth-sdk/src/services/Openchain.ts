const OPENCHAIN_API_URL =
  "https://api.openchain.xyz/signature-database/v1/lookup?function="

export async function getOpenChainError(signature: string): Promise<string> {
  try {
    const fetchedError = await fetch(OPENCHAIN_API_URL + signature)

    const error = await fetchedError.json()
    if (error.ok === false) {
      return undefined
    } else {
      return error.result.function[signature][0].name
    }
  } catch (error) {
    throw Error("Error while fetching error signature from OpenChain: " + error)
  }
}
