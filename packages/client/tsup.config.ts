import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: "esm",
  jsx: "react",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
}))
