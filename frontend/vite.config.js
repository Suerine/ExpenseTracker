import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  build: {
    sourcemap: false, // Disabling sourcemaps can sometimes bypass eval requirements
  },
});
