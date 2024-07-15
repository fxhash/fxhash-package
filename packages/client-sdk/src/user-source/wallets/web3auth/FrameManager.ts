/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 */

import { PromiseResult, intialization, setIntervalCapped } from "@fxhash/utils"
import {
  IframeBDCommHost,
  IframeRequestTimeout,
  RequestPayload,
  isBrowser,
} from "@fxhash/utils-browser"
import {
  Web3AuthFrameInitializationError,
  Web3AuthFrameNotLoading,
  Web3AuthFrameNotResponding,
} from "./_errors.js"
import { Success, failure, invariant, success } from "@fxhash/shared"
import { Web3AuthLoginPayload } from "./_interfaces.js"

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

// todo: what's this ? type better ?
interface SessionDetails {
  /**
   * The Auth Provider is a string identifying the authentication solution
   * which is used for managing the wallet.
   */
  provider: string

  /**
   * Any extra info provided by the auth provided which may be used by
   * consumers if needed.
   */
  providerDetails: any
}

type TMessages = {
  "host->frame": {
    /**
     * Request to initialize the wallet. If already initialized, resolves
     * immediately.
     */
    init: {
      req: void
      res: void
    }

    /**
     * Request the current session details to the wallet frame.
     */
    getSessionDetails: {
      req: void
      res: SessionDetails | null
    }

    logout: {
      req: any
      res: any
    }

    login: {
      req: Web3AuthLoginPayload
      res: SessionDetails | null
    }

    tez_sign: {
      req: {
        op: string
        magicByte?: Uint8Array
      }
      res: {
        bytes: string
        sig: string
        prefixSig: string
        sbytes: string
      }
    }

    "tez__pub-key": {
      req: void
      res: string
    }

    tez__pkh: {
      req: void
      res: string
    }

    "evm__sign-message": {
      req: {
        chain: "ETHEREUM" | "BASE"
        message: string
      }
      res: string
    }

    "evm__sign-transaction": {
      req: any
      res: any
    }
  }

  "frame->host": {
    /**
     * The frame makes a request to the host to hide/show the iframe. The host
     * should oblige, as such a request is usually made because there's a need
     * for some user input or the need to display important information to
     * display to user.
     */
    showFrame: {
      /**
       * Whether the iframe should be displayed or not.
       */
      req: boolean
      res: void
    }
  }
}

/**
 * Responsible for managing the `<iframe>` which hosts the wallets. Acts as a
 * high level interface to send/receives message to/from the `<iframe>`.
 *
 * **Warning**: This class can only be instanciated in a browser context, as it
 * needs browser APIs to load the `<iframe>`.
 */
export class Web3AuthFrameManager extends IframeBDCommHost<TMessages> {
  _config: Web3AuthFrameConfig
  _container: HTMLElement
  _wrapper: HTMLDivElement | null = null
  _iframe: HTMLIFrameElement | null = null

  constructor(config: Web3AuthFrameConfig) {
    super()
    //
    invariant(
      isBrowser(),
      "The Social Wallets frame can only be loaded in a browser context."
    )
    this._config = config
    // this._container = this._config.container || document.body
    this._container = document.body
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

  /**
   * Initialize the various DOM elements:
   * - HTML wrapper
   * - iframe (& load the URL)
   */
  private initDOM(): PromiseResult<void, Web3AuthFrameNotLoading> {
    return new Promise<Success<void>>(async (resolve, reject) => {
      console.log("init dom !!")
      console.log(this._container)
      // initialize iframe
      this._wrapper = document.createElement("div")
      this._wrapper.classList.add("__fxhash__wallet-iframe")

      this._iframe = document.createElement("iframe")
      this._iframe.addEventListener("load", async () => {
        // reset error handler to clear potential cases
        if (this._iframe) this._iframe.onerror = () => {}
        resolve(success())
      })
      this._iframe.onerror = err => {
        reject(failure(new Web3AuthFrameNotLoading(this._config.url, err)))
      }
      this._iframe.src = this._config.url
      this._iframe.sandbox.add("allow-scripts", "allow-same-origin")
      this._wrapper.appendChild(this._iframe)

      const observer = new MutationObserver(records => {
        for (const { target, removedNodes } of records) {
          for (const [_, node] of removedNodes.entries()) {
            if (node === this.wrapper) {
              this._container.prepend(this._wrapper!)
              this._setupFrameCommProtocol()
            }
          }
        }
      })
      observer.observe(document.body, {
        subtree: true,
        childList: true,
      })

      this._container.prepend(this._wrapper!)
    })
  }

  private async _setupFrameCommProtocol() {
    invariant(this._iframe, "no iframe available")
    // initialize the iframe with the IframeCommBd
    {
      const res = await super.init(this._iframe)
      console.log({ res })
      if (res.isFailure())
        return failure(new Web3AuthFrameNotResponding(this._config.url))
    }

    // send request to wallet to init
    {
      const res = await this.sendRequest({ type: "init" })
      console.log("init request result:")
      console.log({ res })
      if (res.isFailure())
        return failure(new Web3AuthFrameNotResponding(this._config.url))
    }

    return success()
  }

  private _showFrame(show: boolean) {
    if (!this.wrapper) throw Error(`iframe doesn't exist`)
    this.wrapper.classList[show ? "add" : "remove"]("__fxhash__show")
  }

  async init(): PromiseResult<void, Web3AuthFrameInitializationError> {
    console.log("init iframe !!!")
    // initialize DOM elements
    {
      console.log("here")
      const res = await this.initDOM()
      console.log({ res })
      if (res.isFailure()) return res
    }
    // initialize the communication protocol
    {
      const res = await this._setupFrameCommProtocol()
      console.log({ res })
      if (res?.isFailure()) return res
    }

    return success()
  }

  protected async processRequest<K extends keyof TMessages["frame->host"]>(
    payload: RequestPayload<K, TMessages["frame->host"][K]["req"]>,
    _: MessageEvent<any>
    //@ts-ignore
  ): Promise<TMessages["frame->host"][K]["res"]> {
    if (payload.header.type === "showFrame") {
      this._showFrame(payload.body)
      return // void return
    }
  }

  public getSessionDetails(): PromiseResult<
    SessionDetails | null,
    IframeRequestTimeout
  > {
    return this.sendRequest({ type: "getSessionDetails" })
  }

  async login(
    payload: Web3AuthLoginPayload
  ): PromiseResult<SessionDetails | null, IframeRequestTimeout> {
    try {
      console.log(
        "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      )
      console.log({ payload })
      const res = await this.sendRequest({ type: "login", body: payload })
      console.log({ res })
      return res
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  async logout(): PromiseResult<any, IframeRequestTimeout> {
    return this.sendRequest({ type: "logout" })
  }
}
