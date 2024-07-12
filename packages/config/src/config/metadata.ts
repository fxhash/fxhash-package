import { fxApisByEnv } from "../api/fxhash"
import { TEnv } from "../config"

/**
 * Meta info about the application. Can be used by wallets to scope the
 * application making requests for instance.
 */
export interface IAppMetadata {
  /**
   * Application name. Will be displayed by wallets when a request is made
   * (signing a message, sending a transaction)
   */
  name: string

  /**
   * A short sentence (<25 words) describing the app. Might be used by wallets
   * to display extra info about your app.
   */
  description: string

  /**
   * **IMPORTANT**: This should match the URL in which the JS context making
   * requests to wallets will be executed. **If doesn't match execution
   * context domain, wallets may display a red warning.
   */
  url: string

  /**
   * URL to your application icon. Recommended: PNG 256x256
   * May be used by wallet apps in their UI when users interact with your app.
   */
  icon?: string
}

// shared between all envs
const crossEnvMetadata: Omit<IAppMetadata, "url"> = {
  name: "FXHASH",
  description: "fxhash is a blockchain open platform for Generative Art",
  icon: "https://gateway.fxhash2.xyz/ipfs/QmUQUtCenBEYQLoHvfFCRxyHYDqBE49UGxtcp626FZnFDG",
}

/**
 * Get application metadata by merging some cross-env metadata with an
 * environment-specific URL (application front-end).
 */
export function fxAppEnvMetadata(env: TEnv): IAppMetadata {
  return {
    ...crossEnvMetadata,
    url: fxApisByEnv(env).website,
  }
}
