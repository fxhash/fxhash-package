import {
  PromiseResult,
  Result,
  failure,
  success,
} from "@fxhash/contracts-shared"
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useMemo,
  useState,
} from "react"

class RequestReplacedError extends Error {
  name = "RequestReplacedError"
}

export type TConfirmationRequestOption = {
  /**
   * When the user chooses the given action, the confirmation will resolve
   * either in a success or failure.
   */
  result: "success" | "failure"
  /**
   * The message is used to display information about the action.
   * Conventionnaly, this is used within a button.
   */
  message: string
  /**
   * Arbitrary payload to attach to the action. It can be used by the front-end
   * for refining the UI.
   */
  payload?: any
}

export type TConfirmationRequestDetails = {
  /**
   * Request title, can be used for the title of the request modal.
   */
  title: ReactNode
  /**
   * Request message, can be used for the body of the request modal.
   */
  message: ReactNode
  /**
   * The "importance" of the confirmation request. Can be used by UIs to show
   * different interfaces.
   * @default normal
   */
  level?: "normal" | "warning" | "error"
  /**
   * Whether the interface should force the user to respond to the confirmation.
   * This requires the appropriate front-end implementation, and can be ignored
   * if not desired for the UX.
   * @default false
   */
  blocking?: boolean
  /**
   * An array of options which can be used for proposing various actions to the
   * user. The UI is responsible for processing the display of the options
   * properly. If no option is passed, the default behaviour should apply (and
   * should be implemented in any fashion by the front-end).
   */
  options?: TConfirmationRequestOption[]
  /**
   * @todo Probably remove, there hasn't be any use-case for it so far
   * Arbitrary payload, can be used for custom operations on the front-end,
   * when some particular UI might be required.
   */
  payload?: any
}

const defaultConfirmationDetails: Partial<TConfirmationRequestDetails> = {
  level: "normal",
  blocking: false,
}

type TResponse = Result<any, any>
type TRequestResolve = (response: TResponse) => void

export type TConfirmationActiveRequest = {
  /**
   * Unique ID associated with the request. The ID must be passed to respond()
   * to ensure than the response is made to the appropriate request.
   */
  id: string
  /**
   * The raw confirmation request input passed when the confirmation was
   * initialized.
   */
  details: TConfirmationRequestDetails
}

export type TConfirmationActiveRequestState = TConfirmationActiveRequest & {
  resolve: TRequestResolve
}

export type TConfirmationContext = {
  /**
   * The current active request. If null, there isn't any on-going request.
   */
  activeRequest: TConfirmationActiveRequest | null

  /**
   * Trigger a request for some user confirmation, which resolves when the user
   * responds or when the a new request is made (with failure).
   * @remark The view to confirm requests must be implemented separately, if not
   * the promise will never resolve.
   */
  request: (payload: TConfirmationRequestDetails) => PromiseResult<any, any>

  /**
   * Respond to a request identified by its ID.
   * @param id The unique ID attached to the request to respond to
   * @param payload The response payload, must be either a success() or
   * failure() depending on the response state.
   */
  respond: (id: string, payload: Result<any, any>) => void
}

const defaultContext: TConfirmationContext = {
  activeRequest: null,
  request: () => new Promise(r => r(success(true))),
  respond: () => {},
}

/**
 * The Confirmation Context provides some utilities to handle arbitrary user
 * confirmation. Applications can make confirmation requests and have a global
 * UI component responsible for the user interaction. Arbitrary payloads can be
 * passed around by various parts of the application.
 */
export const ConfirmationContext = createContext(defaultContext)

export function ConfirmationProvider({ children }: PropsWithChildren) {
  const [activeRequest, setActiveRequest] =
    useState<TConfirmationActiveRequestState | null>(null)

  /**
   * Resolve a request with either a success or a failure. By default, clears
   * the active request, but this behaviour can be overwritten.
   */
  const _resolveRequest = (
    response: Result<any, any>,
    clear: boolean = true
  ) => {
    if (!activeRequest) return
    activeRequest.resolve(response)
    clear && setActiveRequest(null)
  }

  /**
   * @private
   * Create a new request and set it as active, assigning a unique ID to it.
   * If there is an active request, resolves it with a failure.
   */
  const _updateActiveRequest = (
    details: TConfirmationRequestDetails,
    resolve: any
  ) => {
    if (activeRequest) {
      _resolveRequest(failure(new RequestReplacedError()), false)
    }
    const id = ("" + Math.random()).split(".").at(-1)!
    setActiveRequest({
      id,
      details: {
        ...defaultConfirmationDetails,
        ...details,
      },
      resolve,
    })
  }

  const request = (details: TConfirmationRequestDetails) => {
    return new Promise<Result<any, any>>(resolve => {
      _updateActiveRequest(details, resolve)
    })
  }

  const respond = (id: string, payload: Result<any, any>) => {
    if (!activeRequest || activeRequest.id !== id) {
      console.error(`The confirmation request has expired.`)
      return
    }
    _resolveRequest(payload)
  }

  const context = useMemo(
    () => ({
      activeRequest: activeRequest
        ? {
            id: activeRequest.id,
            details: activeRequest.details,
          }
        : null,
      request,
      respond,
    }),
    [activeRequest]
  )

  return (
    <ConfirmationContext.Provider value={context}>
      {children}
    </ConfirmationContext.Provider>
  )
}
