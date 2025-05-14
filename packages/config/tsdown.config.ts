import { defineConfig, type Options } from "tsdown"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: "esm",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  platform: "neutral",
}))
