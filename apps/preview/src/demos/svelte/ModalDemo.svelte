<script lang="ts">
  import { Button, Input, Modal } from "@rblez-ui/svelte";
  let open = $state(false);
</script>

<div class="demo-row">
  <Button variant="outline" onclick={() => (open = true)}>Renombrar proyecto</Button>
</div>

<Modal bind:open title="Renombrar proyecto" description="El nombre aparece en la URL y en el panel." size="sm">
  <Input label="Nombre" value="rblez-ui" />
  {#snippet footer()}
    <Button variant="ghost" onclick={() => (open = false)}>Cancelar</Button>
    <Button variant="brand" onclick={() => (open = false)}>Guardar</Button>
  {/snippet}
</Modal>
