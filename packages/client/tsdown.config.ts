import { defineConfig, Options } from "tsdown"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  jsx: "react",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
}))
