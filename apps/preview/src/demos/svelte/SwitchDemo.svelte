<script lang="ts">
  import { Switch } from "@designs/svelte";
  let notifications = $state(true);
</script>

<div class="demo-stack">
  <Switch label="Notificaciones" bind:checked={notifications} />
  <Switch label="Modo avión" />
  <Switch label="Deshabilitado" disabled />
</div>
