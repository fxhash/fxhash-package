import { defineConfig, Options } from "tsdown"

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
  dts: {
    // We can't use this flag until https://github.com/oxc-project/oxc/issues/11186 is fixed
    isolatedDeclarations: false,
  },
}))
