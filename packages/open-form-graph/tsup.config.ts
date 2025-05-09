import { defineConfig, type Options } from "tsup"

export default defineConfig((options: Options) => ({
  esbuildPlugins: [],
  entry: ["src/index.ts"],
  outDir: "dist",
  format: "esm",
  jsx: "automatic",
  loader: {
    ".svg": "dataurl",
  },
  splitting: true,
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  bundle: true,
}))
