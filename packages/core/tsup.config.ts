import { defineConfig, Options } from "tsup"
import cssModulesPlugin from "esbuild-css-modules-plugin"

export default defineConfig((options: Options) => ({
  esbuildPlugins: [cssModulesPlugin()],
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  jsx: "react",
  splitting: true,
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  bundle: true,
}))
