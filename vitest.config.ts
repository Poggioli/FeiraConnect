/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ["./__tests__/setup.ts"],
      globals: true,
      environment: "jsdom",
      coverage: {
        exclude: [
          "src/components/ui/**/*",
          "src/routes/**/*",
          "src/**/index.ts",
          "src/main.tsx",
          "src/lib/utils.ts",
          "src/routeTree.gen.ts",
          ".eslintrc.cjs",
          "plopfile.js",
          "postcss.config.js",
          "tailwind.config.js",
          "src/services/api.ts",
          "__tests__/**",
        ],
      },
    },
  })
);
