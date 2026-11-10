<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cx, type ButtonSize, type ButtonVariant } from "@designs/tokens";

  interface Props extends HTMLButtonAttributes {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    children?: Snippet;
  }
  let { variant = "solid", size = "md", loading = false, disabled, class: className = "", type = "button", children, ...rest }: Props = $props();
</script>

<button {type} class={cx("d-btn", `d-btn--${variant}`, size !== "md" && `d-btn--${size}`, className as string)}
  disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
  {#if loading}<span class="d-spinner" aria-hidden="true"></span>{/if}
  {@render children?.()}
</button>
