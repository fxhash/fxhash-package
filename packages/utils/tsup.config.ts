import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => ({
  entry: [
    "src/index.ts",
    "src/url.ts",
    "src/hash.ts",
    "src/math.ts",
    "src/address.ts",
  ],
  outDir: "dist",
  format: "esm",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
}))
