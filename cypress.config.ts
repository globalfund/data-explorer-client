import { defineConfig } from "cypress";

require("dotenv").config();

export default defineConfig({
  projectId: "ioki3q",
  viewportHeight: 820,
  viewportWidth: 1440,
  e2e: {
    env: {
      api_url: process.env.VITE_API,
    },
    baseUrl: process.env.VITE_BASE_URL,
  },
});
