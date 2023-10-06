import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => [
  {
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["cjs"],
    splitting: true,
    sourcemap: true,
    clean: !options.watch,
    dts: true,
    bundle: true,
  },
  {
    entry: {
      webpack: "src/webpack/withFxhashCli.ts",
    },
    format: ["esm", "cjs"],
    splitting: true,
    sourcemap: true,
    clean: !options.watch,
    dts: true,
    bundle: true,
  },
])
