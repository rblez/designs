// Acentos de rblez-ui para las versiones Patch: mismos presets que packages/tokens/src/tokens.css.
// brandInk y brandText son lo que calcula tokens.css con oklch relativo (tinta ≥ 4.5:1, texto legible sobre el fondo).
export type Accent = 'orange' | 'blue' | 'violet' | 'green' | 'rose' | 'amber' | 'teal' | 'ink';
export type Theme = 'dark' | 'light';
type Brand = { brand: string; brandInk: string; brandText: string };

export const accents: Record<Accent, Record<Theme, Brand>> = {
  orange: { light: { brand: '#f54e00', brandInk: '#150a07', brandText: '#db3200' }, dark: { brand: '#ff6a1f', brandInk: '#150a07', brandText: '#ff7028' } },
  blue: { light: { brand: '#2563eb', brandInk: '#ffffff', brandText: '#2563eb' }, dark: { brand: '#5b9bff', brandInk: '#080d16', brandText: '#63a4ff' } },
  violet: { light: { brand: '#7c3aed', brandInk: '#ffffff', brandText: '#7c3aed' }, dark: { brand: '#a78bfa', brandInk: '#0e0c15', brandText: '#aa8efe' } },
  green: { light: { brand: '#15803d', brandInk: '#ffffff', brandText: '#15803d' }, dark: { brand: '#4ade80', brandInk: '#071009', brandText: '#4ade80' } },
  rose: { light: { brand: '#e11d48', brandInk: '#ffffff', brandText: '#df1946' }, dark: { brand: '#fb7185', brandInk: '#150a0b', brandText: '#fb7185' } },
  amber: { light: { brand: '#d97706', brandInk: '#140b05', brandText: '#bc5c00' }, dark: { brand: '#fbbf24', brandInk: '#110d04', brandText: '#fbbf24' } },
  teal: { light: { brand: '#0f766e', brandInk: '#ffffff', brandText: '#0f766e' }, dark: { brand: '#2dd4bf', brandInk: '#04100e', brandText: '#2dd4bf' } },
  ink: { light: { brand: '#26251e', brandInk: '#ffffff', brandText: '#26251e' }, dark: { brand: '#edecec', brandInk: '#150a0a', brandText: '#edecec' } }
};

/** Colores derivados del acento, como --d-brand-soft (14 %), --d-ring (30 % / 38 %) y el fondo tintado de las demos (12 %). */
export function brandOf(theme: Theme, accent: Accent) {
  const b = accents[accent][theme];
  return { ...b, brandSoft: `${b.brand}24`, brandBg: `${b.brand}1f`, ring: `${b.brand}${theme === 'dark' ? '61' : '4d'}` };
}
