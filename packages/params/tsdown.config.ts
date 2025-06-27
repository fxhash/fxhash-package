import { defineConfig, type Options } from "tsdown"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts", "src/utils.ts"],
  jsx: "automatic",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
}))
