export const extractReservoirError = (e: Error): string | undefined => {
  // try to find a JSON substring within e.message
  const jsonStartIndex = e.message.indexOf("{")
  if (jsonStartIndex !== -1) {
    // attempt to extract the JSON string
    const jsonString = e.message.substring(jsonStartIndex)
    try {
      const errorObject = JSON.parse(jsonString)
      return errorObject.message
    } catch (parseError) {
      // failed to parse JSON
      return undefined
    }
  } else {
    // no JSON found
    return undefined
  }
}
