import { sleep } from "./_index"

export interface IRetryOptions<FnReturnType> {
  /**
   * How many times at maximum should the function be retried until an error
   * is returned.
   * @default 3
   */
  maxRetries?: number

  /**
   * The delay (in milliseconds) between retries. The interval starts as soon as
   * the function to retry is called.
   * @default 1000
   */
  interval?: number

  /**
   * If set, a delay (in milliseconds) before the attempt is considered as
   * failed an a new one is attempted (except if `maxRetries`) has been reached.
   * @default undefined
   */
  timeout?: number

  /**
   * If defined, will be called when a retry is attempted. It can be used to
   * abort a fetch attempt for instance.
   * @default undefined
   */
  onRetry?: (attempts: number) => void

  /**
   * If defined, this function will be called when the called function
   * **successfully resolves**, and dictates whether a retry should be attempted
   * or not. This can be useful when a promise always returns some kinf of
   * `Result<Success, Failure>` (ie it never throws), but still has failed.
   * @default `() => false` (never retries if promise resolves)
   *
   * @param result A successful resolution of the called function.
   * @returns true => retry, false => no retry
   */
  shouldRetryOnSuccess?: (result: FnReturnType) => boolean
}

/**
 * Decorates an async function with `retry()`: the function will be callable in
 * the same fashion as it was, but will have a retry mechanism implemented. This
 * function internally calls `retry()` from this same package.
 *
 * @param fn An async function
 * @param options Retry options
 *
 * @returns A function which will automatically retry until fn() resolves, or
 * `maxRetries` have been reached.
 * @throws When `maxRetries` have been reached
 */
export function retriable<FnParams extends any[], FnReturn>(
  fn: (...params: FnParams) => Promise<FnReturn>,
  options: IRetryOptions<FnReturn> = {}
): (...params: FnParams) => Promise<FnReturn> {
  return async (...params: FnParams) => {
    return retry(() => fn(...params), options)
  }
}

/**
 * Retries to run an async function until it resolves (in which case this
 * function resolves with sudhc value) or until maxRetries have been attempted,
 * in which case this function throws with either the last error throws by the
 * function or `MaxRetriesError` if the function has always timeout.
 *
 * @param fn A function which returns a promise, which will be retried until it
 * resolves (or until maxRetries have been reached)
 * @param options Retry options
 *
 * @returns The promise resolve value.
 * @throws When maxRetries have been reached with either the last error thrown
 * by the fn, or MaxRetriesError if every call has timeout.
 */
export async function retry<FnReturn>(
  fn: () => Promise<FnReturn>,
  options: IRetryOptions<FnReturn> = {}
): Promise<FnReturn> {
  const {
    maxRetries = 3,
    interval = 1000,
    timeout,
    onRetry,
    shouldRetryOnSuccess,
  } = options
  let retries = 0,
    start: number,
    fnError: any = null

  while (retries <= maxRetries) {
    retries > 0 && onRetry?.(retries)
    start = performance.now()
    const promises = [fn()]
    if (typeof timeout !== "undefined") {
      promises.push(
        (async () => {
          await sleep(timeout)
          throw new TimeoutError()
        })()
      )
    }
    try {
      const res = await Promise.race(promises)
      // return except if instructed otherwise with `shouldRetryOnSuccess`
      if (shouldRetryOnSuccess?.(res)) {
      } else return res
    } catch (err) {
      if (!(err instanceof TimeoutError)) fnError = err
    }

    // need a retry if it hasn't returned
    const duration = performance.now() - start
    const effectiveInterval = interval - duration
    if (effectiveInterval > 0) await sleep(effectiveInterval)
    retries++
  }

  throw fnError || new MaxRetriesError()
}

class TimeoutError extends Error {
  name = "TimeoutError" as const
}

class MaxRetriesError extends Error {
  name = "MaxRetriesError" as const
}
