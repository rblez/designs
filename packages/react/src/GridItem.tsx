import { createElement, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "@rblez-ui/tokens";

export interface GridItemProps extends HTMLAttributes<HTMLElement> {
  /** Columnas que ocupa (bento / columns). Por debajo de 768px los spans > 1 ocupan la fila entera. */
  colSpan?: number;
  /** Filas que ocupa (bento). */
  rowSpan?: number;
  as?: ElementType;
  children?: ReactNode;
}

export function GridItem({ colSpan = 1, rowSpan = 1, as = "div", children, className, style, ...rest }: GridItemProps) {
  const vars = { "--d-gi-col": Math.max(1, colSpan), "--d-gi-row": Math.max(1, rowSpan) } as CSSProperties;
  return createElement(as, { className: cx("d-grid__item", className), "data-wide": colSpan > 1 || undefined, style: { ...vars, ...style }, ...rest }, children);
}
