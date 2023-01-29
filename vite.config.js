import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
  resolve: {
    alias: {
      // ...
      "simple-peer": "simple-peer/simplepeer.min.js",
    },
  },
});
