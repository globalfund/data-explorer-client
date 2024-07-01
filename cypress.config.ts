import { defineConfig } from "cypress";

require("dotenv").config();

export default defineConfig({
  viewportHeight: 820,
  viewportWidth: 1440,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      api_url: process.env.REACT_APP_API,
    },
    baseUrl: process.env.REACT_APP_BASE_URL,
  },
});
