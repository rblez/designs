<script lang="ts">
  import type { Snippet } from "svelte";
  let { children }: { children?: Snippet } = $props();
</script>

<kbd class="d-kbd">{@render children?.()}</kbd>
