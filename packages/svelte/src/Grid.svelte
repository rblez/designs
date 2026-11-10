<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cx, gridVars, styleString, type GridCols, type GridVariant } from "@rblez-ui/tokens";

  interface Props extends HTMLAttributes<HTMLElement> {
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
    as?: string;
    children?: Snippet;
  }
  let { variant = "auto-fit", cols, min, gap, sidebar, side = "start", rowHeight, as = "div", children, class: className = "", style, ...rest }: Props = $props();
  const vars = $derived(styleString(gridVars({ variant, cols, min, gap, sidebar, rowHeight })));
</script>

<div class={cx("d-grid", `d-grid--${variant}`, className as string)} data-side={variant === "split" ? side : undefined} style={style ? `${vars}; ${style}` : vars}>
  <svelte:element this={as} class="d-grid__in" {...rest}>{@render children?.()}</svelte:element>
</div>
