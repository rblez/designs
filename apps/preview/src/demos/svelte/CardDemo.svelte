<script lang="ts">
  import { Card, Button, Input } from "@designs/svelte";
</script>

<div class="demo-narrow">
  <Card title="Crear proyecto" description="Despliega tu nuevo proyecto en un clic.">
    <Input label="Nombre" placeholder="designs" />
    {#snippet footer()}
      <Button variant="ghost">Cancelar</Button>
      <Button>Crear</Button>
    {/snippet}
  </Card>
</div>
