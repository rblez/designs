<script lang="ts">
  import type { Snippet } from "svelte";
  import { cx, type BadgeVariant } from "@designs/tokens";
  let { variant = "secondary", dot = false, children }: { variant?: BadgeVariant; dot?: boolean; children?: Snippet } = $props();
</script>

<span class={cx("d-badge", `d-badge--${variant}`)}>{#if dot}<span class="d-badge__dot"></span>{/if}{@render children?.()}</span>
