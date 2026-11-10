<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { ButtonSize, ButtonVariant } from "@designs/tokens";

  interface Props extends HTMLButtonAttributes {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children?: Snippet;
  }

  let { variant = "solid", size = "md", class: className = "", children, ...rest }: Props = $props();
</script>

<button class={`d-btn d-btn--${variant} d-btn--${size} ${className}`.trim()} {...rest}>
  {@render children?.()}
</button>
