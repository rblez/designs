<script lang="ts">
  import { icons, type IonIcon, type IconName, type IconVariant } from "@rblez-ui/tokens";
  let { name, icon, variant = "line", size = 16, strokeWidth, label, class: className = "d-icon" }: {
    /** Icono del set curado. */ name?: IconName;
    /** Cualquier Ionicon: import { camera } from "@rblez-ui/tokens/ionicons". */ icon?: IonIcon;
    variant?: IconVariant; size?: number; /** Grosor de línea en px a 24 px. */ strokeWidth?: number; label?: string; class?: string;
  } = $props();
  const src = $derived((icon ?? (name ? icons[name] : undefined)) as IonIcon | undefined);
  const node = $derived(src ? (variant === "fill" ? src.s : src.o) : []);
  // Ionicons dibuja en 512: 32 = 1.5 px a 24. A tamaños pequeños, algo más grueso.
  const sw = $derived(((strokeWidth ?? (size <= 16 ? 1.75 : 1.5)) * 512) / 24);
</script>

<svg class={className} data-variant={variant} viewBox="0 0 512 512" width={size} height={size} fill="currentColor"
  stroke-width={sw} stroke-linecap="round" stroke-linejoin="round" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : "true"}>
  {#each node as [tag, attrs], i (i)}<svelte:element this={tag} {...attrs} />{/each}
</svg>
