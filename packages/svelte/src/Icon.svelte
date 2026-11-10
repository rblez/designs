<script lang="ts">
  import { icons, type IconName } from "@rblez-ui/tokens";
  let { name, class: className = "d-prompt__icon" }: { name: IconName; class?: string } = $props();
  const icon = $derived(icons[name]);
</script>

<svg class={className} viewBox={icon.viewBox} aria-hidden="true"
  fill={icon.stroke ? "none" : "currentColor"} stroke={icon.stroke ? "currentColor" : "none"}
  stroke-width={icon.stroke ? 1.5 : undefined} stroke-linecap="round" stroke-linejoin="round">
  <path d={icon.d} />
</svg>
