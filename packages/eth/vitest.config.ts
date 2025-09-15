import { defineConfig } from "vitest/config"
import { resolve } from "path"

export default defineConfig({
  test: {
    globals: true,
    environment: "node", // or 'jsdom' if you're testing DOM elements
    // If you need to ignore transforming some dependencies:
    exclude: ["dist", "node_modules"],
    alias: {
      "@": resolve(__dirname, "src"), // Adjust the path as needed
    },
  },
})
