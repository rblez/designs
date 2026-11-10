// Opciones y tokens de Select para Patch (Figma y tests de estado).
import { brandOf, type Accent, type Theme } from '../accents.ts';
export type Option = { value: string; label: string; disabled?: boolean; glyph?: string };
export const palettes = {
  dark: { bg: '#14120b', surface: '#1b1913', surface2: '#23211a', line: '#edecec17', line2: '#edecec29', hover: '#edecec0f', ink: '#edecec', ink2: '#c9c7c0', muted: '#edecec8c', red: '#ff6369', redRing: '#ff636938' },
  light: { bg: '#f7f7f4', surface: '#fcfcfa', surface2: '#efeee9', line: '#26251e1a', line2: '#26251e2e', hover: '#26251e0d', ink: '#26251e', ink2: '#4d4b42', muted: '#26251e94', red: '#d9363e', redRing: '#d9363e38' }
} as const;

export type { Accent, Theme };
/** Paleta del tema con el acento aplicado (orange por defecto). */
export const palette = (theme: Theme, accent: Accent = 'orange') => ({ ...palettes[theme], ...brandOf(theme, accent) });
export const regions: Option[] = [
  { value: 'mad', label: 'Madrid (eu-south)', glyph: '◍' },
  { value: 'fra', label: 'Frankfurt (eu-central)', glyph: '◍' },
  { value: 'iad', label: 'Virginia (us-east)', glyph: '◍' },
  { value: 'sfo', label: 'San Francisco (us-west)', glyph: '◍' },
  { value: 'gru', label: 'São Paulo (sa-east)', glyph: '◍', disabled: true }
];
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
/** Igual que matchOption de @rblez-ui/tokens: sin mayúsculas ni tildes. */
export const match = (o: Option, q: string) => norm(o.label).includes(norm(q.trim()));
