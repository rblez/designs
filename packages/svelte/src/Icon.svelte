<script lang="ts">
  import { icons, type IconName, type IconNode, type IconVariant } from "@rblez-ui/tokens";
  let { name, icon, variant = "line", size = 16, strokeWidth, label, class: className = "d-icon" }: {
    /** Icono del set curado. */ name?: IconName;
    /** Cualquier icono de Lucide: import { Camera } from "lucide". */ icon?: IconNode;
    variant?: IconVariant; size?: number; strokeWidth?: number; label?: string; class?: string;
  } = $props();
  const node = $derived((icon ?? (name ? icons[name] : [])) as IconNode);
  const sw = $derived(strokeWidth ?? (size <= 16 ? 2.25 : 2));
</script>

<svg class={className} data-variant={variant} viewBox="0 0 24 24" width={size} height={size}
  fill={variant === "fill" ? "currentColor" : "none"} stroke="currentColor" stroke-width={sw}
  stroke-linecap="round" stroke-linejoin="round" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : "true"}>
  {#each node as [tag, attrs], i (i)}<svelte:element this={tag} {...attrs} />{/each}
</svg>
