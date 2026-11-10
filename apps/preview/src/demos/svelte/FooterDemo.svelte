<script lang="ts">
  import { Footer } from "@rblez-ui/svelte";
  import { columns, legal } from "../footerData";
</script>

<Footer {columns} {legal}>
  {#snippet logo()}<img src="/designs/isotipo.svg" alt="" class="demo-logo" />{/snippet}
</Footer>
