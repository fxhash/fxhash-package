import { Configuration } from "webpack"
import { WebpackConfigFactoryOptions } from "./webpack.config.js"
import { createDevConfig } from "./webpack.config.dev.js"
import merge from "lodash.merge"
import { createProdConfig } from "./webpack.config.prod.js"
import env from "../constants.js"
import yargs, { Arguments } from "yargs"
import { devCommandBuilder } from "../cmd/dev/index.js"
export type FxhashCliMode = "dev" | "prd"

export interface WithFxhashCliOptions extends WebpackConfigFactoryOptions {
  mode: FxhashCliMode
}

export const DEFAULT_OPTIONS = {
  srcPath: env.SRC_PATH,
  portProject: env.PORT_FXPROJECT,
}

export function withFxhashCli(
  options: WithFxhashCliOptions,
  webpackConfig: Configuration
) {
  const { mode, ...webpackConfigFactoryOptions } = options
  const createConfig = mode === "prd" ? createProdConfig : createDevConfig
  // receive parsed cli args
  const { noZip, ...buildYargv } = devCommandBuilder(
    yargs()
  ).parse() as Arguments
  const devYargv = devCommandBuilder(yargs()).parse() as Arguments
  const fxhashCliConfig = createConfig({
    ...devYargv,
    ...buildYargv,
    zippify: !noZip,
    ...webpackConfigFactoryOptions,
  } as WebpackConfigFactoryOptions)

  return merge(fxhashCliConfig, webpackConfig)
}

export default withFxhashCli
