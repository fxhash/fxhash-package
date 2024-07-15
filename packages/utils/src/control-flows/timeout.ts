import { sleep } from "."

export type SetIntervalCappedOptions = {
  /**
   * The time, in milliseconds, the timer should delay in between executions of
   * the specified function or code.
   * @default 0
   */
  delay: number

  /**
   * Maximum number of steps before the setInterval resolves.
   * @default 20
   */
  maxSteps: number
}

type IntervalFnReturnType = true | void
type IntervalFn = () => Promise<IntervalFnReturnType> | IntervalFnReturnType

/**
 * fn() will be called on every interval, until a max number of steps is reached
 * or fn() returns true.
 * @param fn A function which returns true or void. If true is returned, the
 * interval will be stopped.
 * @param param1 Options
 */
export async function setIntervalCapped(
  fn: IntervalFn,
  { delay = 0, maxSteps = 20 }: SetIntervalCappedOptions
) {
  for (let i = 0; i < maxSteps; i++) {
    if ((await Promise.resolve(fn())) === true) return
    await sleep(delay)
  }
}
