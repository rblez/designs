<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cx, type Size } from "@rblez-ui/tokens";

  interface Props extends Omit<HTMLInputAttributes, "size" | "prefix"> {
    value?: string;
    label?: string;
    hint?: string;
    error?: string;
    size?: Size;
    prefix?: Snippet;
    suffix?: Snippet;
  }
  let { value = $bindable(""), label, hint, error, size = "md", prefix, suffix, id, disabled, class: className = "", ...rest }: Props = $props();
  const uid = $props.id();
  const inputId = $derived(id ?? `d-input-${uid}`);
  const msgId = $derived(`${inputId}-msg`);
</script>

<div class={cx("d-field", className as string)}>
  {#if label}<label class="d-label" for={inputId}>{label}</label>{/if}
  <div class={cx("d-control", size !== "md" && `d-control--${size}`)} data-invalid={!!error} data-disabled={!!disabled}>
    {#if prefix}<span class="d-affix">{@render prefix()}</span>{/if}
    <input id={inputId} class="d-input" bind:value {disabled} aria-invalid={!!error || undefined}
      aria-describedby={error || hint ? msgId : undefined} {...rest} />
    {#if suffix}<span class="d-affix">{@render suffix()}</span>{/if}
  </div>
  {#if error}<p id={msgId} class="d-hint d-hint--error">{error}</p>{:else if hint}<p id={msgId} class="d-hint">{hint}</p>{/if}
</div>
