import { defineConfig, type Options } from "tsdown"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  jsx: "react",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
}))
