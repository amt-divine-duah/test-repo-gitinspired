import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  clearMocks: true,
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["./src/singleton.ts"],
  setupFiles: ["./src/tests/test.setup.ts"],
  globalSetup: "./src/tests/test.globalSetup.ts",
};
export default config;
