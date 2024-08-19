import {
  IRichErrorMessages,
  RichError,
  RichErrorUnion,
  isRichErrorMessages,
} from "@fxhash/errors"

export class AppMetadataInvalidTypeError extends RichError {
  name = "AppMetadataInvalidTypeError" as const
  messages = {
    dev: "App metadata should be an object.",
  }
}

export class AppMetadataMissingPropertiesError extends RichError {
  name = "AppMetadataMissingPropertiesError" as const

  constructor(messages: IRichErrorMessages)
  constructor(properties: string[])
  constructor(par1: IRichErrorMessages | string[]) {
    super(
      isRichErrorMessages(par1)
        ? par1
        : {
            dev: `App metadata is missing required properties ${par1.map(p => `"${p}"`).join(", ")}`,
          }
    )
  }
}

export const AppMetadataErrors = [
  AppMetadataInvalidTypeError,
  AppMetadataMissingPropertiesError,
]
export type AppMetadataError = RichErrorUnion<typeof AppMetadataErrors>
