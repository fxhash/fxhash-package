import { fxApisByEnv } from "../api/fxhash.js"
import { type Result, failure, success } from "@fxhash/utils"
import {
  type AppMetadataError,
  AppMetadataInvalidTypeError,
  AppMetadataMissingPropertiesError,
} from "../errors/metadata.js"
import { IAppMetadata, TEnv } from "../types.js"

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

/**
 * Test whether some value is a valid {@link IAppMetadata} interface. If not,
 * the issue causing it to be invalid is returned as a failure.
 * @param value Any value which should be tested for being valid App Metadata
 * @returns A Result with void success or failure with the issue
 */
export function isAppMetadataValid(value: any): Result<void, AppMetadataError> {
  if (!(typeof value === "object"))
    return failure(new AppMetadataInvalidTypeError())

  const missingProperties: string[] = []
  const requiredProperties: (keyof Required<IAppMetadata>)[] = [
    "name",
    "description",
    "url",
  ]
  for (const prop of requiredProperties) {
    if (!value[prop]) missingProperties.push(prop)
  }
  if (missingProperties.length > 0)
    return failure(new AppMetadataMissingPropertiesError(missingProperties))

  return success()
}
