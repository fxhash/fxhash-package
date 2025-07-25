import { ClientPlugnPlayOptions, DeepOmit } from "@fxhash/sdk"
import { ContractOperationSuccess } from "./hooks/useContractOperation"

export interface IClientPlugnPlayProviderWeb2SignInOptions {
  /**
   * If set, allows users to authenticate with Google. You will need to create
   * a Google application for your app and setup the OAuth settings.
   * todo: add link to doc
   */
  google?: {
    /**
     * Your google API client ID
     */
    clientId: string
  }

  /**
   * If set, allows users to authenticate with Discord. You will need to
   * create a Discord application for your app and setup the OAuth flow
   * settings.
   * todo: add link to doc
   */
  discord?: {
    /**
     * Your Discord API client ID
     */
    clientId: string
  }

  /**
   * Whether signin with email is enabled or not. Email authentication works
   * using a OTP sent to the email address after it is inputted.
   * @default true
   */
  email?: boolean
}

/**
 * Custom configuration options for the {@link ClientPlugnPlayProvider}
 */
export interface IClientPlugnPlayProviderCustomConfig {
  /**
   * Configure which Web2 signin options are available for your app. By default,
   * only email signin is available.
   *
   * If you want to have social signin options such as Google or Discord, you
   * will need to provide your application ID in here
   */
  web2SignIn?: false | IClientPlugnPlayProviderWeb2SignInOptions
}

export interface IReactClientPlugnPlayConfig
  extends DeepOmit<ClientPlugnPlayOptions, "manageConnectKitProvider">,
    IClientPlugnPlayProviderCustomConfig {}

export interface IReactClientPlugnPlayProviderProps {
  config: IReactClientPlugnPlayConfig

  /**
   * A callback function that is called when an operation is successful.
   */
  onOperationSuccess?: (data: ContractOperationSuccess) => void

  /**
   * Set this key if you want support for login via socials.
   */
  socialLogin?: boolean

  /**
   * In case your application would alter the content of `document.body`
   * such that it removes the <iframe> this module adds to
   * `document.body`, you should provide such wrapper here. It should be
   * a safe html element in which the <iframe> can be appended.
   *
   * @default document.body
   */
  safeDomContainer?: HTMLElement

  /**
   * If false (default), when the react <Provider> is called **on the
   * client-side**, a global unique instance of the client will be used. If you
   * need multiple instances for specific use-cases, you can turn this flag on.
   * **Not recommended when browser wallets are used !!!**
   *
   * This behaviour is only affecting the client, as we purposely want unique
   * instances on the server (for user hydration). On the server, a react
   * reference is used instead.
   *
   * @default false
   */
  unsafeAllowManyClientInstances?: boolean
}
