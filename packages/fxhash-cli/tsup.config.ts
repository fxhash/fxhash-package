import { defineConfig, Options } from "tsup"

export default defineConfig((options: Options) => [
  {
    entry: [
      "src/index.ts",
      "src/fxhashCli.ts",
      "src/add.ts",
      "src/build.ts",
      "src/create.ts",
      "src/dev.ts",
      "src/eject.ts",
      "src/update.ts",
    ],
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
