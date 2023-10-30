import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
  entry: ["zeus/**/*.{ts,tsx}"],
  outDir: "dist",
  format: ["cjs", "esm"],
  splitting: true,
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  bundle: true,
}))
