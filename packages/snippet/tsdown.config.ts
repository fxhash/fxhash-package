import { defineConfig, type Options } from "tsdown"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: !options.watch,
  dts: true,
}))
