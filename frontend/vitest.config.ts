import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    exclude: ["**/node_modules/**", "**/e2e/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "next/image": path.resolve(__dirname, "./__tests__/__mocks__/next-image.tsx"),
      "next/link": path.resolve(__dirname, "./__tests__/__mocks__/next-link.tsx"),
    },
  },
});
