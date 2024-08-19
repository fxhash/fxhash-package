import { isRichErrorMessages } from "@/utils/rich-error"
import { IRichErrorMessages, RichError, RichErrorUnion } from "../common"
import { capitalize } from "@fxhash/utils"

type OAuthProvider = "google" | "discord"

const couldntSignIn = (provider: OAuthProvider) =>
  `Couldn't sign in using ${capitalize(provider)}`

export class OAuthTokenVerificationError extends RichError {
  name = "OAuthTokenVerificationError" as const

  constructor(messages: IRichErrorMessages)
  constructor(provider: OAuthProvider)
  constructor(par: IRichErrorMessages | OAuthProvider) {
    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `The provided ${capitalize(par)} OAuth token could not be verified against ${capitalize(par)} services.`,
            user: couldntSignIn(par),
          }
    )
  }
}

export class OAuthMissingInfoError extends RichError {
  name = "OAuthMissingInfoError" as const

  constructor(messages: IRichErrorMessages)
  constructor(provider: OAuthProvider, missing: string[])
  constructor(par: IRichErrorMessages | OAuthProvider, missing?: string[]) {
    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `Some user information is missing at the end of the ${capitalize(par)} OAuth authentication flow: ${missing?.join(", ")}. This shouldn't happen and requires investigation from the fxhash team. Please forward this issue to our team.`,
            user: couldntSignIn(par),
          }
    )
  }
}

export const OAuthErrors = [OAuthTokenVerificationError, OAuthMissingInfoError]
export type OAuthError = RichErrorUnion<typeof OAuthErrors>
