<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cx, guideCellVars, styleString } from "@rblez-ui/tokens";

  interface Props extends HTMLAttributes<HTMLElement> {
    colSpan?: number;
    rowSpan?: number;
    /** Fondo opaco que tapa las guías que cruza la celda. */
    solid?: boolean;
    /** Cruz en la esquina superior izquierda de la celda. */
    cross?: boolean;
    as?: string;
    children?: Snippet;
  }
  let { colSpan = 1, rowSpan = 1, solid = false, cross = false, as = "div", children, class: className = "", style, ...rest }: Props = $props();
  const vars = $derived(styleString(guideCellVars(colSpan, rowSpan)));
</script>

<svelte:element this={as} class={cx("d-gg__cell", className as string)} data-solid={solid || undefined} data-wide={colSpan > 1 || undefined} style={style ? `${vars}; ${style}` : vars} {...rest}>
  {#if cross}<span class="d-gg__x d-gg__x--tl" aria-hidden="true"></span>{/if}
  {@render children?.()}
</svelte:element>
