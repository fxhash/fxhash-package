import { defineConfig, type Options } from "tsup"

export default defineConfig((options: Options) => ({
  esbuildPlugins: [],
  entry: ["src/index.ts", "src/provider.ts", "src/components.ts"],
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
  external: ["react-force-graph-2d"],
}))
