<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cx } from "@rblez-ui/tokens";

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** Diámetro de cada punto en px. */
    size?: number;
    /** Texto delante de los puntos (Guardando, Desplegando…). */
    children?: Snippet;
  }
  let { size = 4, children, class: className = "", style, ...rest }: Props = $props();
  const vars = $derived(`--ld: ${size}px`);
</script>

<span class={cx("d-load-dots", className as string)} aria-live="polite" style={style ? `${vars}; ${style}` : vars} {...rest}>
  {#if children}<span>{@render children()}</span>{/if}
  <span class="d-load-dots__d" aria-hidden="true"><i></i><i></i><i></i></span>
</span>
