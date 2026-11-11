import { createElement, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cx, guideGridVars, guideCellVars, type GuideColumns } from "@rblez-ui/tokens";

export interface GuideGridProps extends HTMLAttributes<HTMLElement> {
  /** Columnas fijas, o { sm, md, lg } por ancho del contenedor (< 640 · 640 · 960px). */
  columns?: number | GuideColumns;
  /** Alto mínimo de cada fila. */
  rowHeight?: number | string;
  /** Guías discontinuas. */
  dashed?: boolean;
  hideRowGuides?: boolean;
  hideColumnGuides?: boolean;
  /** Cruces en las esquinas superior izquierda e inferior derecha. */
  cross?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

export function GuideGrid({ columns = 3, rowHeight, dashed, hideRowGuides, hideColumnGuides, cross, as = "div", children, className, style, ...rest }: GuideGridProps) {
  return (
    <div className={cx("d-gg", className)} data-responsive={typeof columns === "object" || undefined} data-dashed={dashed || undefined} data-hide-rows={hideRowGuides || undefined} data-hide-cols={hideColumnGuides || undefined} style={{ ...(guideGridVars(columns, rowHeight) as CSSProperties), ...style }}>
      {createElement(as, { className: "d-gg__in", ...rest },
        cross ? <><span className="d-gg__x d-gg__x--tl" aria-hidden="true" /><span className="d-gg__x d-gg__x--br" aria-hidden="true" /></> : null,
        children)}
    </div>
  );
}

export interface GuideCellProps extends HTMLAttributes<HTMLElement> {
  colSpan?: number;
  rowSpan?: number;
  /** Fondo opaco que tapa las guías que cruza la celda. */
  solid?: boolean;
  /** Cruz en la esquina superior izquierda de la celda. */
  cross?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

export function GuideCell({ colSpan = 1, rowSpan = 1, solid, cross, as = "div", children, className, style, ...rest }: GuideCellProps) {
  return createElement(as, {
    className: cx("d-gg__cell", className), "data-solid": solid || undefined, "data-wide": colSpan > 1 || undefined,
    style: { ...(guideCellVars(colSpan, rowSpan) as CSSProperties), ...style }, ...rest,
  }, cross ? <span className="d-gg__x d-gg__x--tl" aria-hidden="true" /> : null, children);
}
