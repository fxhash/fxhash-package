import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
  entry: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  splitting: true,
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  bundle: true,
}))

