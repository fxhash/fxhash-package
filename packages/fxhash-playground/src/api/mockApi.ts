// Use this instead of an API in case you can't call it
export const mockApi = (success: boolean, timeout: number = 1000) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve()
      } else {
        reject({ message: "Error" })
      }
    }, timeout)
  })
}
