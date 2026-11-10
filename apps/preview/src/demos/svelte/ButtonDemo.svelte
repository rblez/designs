<script lang="ts">
  import { Button } from "@rblez-ui/svelte";
  let loading = $state(false);
</script>

<div class="demo-row">
  <Button variant="brand">Build now</Button>
  <Button>Deploy</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Delete</Button>
  <Button {loading} onclick={() => { loading = true; setTimeout(() => (loading = false), 1500); }}>
    {loading ? "Saving" : "Save"}
  </Button>
</div>
