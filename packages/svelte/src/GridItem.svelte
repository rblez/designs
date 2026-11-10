<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cx } from "@rblez-ui/tokens";

  interface Props extends HTMLAttributes<HTMLElement> {
    /** Columnas que ocupa (bento / columns). Por debajo de 768px los spans > 1 ocupan la fila entera. */
    colSpan?: number;
    /** Filas que ocupa (bento). */
    rowSpan?: number;
    as?: string;
    children?: Snippet;
  }
  let { colSpan = 1, rowSpan = 1, as = "div", children, class: className = "", style, ...rest }: Props = $props();
  const vars = $derived(`--d-gi-col: ${Math.max(1, colSpan)}; --d-gi-row: ${Math.max(1, rowSpan)}`);
</script>

<svelte:element this={as} class={cx("d-grid__item", className as string)} data-wide={colSpan > 1 || undefined} style={style ? `${vars}; ${style}` : vars} {...rest}>{@render children?.()}</svelte:element>
