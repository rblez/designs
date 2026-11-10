<script lang="ts">
  import { icons, type IconName } from "@rblez-ui/tokens";
  let { name, class: className = "d-icon", size }: { name: IconName; class?: string; size?: number } = $props();
  const icon = $derived(icons[name]);
</script>

<svg class={className} viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
  {#each icon.paths as p (p.d)}<path d={p.d} fill-rule={"evenodd" in p ? "evenodd" : undefined} clip-rule={"evenodd" in p ? "evenodd" : undefined} />{/each}
</svg>
