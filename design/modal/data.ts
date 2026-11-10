// Tokens de Modal para Patch (Figma y tests de estado).
export type Size = 'sm' | 'md' | 'lg';
export const widths: Record<Size, number> = { sm: 380, md: 480, lg: 720 };
export const palettes = {
  dark: { bg: '#14120b', surface: '#1b1913', surface2: '#23211a', line: '#edecec17', line2: '#edecec29', ink: '#edecec', ink2: '#c9c7c0', muted: '#edecec8c', scrim: '#00000099', brand: '#ff6a1f', brandInk: '#14120b', ring: '#ff6a1f59' },
  light: { bg: '#f7f7f4', surface: '#fcfcfa', surface2: '#efeee9', line: '#26251e1a', line2: '#26251e2e', ink: '#26251e', ink2: '#4d4b42', muted: '#26251e94', scrim: '#26251e61', brand: '#f54e00', brandInk: '#ffffff', ring: '#f54e0047' }
} as const;
