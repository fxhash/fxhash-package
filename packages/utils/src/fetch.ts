import { sleep } from "."

type StopConditionType = (tryIdx: number) => boolean

/**
 * Fetch with some retries
 * @param url the URL to fetch
 * @param maxRetries maximum number of retries before giving up, and throwing an error
 * @param delay time between each call (waits for the end of previous call)
 * @param stopCondition a function which will be called before each iteration, if it returns false, it stops
 * @returns
 */
export const fetchRetry = async (
  url: string,
  maxRetries: number = 5,
  delay: number = 200,
  shouldStop: StopConditionType = () => false,
  timeout: number | false = false
): Promise<Response> => {
  let error: any
  for (let i = 0; i < maxRetries; i++) {
    if (shouldStop(i)) break
    try {
      const controller = new AbortController()
      if (timeout !== false) {
        setTimeout(() => controller.abort(), timeout)
      }
      const data = await fetch(url, {
        signal: controller.signal,
      })
      if (data.status === 404) throw "404"
      return data
    } catch (err) {
      error = err
    }
    await sleep(delay)
  }
  throw error
}

export interface FetchOptions extends RequestInit {
  retries?: number
  initialDelayMs?: number
  shouldWaitBeforeRetry?: (error: any) => boolean
  factor?: number
  randomizationFactor?: number
  maxDelayMs?: number
}

export const isRateLimitError = (error: any): boolean => {
  const TOO_MANY_REQUESTS = 429
  return error.status === TOO_MANY_REQUESTS
}

const OK_STATUSES = new Set([200, 201, 202, 203, 204, 205, 206])

/**
 * This function tries to fetch a url, and if it fails, waits an exponentially
 * increasing amount of time before trying again, until a maximum number of
 * retries have been reached.
 */
export const fetchExponentialBackoff = async (
  url: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const {
    retries = 5,
    initialDelayMs = 2000,
    shouldWaitBeforeRetry = isRateLimitError,
    factor = 2,
    randomizationFactor = 0.5,
    maxDelayMs = 60000,
    ...fetchOptions
  } = options

  let currentDelay = initialDelayMs

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, fetchOptions)
      if (!OK_STATUSES.has(response.status)) {
        throw response
      }
      return response
    } catch (error: any) {
      if (attempt === retries) {
        throw error
      }

      if (shouldWaitBeforeRetry(error)) {
        const jitter = 1 + randomizationFactor * (Math.random() * 2 - 1)
        const delay = Math.min(currentDelay * jitter, maxDelayMs)
        await sleep(delay)
        currentDelay = Math.min(currentDelay * factor, maxDelayMs)
      }
    }
  }

  throw new Error("Maximum retries reached")
}
