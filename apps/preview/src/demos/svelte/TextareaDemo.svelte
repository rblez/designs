<script lang="ts">
  import { Textarea } from "@designs/svelte";
  let bio = $state("");
</script>

<div class="demo-stack">
  <Textarea label="Bio" placeholder="Cuéntanos sobre ti" bind:value={bio} hint={`${bio.length}/160`} maxlength={160} />
</div>
