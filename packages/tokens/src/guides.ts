/** GuideGrid (rejilla con guías estilo Geist) y loaders. */
export interface GuideColumns { sm?: number; md?: number; lg?: number }

const len = (v: number | string) => (typeof v === "number" ? `${v}px` : v);
const n = (v: number | undefined, d: number) => String(Math.max(1, Math.round(v ?? d)));

/** Variables CSS de GuideGrid. Un número fija las columnas; un objeto las cambia a 640 / 960px de ancho del contenedor. */
export function guideGridVars(columns: number | GuideColumns = 3, rowHeight?: number | string): Record<string, string> {
  const c = typeof columns === "number" ? { sm: columns, md: columns, lg: columns } : columns;
  const sm = c.sm ?? 1, md = c.md ?? sm, lg = c.lg ?? md;
  const v: Record<string, string> = { "--gg-sm": n(sm, 1), "--gg-md": n(md, 2), "--gg-lg": n(lg, 3) };
  if (rowHeight != null) v["--gg-h"] = len(rowHeight);
  return v;
}

export function guideCellVars(colSpan = 1, rowSpan = 1): Record<string, string> {
  return { "--gg-cs": n(colSpan, 1), "--gg-rs": n(rowSpan, 1) };
}

export type SkeletonShape = "rounded" | "pill" | "circle" | "square";
export function skeletonVars(width?: number | string, height?: number | string): Record<string, string> {
  const v: Record<string, string> = {};
  if (width != null) v["--sk-w"] = len(width);
  if (height != null) v["--sk-h"] = len(height);
  return v;
}
export const SPINNER_BARS = Array.from({ length: 12 }, (_, i) => i);
