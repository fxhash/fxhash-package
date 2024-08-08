/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 *
 * This implements a simple communication protocol between an <iframe> and its
 * host. The host must implement IframeBDCommHost and the frame must implement
 * IframeBDCommFrame.
 *
 * The protocol provides a bidirectionnal communication protocol, meaning that
 * both the host and the iframe can send messages. The protocol supports a
 * request/response type of messages, meaning that any request sent one way
 * receives a response from the other end as a confirmation. This ensure a
 * robust and versatile communication protocol where messages aren't lost (or
 * if they are it is eventually known).
 */

import {
  IEquatableError,
  PromiseResult,
  failure,
  success,
} from "@fxhash/shared"
import {
  ConnectionAlreadyEstablishedError,
  IframeBDError,
  IframeDisconnectedError,
  IframeRequestTimeoutError,
  ResponseError,
  SerializableResponseError,
} from "./errors"
import { Initialization, cleanup, intialization } from "@fxhash/utils"

/**
 * Potential improvements
 *  * add mechanism to track connectivity errors
 *  * add mechanism to ensure connectivity X seconds
 *  * requests can timeout
 */

/**
 * A "unique-like" key which is set on every payload sent through the protocol.
 * This is used to filter some messages from other sources.
 */
const PAYLOAD_IDENTIFYING_KEY = "_ibdcs"

/**
 * Each request has a unique ID which is generated when the request is sent.
 * This is used to map requests with their responses.
 */
type RequestID = string
const randomRequestID = (): RequestID => ("" + Math.random()).split(".")[1]

type RequestType<Extension extends string> = "__handshake" | Extension

/**
 * Each request has a header which contains the unique request ID, and the type
 * of the request.
 */
interface RequestHeader<ReqType extends string> {
  id: RequestID
  /**
   * The type can be used to assign an appropriate processor to the request
   * when it's received on the other end. Request types are specific to each
   * application and must be defined by each application.
   */
  type: RequestType<ReqType>
}

type PayloadType = "request" | "response"

interface GenericPayload<
  PayType extends PayloadType,
  ReqType extends string,
  BodyType,
> {
  type: PayType
  header: RequestHeader<ReqType>
  body: BodyType
}

export enum ResponseStatus {
  OK = "OK",
  ERROR = "ERROR",
}

export type RequestPayload<
  ReqType extends string,
  BodyType = any,
> = GenericPayload<"request", ReqType, BodyType>

export type ResponsePayload<ReqType extends string, BodyType = any> = Omit<
  GenericPayload<"response", ReqType, BodyType>,
  "body"
> & {
  /**
   * A response whill always include the resquest header so that it can
   * properly be mapped to the original request.
   */
  header: RequestHeader<ReqType>
} & (
    | {
        status: ResponseStatus.OK
        body: BodyType
      }
    | {
        status: ResponseStatus.ERROR
        body: {
          error: SerializableResponseError
        }
      }
  )

type Payload<ReqType extends string> =
  | RequestPayload<ReqType>
  | ResponsePayload<ReqType>

type RequestResolver<Errors> = {
  resolve: (body: any) => void
  reject: (
    reason:
      | IframeDisconnectedError
      | (Errors extends IEquatableError ? ResponseError<Errors> : never)
  ) => void
}

type TMessage = {
  [K: string]: {
    req: any
    res: any
    errors?: IEquatableError
  }
}

type MessageTypesSignature = {
  "host->frame": TMessage
  "frame->host": TMessage
}

type Direction = "host->frame" | "frame->host"
type OtherDir<Dir extends Direction> = Dir extends "host->frame"
  ? "frame->host"
  : "host->frame"
type _Key<T extends { [k: string]: any }> = Extract<keyof T, string>

type SendRequestOptions<T extends TMessage, K extends _Key<T>> = {
  type: RequestType<K>
  body?: T[K]["req"]
  /**
   * The number of ms after which the request fails with a Timeout error. If
   * undefined, will never timeout.
   */
  timeout?: number
}

/**
 * Shared implementation between the Host and the Frame
 */
abstract class IframeBDCommShared<
  MessageTypes extends MessageTypesSignature,
  Dir extends Direction,
