import { defineConfig, type Options } from "tsdown"

export default defineConfig((options: Options) => ({
  entry: [
    "src/index.ts",
    "src/url.ts",
    "src/hash.ts",
    "src/math.ts",
    "src/address.ts",
  ],
  outDir: "dist",
  format: "esm" as const,
  sourcemap: true,
  clean: !options.watch,
  dts: true,
}))
