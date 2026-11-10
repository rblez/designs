import { setAccent, setNeutral, isAccentPreset, NEUTRAL_PRESETS, type AccentPreset, type NeutralPreset } from "@rblez-ui/tokens";

/** Acento y neutros de la docs, guardados en localStorage (index.html los aplica antes de pintar). */
const HEX = /^#[0-9a-f]{6}$/i;
const readAccent = (): AccentPreset | string => {
  const v = localStorage.getItem("d-accent") ?? "orange";
  return isAccentPreset(v) || HEX.test(v) ? v : "orange";
};
const readNeutral = (): NeutralPreset => {
  const v = localStorage.getItem("d-neutral");
  return (NEUTRAL_PRESETS as readonly string[]).includes(v ?? "") ? (v as NeutralPreset) : "cream";
};

export const look = $state<{ accent: AccentPreset | string; neutral: NeutralPreset }>({ accent: readAccent(), neutral: readNeutral() });

export function pickAccent(v: AccentPreset | string) {
  look.accent = v;
  setAccent(v === "orange" ? null : v);
  if (v === "orange") localStorage.removeItem("d-accent"); else localStorage.setItem("d-accent", v);
}
export function pickNeutral(n: NeutralPreset) {
  look.neutral = n;
  setNeutral(n === "cream" ? null : n);
  if (n === "cream") localStorage.removeItem("d-neutral"); else localStorage.setItem("d-neutral", n);
}