> {
  awaitingRequests: Record<RequestID, RequestResolver<any>> = {}
  _intialization: Initialization = intialization()
  _clean: ReturnType<typeof cleanup> = cleanup()

  /**
   * Needs to implement sending a message to the other part.
   * @param message The message to post to the other side
   */
  protected abstract _postMessage(message: any): void

  /**
   * Need to implement whether the MessageEvent should be processed further
   * or not. This is useful to implement some safety rules on both ends.
   * @param event
   */
  protected abstract _shouldProcessMessageEvent(event: MessageEvent): boolean

  /**
   * Need to implement to handle incoming requests.
   * This function is called internally to wire the requests, and finnally
   * _handleRequest is called for processing individual message.
   * @param payload Payload received
   */
  protected abstract _handleRequest<
    K extends _Key<MessageTypes[OtherDir<Dir>]>,
  >(
    payload: RequestPayload<K, MessageTypes[OtherDir<Dir>][K]["req"]>,
    event: MessageEvent
  ): PromiseResult<
    MessageTypes[OtherDir<Dir>][K]["res"],
    NonNullable<MessageTypes[OtherDir<Dir>][K]["errors"]>
  >

  /**
   * Should be written by children of the children classes (Host & Frame) to
   * process consumer implementation-specific requests and respond.
   * @param payload
   * @param event
   */
  protected abstract processRequest<
    K extends _Key<MessageTypes[OtherDir<Dir>]>,
  >(
    payload: RequestPayload<K, MessageTypes[OtherDir<Dir>][K]["req"]>,
    event: MessageEvent
  ): PromiseResult<
    MessageTypes[OtherDir<Dir>][K]["res"],
    NonNullable<MessageTypes[OtherDir<Dir>][K]["errors"]>
  >

  protected _init() {
    if (this._intialization.finished) {
      // The <iframe> has already been initialized, but a new instance was
      //  received. The connection will be made with the new instance.`
      this._clean.clear()
    } else {
      this._intialization.start()
    }

    const handler = this._handleMessageEvent.bind(this)
    window.addEventListener("message", handler)
    this._clean.add(
      () => window.removeEventListener("message", handler),
      // if init() is called another time, this will cleanup all the ongoing
      // requests with a failure, as `clean.clear()` is called at the beginning
      // of this method
      () => {
        const awaitingRequests = Object.values(this.awaitingRequests)
        awaitingRequests.forEach(req =>
          req.reject(new IframeDisconnectedError())
        )
      }
    )

    if (!this._intialization.finished) this._intialization.finish()
  }

  /**
   * Send a payload through the protocol
   * @param payload
   */
  protected _sendPayload(payload: Payload<_Key<MessageTypes[Dir]>>) {
    this._postMessage({
      // some sort of unique identifier to mark message as part of protocol
      [PAYLOAD_IDENTIFYING_KEY]: true,
      payload,
    })
  }

  public async sendRequest<K extends _Key<MessageTypes[Dir]>>({
    type,
    body,
    timeout,
  }: SendRequestOptions<MessageTypes[Dir], K>): PromiseResult<
    MessageTypes[Dir][K]["res"],
    | IframeBDError
    | ResponseError<
        MessageTypes[Dir][K]["errors"] extends IEquatableError
          ? NonNullable<MessageTypes[Dir][K]["errors"]>
          : never
      >
  > {
    return new Promise(resolve => {
      const requestID = randomRequestID()

      let timeoutID: number
      if (timeout) {
        timeoutID = setTimeout(
          () => resolve(failure(new IframeRequestTimeoutError())),
          timeout
        )
      }
      const clear = () =>
        typeof timeoutID !== "undefined" && clearTimeout(timeout)

      // by adding a listener to the awaiting requests, it will resolve once a
      // response for this request is received
      this.awaitingRequests[requestID] = {
        resolve: (data: MessageTypes[Dir][K]["res"]) => {
          clear()
          resolve(success(data))
        },
        reject: reason => {
          clear()
          resolve(failure(reason))
        },
      }

      this._sendPayload({
        type: "request",
        header: {
          id: requestID,
          type,
        },
        body,
      })
    })
  }

  private _processResponse(payload: ResponsePayload<_Key<MessageTypes[Dir]>>) {
    // check if a request is awaiting for a response
    const awaitingRequest = this.awaitingRequests[payload.header.id]
    if (!awaitingRequest) return
    // delete from awaiting, then resolve the awaiting promise
    delete this.awaitingRequests[payload.header.id]
    if (payload.status === ResponseStatus.OK)
      awaitingRequest.resolve(payload.body)
    else awaitingRequest.reject(ResponseError.Parse(payload.body.error))
  }

  private async _handleMessageEvent(event: MessageEvent): Promise<void> {
    // ignore unidentified events outside of the protocol
    if (!event.data[PAYLOAD_IDENTIFYING_KEY]) return
    // ignore if shoudln't process for some reason
    if (!this._shouldProcessMessageEvent(event)) return

    const payload: Payload<_Key<MessageTypes[Dir]>> = event.data.payload

    if (payload.type === "request") {
      try {
        const res = await this._handleRequest(payload, event)
        if (res.isFailure()) throw new ResponseError(res.error)
        this._sendPayload({
          type: "response",
          header: payload.header,
          status: ResponseStatus.OK,
          body: res.value,
        })
        return
      } catch (err) {
        this._sendPayload({
          type: "response",
          header: payload.header,
          status: ResponseStatus.ERROR,
          body: {
            error: (err instanceof ResponseError
              ? err
              : ResponseError.Unknown(err)
            ).toSeriazable(),
          },
        })
      }
    }

    if (payload.type === "response") {
      this._processResponse(payload)
      return
    }
  }
}

