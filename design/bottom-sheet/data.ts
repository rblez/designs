// Tokens y contenido de BottomSheet para Patch (Figma y tests de estado).
import { brandOf, type Accent, type Theme } from '../accents.ts';
export const palettes = {
  dark: { bg: '#14120b', surface: '#1b1913', surface2: '#23211a', line: '#edecec17', line2: '#edecec29', ink: '#edecec', muted: '#edecec8c', scrim: '#00000099', off: '#edecec29' },
  light: { bg: '#f7f7f4', surface: '#fcfcfa', surface2: '#efeee9', line: '#26251e1a', line2: '#26251e2e', ink: '#26251e', muted: '#26251e94', scrim: '#26251e61', off: '#26251e2e' }
} as const;

export type { Accent, Theme };
/** Paleta del tema con el acento aplicado (orange por defecto). */
export const palette = (theme: Theme, accent: Accent = 'orange') => ({ ...palettes[theme], ...brandOf(theme, accent) });
/** Puntos de anclaje de la demo, en fracción del viewport. */
export const snapPoints = [0.45, 0.9];
export type Setting = { id: string; label: string; on: boolean };
export const settings: Setting[] = [
  { id: 'notifications', label: 'Notificaciones', on: true },
  { id: 'airplane', label: 'Modo avión', on: false },
  { id: 'data', label: 'Ahorro de datos', on: false }
];
