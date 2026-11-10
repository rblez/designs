<script lang="ts">
  import { Button, Grid, GridItem } from "@rblez-ui/svelte";
  import type { GridVariant } from "@rblez-ui/tokens";
  const variants: GridVariant[] = ["bento", "auto-fit", "columns", "masonry", "split"];
  let variant = $state<GridVariant>("bento");
  const heights = [64, 112, 80, 136, 72, 96];
</script>

<div class="demo-grid">
  <div class="demo-row" role="group" aria-label="Tipo de grid">
    {#each variants as v (v)}
      <Button size="sm" variant={v === variant ? "solid" : "outline"} aria-pressed={v === variant} onclick={() => (variant = v)}>{v}</Button>
    {/each}
  </div>

  {#if variant === "bento"}
    <Grid variant="bento" cols={{ base: 2, md: 4 }} rowHeight={88} gap={12}>
      <GridItem colSpan={2} rowSpan={2} class="demo-tile demo-tile--brand">2 × 2</GridItem>
      <GridItem colSpan={2} class="demo-tile">2 × 1</GridItem>
      <GridItem class="demo-tile">1</GridItem>
      <GridItem class="demo-tile">1</GridItem>
      <GridItem colSpan={3} class="demo-tile">3 × 1</GridItem>
      <GridItem class="demo-tile">1</GridItem>
    </Grid>
  {:else if variant === "auto-fit"}
    <Grid min={140} gap={12}>
      {#each Array(6) as _, i (i)}<div class="demo-tile">min 140px · {i + 1}</div>{/each}
    </Grid>
  {:else if variant === "columns"}
    <Grid variant="columns" cols={{ base: 1, sm: 2, md: 3 }} gap={12}>
      {#each Array(6) as _, i (i)}<div class="demo-tile">1 · 2 · 3 col · {i + 1}</div>{/each}
    </Grid>
  {:else if variant === "masonry"}
    <Grid variant="masonry" cols={{ base: 2, md: 3 }} gap={12}>
      {#each heights as h, i (i)}<div class="demo-tile" style:height="{h}px">{i + 1}</div>{/each}
    </Grid>
  {:else}
    <Grid variant="split" sidebar={200} gap={12}>
      <aside class="demo-tile">Sidebar 200px</aside>
      <div class="demo-tile demo-tile--tall">Contenido</div>
    </Grid>
  {/if}
</div>
