import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  splitting: true,
  sourcemap: false,
  clean: !options.watch,
  dts: true,
  bundle: true,
  loader: {
    ".lib": "text",
  },
}))
