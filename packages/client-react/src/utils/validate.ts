import {
  IClientPlugnPlayProviderCustomConfig,
  IClientPlugnPlayProviderWeb2SignInOptions,
} from "@/_interfaces.js"
import { ReactClientInvalidConfigurationError } from "@/errors/config.js"
import { Result, failure, success } from "@fxhash/sdk"

/**
 * Validate if a Web2SignIn config is valid. Note: this doesn't check if it
 * exactly matches the interface (which is directly exposed to the user), but
 * rather if a config (with defaults merged) is valid.
 *
 * @param config Web2SignIn config
 *
 * @private
 */
export function isProviderWeb2SignInConfigValid(
  config: IClientPlugnPlayProviderCustomConfig["web2SignIn"]
): Result<void, ReactClientInvalidConfigurationError> {
  if (typeof config === "undefined")
    return failure(
      new ReactClientInvalidConfigurationError("missing web2SignIn option")
    )
  if (config === false) return success()
  if (typeof config.email !== "boolean")
    return failure(
      new ReactClientInvalidConfigurationError(
        "web2SignIn.email should be a boolean"
      )
    )
  if (config.discord) {
    if (!config.discord.clientId) {
      return failure(
        new ReactClientInvalidConfigurationError("Discord client ID is missing")
      )
    }
  }
  if (config.google) {
    if (!config.google.clientId) {
      return failure(
        new ReactClientInvalidConfigurationError("Google client ID is missing")
      )
    }
  }
  return success()
}

/**
 * Validate if a {@link IClientPlugnPlayProviderCustomConfig} config is valid.
 * Note: this doesn't check if it exactly matches the interface (which is
 * directly exposed to the dev), but rather if a config (with defaults merged)
 * is valid.
 *
 * @param config ClientPlugnPlayProvider config
 *
 * @private
 */
export function isProviderCustomConfigValid(
  config: IClientPlugnPlayProviderCustomConfig
): Result<void, ReactClientInvalidConfigurationError> {
  if (!config)
    return failure(
      new ReactClientInvalidConfigurationError("missing configuration")
    )

  return success()
}

/**
 * @private
 */
export function web2SignInEnabled(
  config: IClientPlugnPlayProviderCustomConfig
): config is { web2SignIn: IClientPlugnPlayProviderWeb2SignInOptions } {
  return typeof config.web2SignIn === "object"
}
