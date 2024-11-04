import { defineConfig, type Options } from "tsup"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: !options.watch,
  dts: true,
}))
