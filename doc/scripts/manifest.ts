interface IPkgConfig {
  /**
   * If set to true, the typedoc will not be generated for the package.
   */
  omitTypedoc?: boolean
}

export const PACKAGES_CONFIG: Record<string, IPkgConfig> = {
  sdk: {
    omitTypedoc: true,
  },
  core: {},
  client: {},
  "client-react": {},
  config: {},
  gql: {
    omitTypedoc: true,
  },
  "gql-client": {},
  errors: {},
  shared: {},
  eth: {},
  tez: {},
  "tez-utils": {},
  libraries: {},
  utils: {},
  "utils-browser": {},
}

export const PACKAGES = Object.keys(PACKAGES_CONFIG)
