import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves the app from /MiyawakiForestPlanning/.
// Local dev and preview keep the root base path.
export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/MiyawakiForestPlanning/" : "/",
  plugins: [react()]
});
