/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import css from "./FrameManager.module.css"
import {
  IframeBDCommHost,
  IframeUnsupportedRequestError,
  MessageErrors,
  RequestPayload,
  WithIframeErrors,
  isBrowser,
} from "@fxhash/utils-browser"
import {
  AllWeb3AuthFrameErrors,
  Web3AuthFrameError,
  Web3AuthFrameInitializationError,
  Web3AuthFrameNotInitialized,
  Web3AuthFrameNotLoading,
  Web3AuthFrameNotResponding,
} from "@fxhash/errors"
import { failure, invariant, success, PromiseResult, _Key } from "@fxhash/utils"
import {
  FrameManagerEventEmitter,
  SessionDetails,
  Web3AuthFrameMessageTypes,
  Web3AuthLoginPayload,
} from "./_interfaces.js"

export type Web3AuthFrameConfig = {
  /**
   * The **root url** of the social wallets iframe.
   */
  url: string

  /**
   * An optionnal container in which the iframe should be loaded. If not
   * provided, a new div container will be created and appended on document.body
   * The iframe has custom display behaviour so it might not be suitable to
   * change the value.
   *
   * @default document.body
   */
  container?: HTMLElement
}

type TMessages = Web3AuthFrameMessageTypes

/**
 * @internal
 *
 * Responsible for managing the `<iframe>` which holds the fxhash wallet. Acts
 * as a high level interface to send/receives message to/from the fxhash wallet.
 *
 * **⚠️ Warning**: This class can only be instanciated in a browser context,
 * as it needs browser APIs to load the `<iframe>`.
 */
export class Web3AuthFrameManager extends IframeBDCommHost<
  TMessages,
  Web3AuthFrameInitializationError
