import { defineConfig, type Options } from "tsdown"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  platform: "neutral",
}))
