import { defineConfig, Options } from "tsup"
import { readFileSync } from "fs"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: "esm",
  splitting: true,
  treeshake: true,
  sourcemap: false,
  clean: !options.watch,
  dts: true,
  bundle: true,
  esbuildPlugins: [
    {
      name: "text-loader",
      setup(build) {
        build.onLoad({ filter: /\.lib$/ }, async args => {
          const text = readFileSync(args.path, "utf8")
          return {
            contents: `export default ${JSON.stringify(text)}`,
            loader: "js",
          }
        })
      },
    },
  ],
}))