/**
 * Should be instanciated on the Host side.
 */
export abstract class IframeBDCommHost<
  MessageTypes extends MessageTypesSignature,
  InitErrors extends IEquatableError = IframeBDError,
> extends IframeBDCommShared<MessageTypes, "host->frame"> {
  iframe: HTMLIFrameElement | null = null
  url: string = ""
  connected: boolean = false

  constructor() {
    super()
  }

  protected _shouldProcessMessageEvent(event: MessageEvent<any>): boolean {
    return origin(event.origin) === origin(this.url)
  }

  public async init(
    iframe: HTMLIFrameElement
  ): PromiseResult<void, InitErrors | IframeBDError | ResponseError> {
    super._init()

    this.iframe = iframe
    this.url = this.iframe.src

    // part of the protocol involves sending a "connect" payload to
    // propertly estalish the connection, otherwise the protocol shouldn't let
    // messages go through
    const result = await this.sendRequest({
      type: "__handshake",
    })
    if (result.isFailure()) {
      return result
    }
    this.connected = true
    return success()
  }

  protected _postMessage(message: any): void {
    if (!this.iframe) throw Error(`iframe not initialized`)
    this.iframe.contentWindow?.postMessage(
      message,
      new URL(this.iframe.src).origin
    )
  }

  protected async _handleRequest(
    payload: RequestPayload<_Key<MessageTypes["host->frame"]>>,
    event: MessageEvent
  ) {
    return this.processRequest(payload, event)
  }
}

interface IframeConnection {
  origin: string
}

/**
 * Should be instanciated on the Frame side.
 */
export abstract class IframeBDCommFrame<
  MessageTypes extends MessageTypesSignature,
> extends IframeBDCommShared<MessageTypes, "frame->host"> {
  /**
   * Will be set once the connection with the host is established through the
   * initial handshake
   */
  connection: IframeConnection | null = null

  constructor() {
    super()
    super._init()
  }

  get connected() {
    return !!this.connection
  }

  protected _shouldProcessMessageEvent(_: MessageEvent<any>): boolean {
    return true
  }

  protected _postMessage(message: any): void {
    if (!this.connected)
      throw Error(
        `iframe hasn't received initial connection message from host context`
      )
    if (!window.parent) throw Error(`no parent to send a message to`)
    window.parent.postMessage(message, this.connection!.origin)
  }

  protected async _handleRequest(
    payload: RequestPayload<_Key<MessageTypes["frame->host"]>>,
    event: MessageEvent
  ) {
    if (payload.header.type === "__handshake") {
      if (this.connected) {
        return failure(
          new ConnectionAlreadyEstablishedError(this.connection!.origin)
        )
      }
      this.connection = {
        origin: new URL(event.origin).origin,
      }
      return success()
    }

    return this.processRequest(payload, event)
  }
}

/**
 * Utility functions
 */

function origin(url: string) {
  return new URL(url).origin
}
