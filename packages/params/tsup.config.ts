import { defineConfig, type Options } from "tsup"
import { sassPlugin, postcssModules } from "esbuild-sass-plugin"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts", "src/utils.ts"],
  outDir: "dist",
  format: ["esm"],
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  splitting: true,
  treeshake: true,
}))
