import { defineConfig, type Options } from "tsdown"

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts", "src/getJsxFromMarkdown.ts"],
  jsx: "react",
  sourcemap: true,
  clean: !options.watch,
  dts: true,
}))
