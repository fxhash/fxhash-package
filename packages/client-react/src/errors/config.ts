import { IRichErrorMessages, RichError, isRichErrorMessages } from "@fxhash/sdk"

export class ReactClientInvalidConfigurationError extends RichError {
  name = "ReactClientInvalidConfigurationError" as const

  constructor(messages: IRichErrorMessages)
  constructor(cause: string)
  constructor(par1: IRichErrorMessages | string) {
    super(
      isRichErrorMessages(par1)
        ? par1
        : {
            dev: `The configuration provided to the <ClientPlugnPlayProvider> is invalid: ${par1}`,
          }
    )
  }
}
