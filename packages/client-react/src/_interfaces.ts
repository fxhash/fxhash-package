import { ClientPlugnPlayOptions, DeepOmit } from "@fxhash/sdk"

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
  safeDomContainer: HTMLElement
}
