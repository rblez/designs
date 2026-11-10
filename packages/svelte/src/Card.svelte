<script lang="ts">
  import type { Snippet } from "svelte";
  let { title, description, children, footer }: { title?: string; description?: string; children?: Snippet; footer?: Snippet } = $props();
</script>

<div class="d-card">
  {#if title || description}
    <div class="d-card__header">
      {#if title}<h3 class="d-card__title">{title}</h3>{/if}
      {#if description}<p class="d-card__desc">{description}</p>{/if}
    </div>
  {/if}
  {#if children}<div class="d-card__body">{@render children()}</div>{/if}
  {#if footer}<div class="d-card__footer">{@render footer()}</div>{/if}
</div>
