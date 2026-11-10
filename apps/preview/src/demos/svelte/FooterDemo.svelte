<script lang="ts">
  import { Footer } from "@rblez-ui/svelte";
  import { columns, legal } from "../footerData";
</script>

<Footer {columns} {legal}>
  {#snippet logo()}<img src="./isotipo.svg" alt="" class="demo-logo" />{/snippet}
</Footer>
