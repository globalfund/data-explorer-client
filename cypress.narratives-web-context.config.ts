import { defineConfig } from "cypress";
import baseConfig from "./cypress.narratives.config";

// Requires a Vite instance started with VITE_HIGHLIGHT_WEB_CONTEXT=true (local review only).
export default defineConfig({
  ...baseConfig,
  expose: { ...baseConfig.expose, highlight_web_context: true },
});
