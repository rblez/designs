// Toasts y tokens de Toast para Patch (Figma y tests de estado).
import { brandOf, type Accent, type Theme } from '../accents.ts';
export type Variant = 'default' | 'success' | 'warning' | 'danger';
export type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type Toast = { id: string; variant: Variant; title: string; description?: string; action?: string; dismissible?: boolean };
export const palettes = {
  dark: { bg: '#14120b', surface: '#1b1913', surface2: '#23211a', line: '#edecec17', line2: '#edecec29', ink: '#edecec', ink2: '#c9c7c0', muted: '#edecec8c',
    status: { default: '#c9c7c0', success: '#3ecf8e', warning: '#f5a524', danger: '#ff6369' }, border: { default: '#edecec29', success: '#3ecf8e4d', warning: '#f5a52452', danger: '#ff636952' } },
  light: { bg: '#f7f7f4', surface: '#fcfcfa', surface2: '#efeee9', line: '#26251e1a', line2: '#26251e2e', ink: '#26251e', ink2: '#4d4b42', muted: '#26251e94',
    status: { default: '#4d4b42', success: '#1f8a3b', warning: '#c27c0e', danger: '#d9363e' }, border: { default: '#26251e2e', success: '#1f8a3b4d', warning: '#c27c0e52', danger: '#d9363e52' } }
} as const;

export type { Accent, Theme };
/** Paleta del tema con el acento aplicado (Toast solo lo usa en el anillo de foco y en la acción). */
export const palette = (theme: Theme, accent: Accent = 'orange') => ({ ...palettes[theme], ...brandOf(theme, accent) });
export const glyphs: Record<Variant, string> = { default: 'ⓘ', success: '✓', warning: '⚠', danger: '!' };
/** Los cuatro toasts de la demo, en orden de llegada. */
export const demo: Toast[] = [
  { id: 't1', variant: 'default', title: 'Cambios guardados', description: 'Tu perfil está al día.' },
  { id: 't2', variant: 'success', title: 'Desplegado', description: 'rblez-ui · producción', action: 'Ver' },
  { id: 't3', variant: 'warning', title: 'Cuota al 80%', description: 'Quedan 2 GB este mes.' },
  { id: 't4', variant: 'danger', title: 'Error al desplegar', description: 'Revisa los logs del build.' }
];