> {
  private _emitter = new FrameManagerEventEmitter()
  private _config: Web3AuthFrameConfig
  private _container: HTMLElement | null = null
  private _wrapper: HTMLDivElement | null = null
  private _iframe: HTMLIFrameElement | null = null

  constructor(config: Web3AuthFrameConfig) {
    super(AllWeb3AuthFrameErrors)
    this._config = config
    this._container =
      this._config.container ||
      (typeof document !== "undefined" ? document.body : null)
  }

  /**
   * The container in which the DOM element which wraps the <iframe> is
   * located.
   */
  public get container() {
    return this._container
  }

  /**
   * The HTML wrapper which holds the <iframe>. This element is appended to
   * the provider container (or `document.body` by default).
   */
  public get wrapper() {
    return this._wrapper
  }

  public get emitter() {
    return this._emitter
  }

  /**
   * Initialize the various DOM elements:
   * - HTML wrapper
   * - iframe (& load the URL)
   */
  private initDOM(): PromiseResult<
    void,
    Web3AuthFrameNotLoading | Web3AuthFrameNotResponding
  > {
    return new Promise(async resolve => {
      // Check if another instance already exists, if so we can just recover the
      // state from this existing instance.
      const existingDiv = document.querySelector(".__fxhash__wallet")
      const existingIframe = existingDiv?.querySelector("iframe")
      if (existingDiv && existingIframe) {
        this._wrapper = existingDiv as HTMLDivElement
        this._iframe = existingIframe
        return resolve(success())
      }

      // initialize iframe
      this._wrapper = document.createElement("div")
      this._wrapper.classList.add(css.frameWrapper)

      this._iframe = document.createElement("iframe")
      this._iframe.addEventListener("load", async () => {
        // reset error handler to clear potential cases
        if (this._iframe) this._iframe.onerror = () => {}
        const res = await this._handshake()
        resolve(res)
      })
      this._iframe.onerror = err => {
        resolve(failure(new Web3AuthFrameNotLoading(this._config.url, err)))
      }
      this._iframe.src = this._config.url
      this._iframe.sandbox.add(
        "allow-scripts",
        "allow-same-origin",
        "allow-popups"
      )
      this._wrapper.appendChild(this._iframe)

      /**
       * !   _________________________________________________________________
       * ! /_____________________WARNING EXPLICIT CONTENT_____________________\
       *
       * This is a dirty hack which prevents the <iframe> from being removed
       * from the DOM by React applications, more specifically
       * React applications where the `<body>` is handled by react itself (as
       * such using `document.body.append()` only appends temporary until a
       * rerender of the `<body>` happens).
       *
       * When `@client/client-plugnplay-react` is used, we expect users to
       * wrap their app with <ClientPlugnPlayProvider>, so it's a bit tricky to
       * have access to a safe DOM element there.
       *
       * The option `getContainer()` offered by this module would work to some
       * extent, but would be quite cumburstone to use for devs, though when
       * used makes this hack irrelevant.
       *
       * Note: an observer still watches for the `<iframe>` removal in the
       * document, and will warn in the console if the `<iframe>` stil gets
       * removed. In such a case, using `getContainer()` is the only option.
       *
       * -----
       *
       * This solution involves leveraging a test filter React-dom is doing
       * on nodes before it removes them from the DOM
       * [1] https://github.com/facebook/react/blob/8b08e99efa56b848538768e25265fd3aa24dd8a1/packages/react-dom-bindings/src/client/ReactFiberConfigDOM.js#L1808
       * [2] https://github.com/facebook/react/blob/8b08e99efa56b848538768e25265fd3aa24dd8a1/packages/react-dom-bindings/src/client/ReactDOMComponentTree.js#L289
       * [3] https://github.com/facebook/react/blob/8b08e99efa56b848538768e25265fd3aa24dd8a1/packages/react-dom-bindings/src/client/ReactDOMComponentTree.js#L47
       *
       * Hoistable nodes have a `'__reactMarker$' + randomKey` property, so we
       * find the key by going through the DOM and looking for such signature.
       * If we find it, we also add it to our node so that it's skipped by
       * React-dom.
       */
      let reactMarker$: string | null = null
      let currentNode: Node | null,
        nodeIte = document.createNodeIterator(
          document.documentElement,
          NodeFilter.SHOW_ALL
        )
      breakWhile: while ((currentNode = nodeIte.nextNode())) {
        for (const key in currentNode) {
          if (key.startsWith("__reactMarker$")) {
            reactMarker$ = key
            break breakWhile
          }
        }
      }
      // obviously reactMarker$ isn't a valid HTMLElement property
      if (reactMarker$) (this.wrapper as any)[reactMarker$] = true

      // add attach an observer to detect if the iframe is removed from the DOM
      const observer = new MutationObserver(records => {
        for (const { removedNodes } of records) {
          for (const [_, node] of removedNodes.entries()) {
            if (
              node === this.wrapper ||
              node === this._container ||
              node === this.iframe
            ) {
              console.error(
                `The fxhash Web3Auth wallet <iframe> has been removed from the DOM. Please look into providing a safe container when you instanciate the client. Some Web3Auth wallet features are now broken`
              )
            }
          }
        }
      })
      observer.observe(document.body, {
        subtree: true,
        childList: true,
      })

      // this triggers iframe being loaded, eventually resolving this promise
      this._container?.prepend(this._wrapper!)
    })
  }

  private _showFrame(show: boolean) {
    if (!this.wrapper) throw Error(`iframe doesn't exist`)
    this.wrapper.classList[show ? "add" : "remove"](css.show)
  }

  /**
   * Performs the handshake procedure between the host and the <iframe>.
   * - IframeBDComm handshake protocol
   * - send init payload to <iframe>
   * - get Web3Auth initial session details
   */
  private async _handshake(): PromiseResult<void, Web3AuthFrameNotResponding> {
    invariant(this._iframe, "should be defined")

    // initialize the iframe with the IframeCommBd
    {
      const res = await super.init(this._iframe)
      if (res.isFailure())
        return failure(new Web3AuthFrameNotResponding(this._config.url))
    }

    // send request to wallet to init
    {
      const res = await this.sendRequest({ type: "init", timeout: 100 })
      if (res.isFailure())
        return failure(new Web3AuthFrameNotResponding(this._config.url))
    }

    // fetch initial details (emit event if a session exists)
    const initDetails = await this.getSessionDetails()
    if (initDetails.isSuccess() && initDetails.value) {
      this._handleSessionChanged(initDetails.value)
    }

    return success()
  }

  async init(): PromiseResult<void, Web3AuthFrameInitializationError> {
    invariant(
      isBrowser(),
      "fxhash embedded wallet can only be initialised in a browser context."
    )
    // initialize DOM elements
    {
      const res = await this.initDOM()
      if (res.isFailure()) return res
      if (!this._iframe) return failure(new Web3AuthFrameNotInitialized())
    }

    return success()
  }

  private _handleSessionChanged(details: SessionDetails | null) {
    this.emitter.emit("session-changed", details)
  }

  protected async processRequest<K extends _Key<TMessages["frame->host"]>>(
    payload: RequestPayload<K, TMessages["frame->host"][K]["req"]>
  ): PromiseResult<
    TMessages["frame->host"][K]["res"],
    WithIframeErrors<MessageErrors<TMessages, "frame->host">>
  > {
    if (payload.header.type === "showFrame") {
      this._showFrame(payload.body)
      return success()
    }
    return failure(new IframeUnsupportedRequestError(payload.header.type))
  }

  public getSessionDetails(): PromiseResult<
    SessionDetails | null,
    WithIframeErrors<Web3AuthFrameError["getSessionDetails"]>
  > {
    return this.sendRequest({ type: "getSessionDetails" })
  }

  public async login(
    payload: Web3AuthLoginPayload
  ): PromiseResult<
    SessionDetails | null,
    WithIframeErrors<Web3AuthFrameError["login"]>
  > {
    const res = await this.sendRequest({ type: "login", body: payload })
    if (res.isSuccess()) this._handleSessionChanged(res.value)
    return res
  }

  async logout(): PromiseResult<
    void,
    WithIframeErrors<Web3AuthFrameError["logout"]>
  > {
    const res = await this.sendRequest({ type: "logout" })
    if (res.isSuccess()) {
      this._handleSessionChanged(null)
      return success()
    }
    return res
  }
}
