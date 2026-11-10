/** API compartida del PromptInput (clon del composer de bolt.new). */
export type PromptTheme = "light" | "dark" | "auto";
export interface PromptSubmit {
  value: string;
  plan: boolean;
  files: File[];
}
export const promptDefaults = {
  placeholder: "Let's build a prototype...",
  submitLabel: "Build now",
  planLabel: "Plan",
  minHeight: 84,
  maxHeight: 320,
} as const;
/** Frases del placeholder animado (efecto máquina de escribir). */
export const promptPlaceholders = [
  "Let's build a prototype...",
  "Let's build a dashboard...",
  "Let's build a landing page...",
  "Let's build a mobile app...",
] as const;

/** Typewriter: devuelve una función stop. Llama onText con el texto visible. */
export function typewriter(phrases: readonly string[], onText: (t: string) => void, speed = 45, hold = 1800): () => void {
  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    onText(phrases[0] ?? "");
    return () => {};
  }
  let i = 0, n = 0, dir = 1, timer: ReturnType<typeof setTimeout>;
  const tick = () => {
    const p = phrases[i % phrases.length]!;
    n += dir;
    onText(p.slice(0, n));
    if (dir === 1 && n >= p.length) { dir = -1; timer = setTimeout(tick, hold); return; }
    if (dir === -1 && n <= "Let's build ".length) { dir = 1; i++; }
    timer = setTimeout(tick, dir === 1 ? speed : speed / 2);
  };
  onText("");
  timer = setTimeout(tick, 300);
  return () => clearTimeout(timer);
}
