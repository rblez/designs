<script lang="ts">
  import { BottomSheet, Button, Switch } from "@rblez-ui/svelte";
  let open = $state(false);
  let snap = $state(0);
</script>

<div class="demo-row">
  <Button variant="outline" onclick={() => (open = true)}>Abrir ajustes</Button>
</div>

<BottomSheet bind:open bind:snap snapPoints={[0.45, 0.9]} title="Ajustes rápidos" description="Arrastra el asa para expandir o cerrar.">
  <div class="demo-stack">
    <Switch label="Notificaciones" checked />
    <Switch label="Modo avión" />
    <Switch label="Ahorro de datos" />
  </div>
  {#snippet footer()}
    <Button variant="brand" onclick={() => (open = false)}>Listo</Button>
  {/snippet}
</BottomSheet>
