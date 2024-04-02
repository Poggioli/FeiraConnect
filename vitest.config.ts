/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      coverage: {
        exclude: [
          "src/components/ui/**/*",
          "src/**/index.ts",
          "src/main.tsx",
          "src/lib/utils.ts",
          "src/routeTree.gen.ts",
          ".eslintrc.cjs",
          "plopfile.js",
          "postcss.config.js",
          "tailwind.config.js",
          "src/services/api.ts"
        ],
      },
    },
  })
);
