<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cx, skeletonVars, styleString, type SkeletonShape } from "@rblez-ui/tokens";

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    width?: number | string;
    height?: number | string;
    shape?: SkeletonShape;
    /** Brillo animado. */
    animated?: boolean;
    /** false muestra el contenido real (children) en lugar del esqueleto. */
    show?: boolean;
    children?: Snippet;
  }
  let { width, height, shape = "rounded", animated = true, show = true, children, class: className = "", style, ...rest }: Props = $props();
  const vars = $derived(styleString(skeletonVars(width, height)));
</script>

{#if show || !children}
  <span class={cx("d-skel", className as string)} data-shape={shape === "rounded" ? undefined : shape} data-static={!animated || undefined} aria-hidden="true" style={style ? `${vars}; ${style}` : vars} {...rest}></span>
{:else}
  {@render children()}
{/if}
