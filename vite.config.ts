import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      api: new URL("./src/api", import.meta.url).pathname,
      app: new URL("./src/app", import.meta.url).pathname,
      components: new URL("./src/components", import.meta.url).pathname,
      constants: new URL("./src/constants", import.meta.url).pathname,
      hooks: new URL("./src/hooks", import.meta.url).pathname,
      models: new URL("./src/models", import.meta.url).pathname,
      styles: new URL("./src/styles", import.meta.url).pathname,
      utils: new URL("./src/utils", import.meta.url).pathname,
    },
  },
  plugins: [react()],
});
