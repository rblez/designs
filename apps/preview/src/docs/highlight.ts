import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

let hl: Promise<HighlighterCore> | null = null;
const get = () =>
  (hl ??= createHighlighterCore({
    themes: [import("shiki/themes/github-light-default.mjs"), import("shiki/themes/vitesse-dark.mjs")],
    langs: [import("shiki/langs/svelte.mjs"), import("shiki/langs/tsx.mjs"), import("shiki/langs/typescript.mjs"), import("shiki/langs/bash.mjs")],
    engine: createJavaScriptRegexEngine(),
  }));

const cache = new Map<string, string>();
export async function highlight(code: string, lang: string): Promise<string> {
  const key = lang + "\u0000" + code;
  const hit = cache.get(key);
  if (hit) return hit;
  const h = await get();
  const html = h.codeToHtml(code, {
    lang: lang === "ts" ? "typescript" : lang === "html" ? "svelte" : lang, // HTML va con la gramática de Svelte
    themes: { light: "github-light-default", dark: "vitesse-dark" },
    defaultColor: false,
  });
  cache.set(key, html);
  return html;
}
