import {InjectHead} from "./plugins/InjectHead"
import {baseConfig} from "./webpack.config"
import env from "../constants"
import {WebpackConfiguration} from "webpack-dev-server";

export const headlessConfig: WebpackConfiguration ={
  ...baseConfig,
  mode: "development",
  devServer: {
    port: env.PORT_FXPROJECT+1,
  },
  plugins: [
    ...baseConfig.plugins as any[],
    new InjectHead({
      inject: `<script>document.domain = "localhost"</script>`,
    }),
  ],
};
