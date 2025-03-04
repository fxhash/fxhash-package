import { defineConfig, type Options } from "tsup"
import { sassPlugin, postcssModules } from "esbuild-sass-plugin"

export default defineConfig((options: Options) => ({
  entry: ["src/index.tsx"],
  outDir: "dist",
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  esbuildPlugins: [
    sassPlugin({
      transform: postcssModules({}),
    }),
  ],
}))
