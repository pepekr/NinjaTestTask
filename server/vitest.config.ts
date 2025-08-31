import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [
      "src/**/*.test.ts",      // match tests inside src
      "tests/**/*.test.ts"     // keep root tests too
    ],
  },
});
