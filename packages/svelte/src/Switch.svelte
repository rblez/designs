<script lang="ts">
  interface Props { checked?: boolean; label?: string; disabled?: boolean; onchange?: (checked: boolean) => void; }
  let { checked = $bindable(false), label, disabled = false, onchange }: Props = $props();
  function toggle() { if (disabled) return; checked = !checked; onchange?.(checked); }
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<label class="d-switch-row">
  <button type="button" role="switch" class="d-switch" aria-label={label} aria-checked={checked} {disabled} onclick={toggle}></button>
  {#if label}<span>{label}</span>{/if}
</label>
