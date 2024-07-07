import { invariant } from "."

export enum Init {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  FINISHED = "FINISHED",
}

const initStartErrorMessage = {
  [Init.STARTED]: `Initialization already in process`,
  [Init.FINISHED]: `Already been intialized`,
}

const initFinishErrorMessage = {
  [Init.NOT_STARTED]: `Initialization cannot finish if it has not started`,
  [Init.FINISHED]: `Initialization has already finished`,
}

/**
 * An utility initialization module for handling async initializations which can
 * only be done once.
 *
 * @example
 *
 * ```ts
 * class Something {
 *   private _init = initialization()
 *
 *   public async init() {
 *     this._init.start() // will throw if already started
 *     // ... some async stuff ...
 *     this._init.finish()
 *   }
 *
 *   public requiresInit() {
 *     this._init.assertFinished("not finished") // throws if not finished
 *   }
 * }
 * ```
 */
export function intialization() {
  let state: Init = Init.NOT_STARTED

  return {
    /**
     * The initialization state. **Note:** while exposed by the API it is not
     * recommended to use this value directly.
     */
    get state() {
      return state
    },
    /**
     * Whether the initialization is finished.
     */
    get finished() {
      return state === Init.FINISHED
    },
    /**
     * Throws an error if initialization is not finished.
     * @param message Optional message for thrown exception
     */
    assertFinished(message?: string) {
      invariant(
        state === Init.FINISHED,
        message || "Initialization not finished"
      )
    },
    /**
     * Sets the initialization state to `STARTED`. Will throw an error if the
     * initialization is either `STARTED` (in progress) or `FINISHED`. This
     * module is only designed for only-once initialization processes.
     * @param message Optional message for thrown exception
     */
    start(message?: string) {
      invariant(
        state === Init.NOT_STARTED,
        message || initStartErrorMessage[state as Init.FINISHED | Init.STARTED]
      )
      state = Init.STARTED
    },
    /**
     * Sets the initialization state to `FINISHED`. Will throw an error if the
     * current initialization state is `NOT_STARTED` or `FINISHED`: it's only
     * possible to finish an intialization which has started but isn't finished.
     * @param message Optional message for thrown exception
     */
    finish(message?: string) {
      invariant(
        state === Init.STARTED,
        message ||
          initFinishErrorMessage[state as Init.FINISHED | Init.NOT_STARTED]
      )
      state = Init.FINISHED
    },
  }
}
