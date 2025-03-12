import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: "esm",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
}))
