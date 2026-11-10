// Tokens de Modal para Patch (Figma y tests de estado).
import { brandOf, type Accent, type Theme } from '../accents.ts';
export type Size = 'sm' | 'md' | 'lg';
export const widths: Record<Size, number> = { sm: 380, md: 480, lg: 720 };
export const palettes = {
  dark: { bg: '#14120b', surface: '#1b1913', surface2: '#23211a', line: '#edecec17', line2: '#edecec29', ink: '#edecec', ink2: '#c9c7c0', muted: '#edecec8c', scrim: '#00000099' },
  light: { bg: '#f7f7f4', surface: '#fcfcfa', surface2: '#efeee9', line: '#26251e1a', line2: '#26251e2e', ink: '#26251e', ink2: '#4d4b42', muted: '#26251e94', scrim: '#26251e61' }
} as const;

export type { Accent, Theme };
/** Paleta del tema con el acento aplicado (orange por defecto). */
export const palette = (theme: Theme, accent: Accent = 'orange') => ({ ...palettes[theme], ...brandOf(theme, accent) });
