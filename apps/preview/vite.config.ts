import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { sharePages } from "./pages.plugin";

const pkg = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8"));
const commit = (process.env.GITHUB_SHA ?? (() => { try { return execSync("git rev-parse HEAD").toString(); } catch { return ""; } })()).trim().slice(0, 7);

// Se sirve en www.rblez.com/designs/ y en rblez.github.io/designs/
export default defineConfig({
  base: "/designs/",
  plugins: [svelte(), react({ include: /\.tsx$/ }), sharePages()],
  define: {
    __VERSION__: JSON.stringify(pkg.version),
    __COMMIT__: JSON.stringify(commit),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
});
