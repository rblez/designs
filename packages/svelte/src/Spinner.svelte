<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cx, SPINNER_BARS } from "@rblez-ui/tokens";

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** Lado en px. */
    size?: number;
    /** Color CSS; por defecto el texto atenuado. */
    color?: string;
    /** Texto para lectores de pantalla. */
    label?: string;
  }
  let { size = 20, color, label = "Cargando", class: className = "", style, ...rest }: Props = $props();
  const vars = $derived(`--ls: ${size}px${color ? `; --ls-color: ${color}` : ""}`);
</script>

<span class={cx("d-load-spin", className as string)} role="status" aria-label={label} style={style ? `${vars}; ${style}` : vars} {...rest}>
  {#each SPINNER_BARS as i (i)}<i style={`--i: ${i}`} aria-hidden="true"></i>{/each}
</span>
