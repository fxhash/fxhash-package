import { InjectHead } from "./plugins/InjectHead"
import { createBaseConfig, WebpackConfigFactory } from "./webpack.config"
import env from "../constants"

export const createHeadlessConfig: WebpackConfigFactory = options => {
  const { portProject } = options
  const baseConfig = createBaseConfig(options)
  return {
    ...baseConfig,
    mode: "development",
    devServer: {
      port: portProject + 1,
    },
    plugins: [
      ...(baseConfig.plugins as any[]),
      new InjectHead({
        inject: `<script>document.domain = "localhost"</script>`,
      }),
    ],
  }
}
