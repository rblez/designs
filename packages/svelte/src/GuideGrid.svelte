<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cx, guideGridVars, styleString, type GuideColumns } from "@rblez-ui/tokens";

  interface Props extends HTMLAttributes<HTMLElement> {
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
    as?: string;
    children?: Snippet;
  }
  let { columns = 3, rowHeight, dashed = false, hideRowGuides = false, hideColumnGuides = false, cross = false, as = "div", children, class: className = "", style, ...rest }: Props = $props();
  const vars = $derived(styleString(guideGridVars(columns, rowHeight)));
</script>

<div class={cx("d-gg", className as string)} data-responsive={typeof columns === "object" || undefined} data-dashed={dashed || undefined} data-hide-rows={hideRowGuides || undefined} data-hide-cols={hideColumnGuides || undefined} style={style ? `${vars}; ${style}` : vars}>
  <svelte:element this={as} class="d-gg__in" {...rest}>
    {#if cross}<span class="d-gg__x d-gg__x--tl" aria-hidden="true"></span><span class="d-gg__x d-gg__x--br" aria-hidden="true"></span>{/if}
    {@render children?.()}
  </svelte:element>
</div>
