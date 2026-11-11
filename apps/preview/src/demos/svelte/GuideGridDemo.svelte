<script lang="ts">
  import { GuideGrid, GuideCell } from "@rblez-ui/svelte";
</script>

<div class="demo-gg">
  <GuideGrid columns={{ sm: 2, md: 3 }} rowHeight={96} cross>
    {#each [1, 2, 3, 4, 5, 6] as n (n)}<GuideCell>{n}</GuideCell>{/each}
  </GuideGrid>

  <GuideGrid columns={3} rowHeight={96}>
    <GuideCell colSpan={2} solid cross>1 + 2</GuideCell>
    <GuideCell>3</GuideCell>
    <GuideCell>4</GuideCell>
    <GuideCell colSpan={2} solid>5 + 6</GuideCell>
  </GuideGrid>

  <GuideGrid columns={1} rowHeight={120} dashed cross>
    <GuideCell>Contenido aquí</GuideCell>
  </GuideGrid>
</div>
