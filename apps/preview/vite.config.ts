import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// Se sirve en www.rblez.com/designs/ y en rblez.github.io/designs/
export default defineConfig({
  base: "/designs/",
  plugins: [svelte(), react({ include: /\.tsx$/ })],
});
