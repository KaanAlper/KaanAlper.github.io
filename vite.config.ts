import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

/** GitHub Pages paths are case-sensitive. After the build, list every page the site serves (each .html file, and each
 * folder with an index.html) in case-paths.json, so 404.html can send /Promo/ByteForge to /promo/byteforge/. */
function casePaths(): Plugin {
  return {
    name: "case-paths",
    apply: "build",
    closeBundle() {
      const out = path.resolve(__dirname, "dist"), pages: string[] = [];
      const walk = (dir: string) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name), url = "/" + path.relative(out, full).split(path.sep).join("/");
          if (entry.isDirectory()) walk(full);
          else if (entry.name.endsWith(".html") && entry.name !== "404.html") {
            pages.push(url);
            if (entry.name === "index.html") pages.push(url.slice(0, -"index.html".length));
          }
        }
      };
      walk(out);
      fs.writeFileSync(path.join(out, "case-paths.json"), JSON.stringify(pages.sort()));
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), casePaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: true,
  },
});
