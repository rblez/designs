import type { Plugin } from "vite";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

export interface PageMeta { slug: string; name: string; description: string; descriptionEn: string; group?: string }

const SITE = "https://www.rblez.com/designs/";
const GUIDES: PageMeta[] = [
  { group: "Docs", slug: "instalacion", name: "Instalación", description: "Cómo instalar rblez-ui en Svelte 5 y React.", descriptionEn: "How to install rblez-ui in Svelte 5 and React." },
  { group: "Docs", slug: "tokens", name: "Tokens", description: "Color, tipografía y tema de rblez-ui.", descriptionEn: "rblez-ui color, typography and theming." },
  { group: "Docs", slug: "licencia", name: "Licencia", description: "Licencia de rblez-ui.", descriptionEn: "rblez-ui license." },
  { group: "Docs", slug: "acerca", name: "Acerca de", description: "Qué es rblez-ui y quién lo hace.", descriptionEn: "What rblez-ui is and who makes it." },
];

/** Lee slug, nombre y descripción de cada componente desde el registro de las docs. */
export function readPages(root: string): PageMeta[] {
  const reg = readFileSync(resolve(root, "src/docs/registry.ts"), "utf8");
  const en = readFileSync(resolve(root, "src/docs/i18n.svelte.ts"), "utf8");
  const out: PageMeta[] = [];
  for (const m of reg.matchAll(/slug: "([^"]+)", name: "([^"]+)", group: "([^"]+)"[\s\S]*?description: "([^"]+)"/g)) {
    const [, slug, name, group, description] = m;
    const e = en.match(new RegExp(`"?${slug.replace(/-/g, "\\-")}"?: \\{ description: "([^"]+)"`));
    out.push({ slug, name, group, description, descriptionEn: e?.[1] ?? description });
  }
  return [...out, ...GUIDES];
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Tras el build, escribe /<slug>/index.html con sus propias etiquetas para compartir. */
export function sharePages(): Plugin {
  let root = ""; let outDir = "";
  return {
    name: "rblez-share-pages", apply: "build",
    configResolved(c) { root = c.root; outDir = resolve(c.root, c.build.outDir); },
    closeBundle() {
      const html = readFileSync(resolve(outDir, "index.html"), "utf8");
      const pages = readPages(root);
      for (const p of pages) {
        const url = `${SITE}${p.slug}/`;
        const img = existsSync(resolve(root, `public/og/${p.slug}.png`)) ? `${SITE}og/${p.slug}.png` : `${SITE}og.png`;
        const title = `${p.name} · rblez-ui`;
        const page = html
          .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
          .replace(/(name="description" content=")[^"]*/, `$1${esc(p.description)}`)
          .replace(/(rel="canonical" href=")[^"]*/, `$1${url}`)
          .replace(/(property="og:title" content=")[^"]*/, `$1${esc(title)}`)
          .replace(/(name="twitter:title" content=")[^"]*/, `$1${esc(title)}`)
          .replace(/(property="og:description" content=")[^"]*/, `$1${esc(p.descriptionEn)}`)
          .replace(/(name="twitter:description" content=")[^"]*/, `$1${esc(p.descriptionEn)}`)
          .replace(/(property="og:url" content=")[^"]*/, `$1${url}`)
          .replace(/(property="og:image" content=")[^"]*/, `$1${img}`)
          .replace(/(name="twitter:image" content=")[^"]*/, `$1${img}`)
          .replace(/(property="og:image:alt" content=")[^"]*/, `$1${esc(title)}`);
        mkdirSync(resolve(outDir, p.slug), { recursive: true });
        writeFileSync(resolve(outDir, p.slug, "index.html"), page);
        if (!GUIDES.some((g) => g.slug === p.slug)) {
          mkdirSync(resolve(outDir, p.slug, "preview"), { recursive: true });
          writeFileSync(resolve(outDir, p.slug, "preview", "index.html"), page.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.name)} · Preview · rblez-ui</title>`));
        }
      }
      writeFileSync(resolve(outDir, "404.html"), html);
      writeFileSync(resolve(outDir, "pages.json"), JSON.stringify(pages, null, 1));
    },
  };
}
