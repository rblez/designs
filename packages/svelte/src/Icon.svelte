<script lang="ts">
  import { icons, type HeroIcon, type IconName, type IconNode, type IconVariant } from "@rblez-ui/tokens";
  let { name, icon, variant = "line", size = 16, strokeWidth, label, class: className = "d-icon" }: {
    /** Icono del set curado. */ name?: IconName;
    /** Cualquier Heroicon: import { camera } from "@rblez-ui/tokens/heroicons". */ icon?: HeroIcon;
    variant?: IconVariant; size?: number; strokeWidth?: number; label?: string; class?: string;
  } = $props();
  const src = $derived((icon ?? (name ? icons[name] : undefined)) as HeroIcon | undefined);
  // Relleno: micro (16) y mini (20) a tamaños pequeños, solid (24) a partir de ahí.
  const pick = $derived.by((): [IconNode, number] => {
    if (!src) return [[], 24];
    if (variant === "line") return [src.o, 24];
    if (size <= 16 && src.u) return [src.u, 16];
    if (size <= 20 && src.m) return [src.m, 20];
    return [src.s, 24];
  });
  const sw = $derived(strokeWidth ?? (size <= 16 ? 2 : 1.5));
</script>

<svg class={className} data-variant={variant} viewBox={`0 0 ${pick[1]} ${pick[1]}`} width={size} height={size}
  fill={variant === "fill" ? "currentColor" : "none"} stroke={variant === "line" ? "currentColor" : undefined} stroke-width={variant === "line" ? sw : undefined}
  stroke-linecap="round" stroke-linejoin="round" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : "true"}>
  {#each pick[0] as [tag, attrs], i (i)}<svelte:element this={tag} {...attrs} />{/each}
</svg>
