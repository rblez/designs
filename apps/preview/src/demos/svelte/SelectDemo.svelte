<script lang="ts">
  import { Select } from "@rblez-ui/svelte";
  import type { SelectOption } from "@rblez-ui/tokens";
  const regions: SelectOption[] = [
    { value: "mad", label: "Madrid (eu-south)", icon: "globe" },
    { value: "fra", label: "Frankfurt (eu-central)", icon: "globe" },
    { value: "iad", label: "Virginia (us-east)", icon: "globe" },
    { value: "sfo", label: "San Francisco (us-west)", icon: "globe" },
    { value: "gru", label: "São Paulo (sa-east)", icon: "globe", disabled: true },
  ];
  const roles: SelectOption[] = [
    { value: "owner", label: "Propietario" },
    { value: "admin", label: "Administrador" },
    { value: "member", label: "Miembro" },
    { value: "viewer", label: "Solo lectura" },
  ];
  let region = $state("mad");
  let role = $state<string>();
</script>

<div class="demo-stack">
  <Select label="Región" options={regions} bind:value={region} hint="Donde se despliega tu proyecto." searchable />
  <Select label="Rol" options={roles} bind:value={role} placeholder="Elige un rol" error={role ? undefined : "Elige un rol para continuar."} />
</div>
