import { type IEquatableError } from "@fxhash/utils"

/**
 * Rich Error Messages are messages with extra data for a better usage of errors
 * passed through the stack. Traditionally, error messages are intended for
 * developers only (and some custom implementation for user error feedback is
 * required for clean UIs).
 */
export interface IRichErrorMessages {
  dev?: string
  user?: string
}

/**
 * Static error messages for "unexpected" errors. This payload is reused accross
 * the stack for when error data is missing.
 */
export const UnexpectedRichErrorMessages: Readonly<
  Required<IRichErrorMessages>
> = {
  dev: "Unexpected error",
  user: "Unexpected error",
} as const

/**
 * Flatenned Rich Error interface so that Rich Errors can also be passed in a
 * more convenient way. The purpose of this interface is to provide back-
 * compatibility with `Error`, as well as providing an unambiguous `userMessage`
 * property which can be used by front-end applications.
 */
export interface IRichError {
  /**
   * Message intended for developers
   */
  message: string
  /**
   * Message intended for users
   */
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
export class RichError extends Error implements IRichError, IEquatableError {
  messages: IRichErrorMessages = UnexpectedRichErrorMessages
  messagesOverride: IRichErrorMessages | undefined

  constructor(messagesOverride?: IRichErrorMessages) {
    super()
    if (messagesOverride) {
      this.messagesOverride = messagesOverride
    }
  }

  private _message(target: "dev" | "user") {
    return (
      this.messagesOverride?.[target] ||
      this.messages[target] ||
      UnexpectedRichErrorMessages[target]
    )
  }

  get message() {
    return this._message("dev")
  }

  get userMessage() {
    return this._message("user")
  }

  get code() {
    return this.name
  }

  public serialize(): IRichErrorSerialized {
    return {
      code: this.code,
      messages: this.messages,
    }
  }

  /**
   * Instanciates a Rich Error, trying to match the serialized error with the
   * provided Rich Error classes. The `code` property of the serialized payload
   * is matched against `RichError.name`
   *
   * @param serialized A rich error serialized
   * @param expected A list of Rich Error classes which are expected. If the
   * serialized error doesn't match any of these, UnexpectedRichError will be
   * returned.
   *
   * @returns An instance of Rich Error which type matches the `code` property,
   * or {@link UnexpectedRichError} if no match.
   */
  static parse<T extends (typeof RichError)[]>(
    serialized: IRichErrorSerialized,
    expected: T
  ): RichErrorUnion<T> | UnexpectedRichError {
    for (const RichErrorClass of expected) {
      if (RichErrorClass.name === serialized.code) {
        return new RichErrorClass(serialized.messages) as InstanceType<
          T[number]
        >
      }
    }
    return new UnexpectedRichError(serialized.messages)
  }

  /**
   * Returns a new instance of {@link UnexpectedRichError}
   * @param messagesOverride Optional overrides of default unexpected messages
   */
  static Unexpected(messagesOverride?: IRichErrorMessages) {
    return new UnexpectedRichError(messagesOverride)
  }
}

/**
 * A Rich error serialized,
 */
export interface IRichErrorSerialized {
  code: string
  messages?: IRichErrorMessages
}

/**
 * A general-purpose error which is thrown when no better error could be
 * inferred from the available context.
 */
export class UnexpectedRichError extends RichError {
  name = "UnexpectedRichError" as const
  messages = UnexpectedRichErrorMessages
}

/**
 * Creates an Union of Rich Error instance types from an array of Rich Error
 * classes.
 */
export type RichErrorUnion<T extends (typeof RichError)[]> = InstanceType<
  T[number]
>
