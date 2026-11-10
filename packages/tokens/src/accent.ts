/**
 * Acento y neutros en tiempo de ejecución. Los valores viven en tokens.css; esto solo pone
 * data-accent / data-neutral y, para colores propios, --d-brand-l / --d-brand-d en línea.
 */
export const ACCENT_PRESETS = ["orange", "blue", "violet", "green", "rose", "amber", "teal", "ink"] as const;
export type AccentPreset = (typeof ACCENT_PRESETS)[number];
export const NEUTRAL_PRESETS = ["cream", "zinc", "slate"] as const;
export type NeutralPreset = (typeof NEUTRAL_PRESETS)[number];

/** Colores de cada preset (claro / oscuro), los mismos que tokens.css. Útil para pintar muestras. */
export const accentSwatches: Record<AccentPreset, { light: string; dark: string }> = {
  orange: { light: "#f54e00", dark: "#ff6a1f" },
  blue: { light: "#2563eb", dark: "#5b9bff" },
  violet: { light: "#7c3aed", dark: "#a78bfa" },
  green: { light: "#15803d", dark: "#4ade80" },
  rose: { light: "#e11d48", dark: "#fb7185" },
  amber: { light: "#d97706", dark: "#fbbf24" },
  teal: { light: "#0f766e", dark: "#2dd4bf" },
  ink: { light: "#26251e", dark: "#edecec" },
};

/** Un preset, cualquier color CSS (`"#0ea5e9"`, `"oklch(.6 .2 250)"`) o uno por tema. */
export type AccentValue = AccentPreset | string | { light: string; dark?: string };

export const isAccentPreset = (v: unknown): v is AccentPreset => typeof v === "string" && (ACCENT_PRESETS as readonly string[]).includes(v);

const INLINE = ["--d-brand", "--d-brand-l", "--d-brand-d", "--d-brand-ink"] as const;
const target = (el?: HTMLElement | null) => el ?? (typeof document !== "undefined" ? document.documentElement : null);

/**
 * Cambia el acento de `el` (por defecto <html>) y todo su subárbol.
 * `setAccent("blue")` · `setAccent("#0ea5e9")` · `setAccent({ light: "#0369a1", dark: "#38bdf8" })` · `setAccent(null)` vuelve al naranja.
 * La tinta sobre el acento (--d-brand-ink) se calcula sola; pásala en `ink` para forzarla.
 */
export function setAccent(accent: AccentValue | null, el?: HTMLElement | null, ink?: string): void {
  const node = target(el);
  if (!node) return;
  for (const p of INLINE) node.style.removeProperty(p);
  if (accent == null) { node.removeAttribute("data-accent"); return; }
  if (isAccentPreset(accent)) node.dataset.accent = accent;
  else {
    const { light, dark } = typeof accent === "string" ? { light: accent, dark: accent } : { light: accent.light, dark: accent.dark ?? accent.light };
    node.dataset.accent = "custom";
    node.style.setProperty("--d-brand-l", light);
    node.style.setProperty("--d-brand-d", dark);
  }
  if (ink) node.style.setProperty("--d-brand-ink", ink);
}

/** Lee el acento de `el`: un preset, `{ light, dark }` si es propio, o null (naranja por defecto). */
export function getAccent(el?: HTMLElement | null): AccentPreset | { light: string; dark: string } | null {
  const node = target(el);
  const a = node?.dataset.accent;
  if (!node || !a) return null;
  if (isAccentPreset(a)) return a;
  const light = node.style.getPropertyValue("--d-brand-l").trim(), dark = node.style.getPropertyValue("--d-brand-d").trim();
  return light ? { light, dark: dark || light } : null;
}

/** Cambia los neutros (fondo, superficies, tinta, líneas) de `el`. null vuelve a crema. */
export function setNeutral(neutral: NeutralPreset | null, el?: HTMLElement | null): void {
  const node = target(el);
  if (!node) return;
  if (neutral == null) node.removeAttribute("data-neutral");
  else node.dataset.neutral = neutral;
}
