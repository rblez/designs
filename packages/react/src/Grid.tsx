import { createElement, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cx, gridVars, type GridCols, type GridVariant } from "@rblez-ui/tokens";

export interface GridProps extends HTMLAttributes<HTMLElement> {
  /** auto-fit · auto-fill (ancho mínimo) · columns (por breakpoint) · masonry · bento · split. */
  variant?: GridVariant;
  /** Columnas fijas o por breakpoint del contenedor: { base, sm, md, lg, xl }. */
  cols?: number | GridCols;
  /** Ancho mínimo de cada item en auto-fit / auto-fill. */
  min?: number | string;
  gap?: number | string;
  /** Ancho de la columna lateral en split. */
  sidebar?: number | string;
  /** Lado de la columna lateral en split. */
  side?: "start" | "end";
  /** Alto mínimo de fila en bento. */
  rowHeight?: number | string;
  as?: ElementType;
  children?: ReactNode;
}

export function Grid({ variant = "auto-fit", cols, min, gap, sidebar, side = "start", rowHeight, as = "div", children, className, style, ...rest }: GridProps) {
  const vars = gridVars({ variant, cols, min, gap, sidebar, rowHeight }) as CSSProperties;
  return (
    <div className={cx("d-grid", `d-grid--${variant}`, className)} data-side={variant === "split" ? side : undefined} style={{ ...vars, ...style }}>
      {createElement(as, { className: "d-grid__in", ...rest }, children)}
    </div>
  );
}
