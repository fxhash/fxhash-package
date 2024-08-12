/**
 * Errors can implement this interface for error message which can be directly
 * displayed by front-end applications.
 */
export interface IFxhashErrorExtension {
  code: string
  userMessage: string
}

/**
 * An error which provides messages intended for devs & users. This class should
 * be used accross our stack to provide meaningful error objects which can be
 * used for both developers & users. When typed errors are returned, if they all
 * are instances of `RichError`, then client applications can take some simple
 * shortcuts to provide error feedback to both the developer and the user.
 *
 * @example
 *
 * ```ts
 * export class SomeCustomError extends RichError {
 *   name = "SomeCustomError" as const // `code` will have same value
 *   messages = {
 *     dev: "some message for devs",
 *     user: "some message for users"
 *   }
 * }
 * ```
 *
 * ```ts
 * const res = await something()
 * if (res.isFailure()) {
 *   const err = res.error // if this is typed as `RichError`
 *   displayErrorOnUI(err.userMessage) // safely display user message
 * }
 * ```
 */
export class RichError extends Error implements IFxhashErrorExtension {
  messages: {
    dev: string
    user: string
  } = {
    dev: "Unknown",
    user: "An unknown error occured.",
  }

  get message() {
    return this.messages.dev
  }

  get userMessage() {
    return this.messages.user
  }

  get code() {
    return this.name
  }
}

/**
 * A general-purpose error which is thrown when no better error could be
 * inferred from the available context.
 */
export class UnexpectedRichError extends RichError {
  name = "UnexpectedRichError" as const
  messages = {
    dev: "Unexpected error",
    user: "Unexpected error",
  }
  customMessage: string | undefined

  constructor(message?: string) {
    super()
    this.customMessage = message
  }

  get message() {
    return this.customMessage
      ? `${this.messages.dev}: ${this.customMessage}`
      : super.message
  }
}

/**
 * Creates an Union of Rich Error instance types from an array of Rich Error
 * classes.
 */
export type RichErrorUnion<T extends (typeof RichError)[]> = InstanceType<
  T[number]
>
