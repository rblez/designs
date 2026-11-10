<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";
  import { cx } from "@rblez-ui/tokens";

  interface Props extends HTMLTextareaAttributes {
    value?: string;
    label?: string;
    hint?: string;
    error?: string;
  }
  let { value = $bindable(""), label, hint, error, id, disabled, rows = 3, class: className = "", ...rest }: Props = $props();
  const uid = $props.id();
  const areaId = $derived(id ?? `d-textarea-${uid}`);
  const msgId = $derived(`${areaId}-msg`);
</script>

<div class={cx("d-field", className as string)}>
  {#if label}<label class="d-label" for={areaId}>{label}</label>{/if}
  <div class="d-control d-control--area" data-invalid={!!error} data-disabled={!!disabled}>
    <textarea id={areaId} class="d-textarea" bind:value {disabled} {rows} aria-invalid={!!error || undefined}
      aria-describedby={error || hint ? msgId : undefined} {...rest}></textarea>
  </div>
  {#if error}<p id={msgId} class="d-hint d-hint--error">{error}</p>{:else if hint}<p id={msgId} class="d-hint">{hint}</p>{/if}
</div>
