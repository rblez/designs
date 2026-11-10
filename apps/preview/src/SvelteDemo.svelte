<script lang="ts">
  import { Button } from "@designs/svelte";
  let count = $state(0);
</script>

<div class="row">
  <Button onclick={() => count++}>Clicks: {count}</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button disabled>Disabled</Button>
</div>
<div class="row">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>
