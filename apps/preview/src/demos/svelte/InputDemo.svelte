<script lang="ts">
  import { Input } from "@rblez-ui/svelte";
  let email = $state("");
  const invalid = $derived(email.length > 0 && !email.includes("@"));
</script>

<div class="demo-stack">
  <Input label="Email" type="email" placeholder="hello@rblez.com" bind:value={email}
    hint="Nunca compartimos tu email." error={invalid ? "Introduce un email válido." : undefined} />
  {#snippet https()}https://{/snippet}
  {#snippet dot()}.rblez.com{/snippet}
  <Input label="Subdominio" placeholder="mi-proyecto" prefix={https} suffix={dot} />
  <Input label="Deshabilitado" placeholder="No editable" disabled size="sm" />
</div>
