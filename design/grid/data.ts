// Datos y layout de Grid para Patch (Figma y tests de estado).
// Patch no tiene CSS grid: el layout se calcula aquí con las mismas reglas que
// .d-grid en components.css (breakpoints de contenedor 480 / 768 / 1024 / 1280).
export type Variant = 'auto-fit' | 'auto-fill' | 'columns' | 'masonry' | 'bento' | 'split';
export type Cols = { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
export type Rect = { id: string; label: string; x: number; y: number; w: number; h: number; brand?: boolean };

export const palettes = {
  dark: { bg: '#14120b', surface: '#1c1a13', surface2: '#26231a', line: '#edecec14', line2: '#edecec29', ink: '#edecec', muted: '#edecec8c', brand: '#ff6a1f', brandBg: '#ff6a1f1f' },
  light: { bg: '#f7f7f4', surface: '#fcfcfa', surface2: '#efeee9', line: '#26251e1a', line2: '#26251e2e', ink: '#26251e', muted: '#26251e94', brand: '#f54e00', brandBg: '#f54e001f' }
} as const;

const BPS = [['xl', 1280], ['lg', 1024], ['md', 768], ['sm', 480]] as const;
export function colsAt(width: number, cols: Cols): number {
  const filled: Required<Cols> = { base: 1, sm: 1, md: 1, lg: 1, xl: 1 };
  let last = 1;
  for (const k of ['base', 'sm', 'md', 'lg', 'xl'] as const) { last = cols[k] ?? last; filled[k] = last; }
  for (const [k, min] of BPS) if (width >= min) return filled[k];
  return filled.base;
}

/** Rejilla regular: n columnas iguales, filas de alto fijo. */
function regular(width: number, n: number, gap: number, items: { label: string; h: number }[]): Rect[] {
  const w = (width - gap * (n - 1)) / n;
  return items.map((it, i) => ({ id: `t${i}`, label: it.label, x: (i % n) * (w + gap), y: Math.floor(i / n) * (it.h + gap), w, h: it.h }));
}

const tiles = (n: number, label: (i: number) => string, h = 64) => Array.from({ length: n }, (_, i) => ({ label: label(i), h }));
const masonryHeights = [64, 112, 80, 136, 72, 96];
const bentoItems = [
  { label: '2 × 2', c: 2, r: 2, brand: true }, { label: '2 × 1', c: 2, r: 1 }, { label: '1', c: 1, r: 1 },
  { label: '1', c: 1, r: 1 }, { label: '3 × 1', c: 3, r: 1 }, { label: '1', c: 1, r: 1 }
];

/** Rectángulos de la demo de cada variante para un contenedor de `width` px. */
export function layout(variant: Variant, width: number, gap = 12): Rect[] {
  if (variant === 'auto-fit' || variant === 'auto-fill') {
    const min = 140;
    const n = Math.max(1, Math.floor((width + gap) / (Math.min(min, width) + gap)));
    const count = 6;
    // auto-fit estira las columnas existentes; auto-fill reserva las vacías
    return regular(width, variant === 'auto-fit' ? Math.min(n, count) : n, gap, tiles(count, (i) => `min 140px · ${i + 1}`));
  }
  if (variant === 'columns') return regular(width, colsAt(width, { base: 1, sm: 2, md: 3 }), gap, tiles(6, (i) => `1 · 2 · 3 col · ${i + 1}`));
  if (variant === 'masonry') {
    const n = colsAt(width, { base: 2, md: 3 });
    const w = (width - gap * (n - 1)) / n;
    const per = Math.ceil(masonryHeights.length / n);
    return masonryHeights.map((h, i) => {
      const col = Math.floor(i / per), row = i % per;
      const y = masonryHeights.slice(col * per, col * per + row).reduce((a, b) => a + b + gap, 0);
      return { id: `t${i}`, label: String(i + 1), x: col * (w + gap), y, w, h };
    });
  }
  if (variant === 'split') {
    if (width < 768) return [{ id: 'side', label: 'Sidebar 200px', x: 0, y: 0, w: width, h: 64 }, { id: 'main', label: 'Contenido', x: 0, y: 64 + gap, w: width, h: 180 }];
    return [{ id: 'side', label: 'Sidebar 200px', x: 0, y: 0, w: 200, h: 180 }, { id: 'main', label: 'Contenido', x: 200 + gap, y: 0, w: width - 200 - gap, h: 180 }];
  }
  // bento: empaquetado denso; por debajo de md los spans > 1 ocupan la fila entera
  const n = colsAt(width, { base: 2, md: 4 });
  const row = 88, w = (width - gap * (n - 1)) / n;
  const grid: boolean[][] = [];
  const free = (r: number, c: number, cs: number, rs: number) => {
    if (c + cs > n) return false;
    for (let y = r; y < r + rs; y++) for (let x = c; x < c + cs; x++) if (grid[y]?.[x]) return false;
    return true;
  };
  return bentoItems.map((it, i) => {
    const cs = width < 768 && it.c > 1 ? n : Math.min(it.c, n), rs = it.r;
    let r = 0, c = 0;
    for (;; r++) { c = Array.from({ length: n }, (_, k) => k).find((k) => free(r, k, cs, rs)) ?? -1; if (c >= 0) break; }
    for (let y = r; y < r + rs; y++) { grid[y] ??= []; for (let x = c; x < c + cs; x++) grid[y][x] = true; }
    return { id: `t${i}`, label: it.label, x: c * (w + gap), y: r * (row + gap), w: cs * w + (cs - 1) * gap, h: rs * row + (rs - 1) * gap, brand: it.brand };
  });
}
