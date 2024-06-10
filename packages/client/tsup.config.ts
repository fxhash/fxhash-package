import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
  entry: ["src/**/*.{ts,tsx}"],
  outDir: "dist",
  format: ["esm"],
  splitting: true,
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  bundle: true,
}))
