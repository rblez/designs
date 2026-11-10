<script lang="ts">
  import type { SidebarSection } from "@designs/tokens";
  interface Props { sections: SidebarSection[]; active?: string; label?: string; onnavigate?: (href: string) => void; }
  let { sections, active, label = "Navegación", onnavigate }: Props = $props();
</script>

<nav class="d-sidebar" aria-label={label}>
  {#each sections as section (section.title)}
    <div class="d-sidebar__section">
      <p class="d-sidebar__title">{section.title}</p>
      {#each section.items as item (item.href)}
        <a class="d-sidebar__item" href={item.href} aria-current={item.href === active ? "page" : undefined}
          onclick={() => onnavigate?.(item.href)}>
          <span>{item.label}</span>
          {#if item.badge}<span class="d-badge d-badge--outline" style="height:18px;font-size:10px;padding:0 6px">{item.badge}</span>{/if}
        </a>
      {/each}
    </div>
  {/each}
</nav>
