<script lang="ts">
  import { promptDefaults, promptPlaceholders, typewriter, type PromptSubmit, type PromptTheme } from "@rblez-ui/tokens";
  import Icon from "./Icon.svelte";

  interface Props {
    value?: string;
    plan?: boolean;
    placeholder?: string | readonly string[];
    submitLabel?: string;
    theme?: PromptTheme;
    disabled?: boolean;
    accept?: string;
    onsubmit?: (data: PromptSubmit) => void;
    ondictate?: () => void;
    dictating?: boolean;
  }

  let {
    value = $bindable(""),
    plan = $bindable(false),
    placeholder = promptPlaceholders,
    submitLabel = promptDefaults.submitLabel,
    theme = "auto",
    disabled = false,
    accept,
    onsubmit,
    ondictate,
    dictating = false,
  }: Props = $props();

  let files = $state<File[]>([]);
  let typed = $state("");
  let textarea: HTMLTextAreaElement;
  let fileInput: HTMLInputElement;

  const phrases = $derived(typeof placeholder === "string" ? [placeholder] : placeholder);
  const empty = $derived(value.trim().length === 0 && files.length === 0);

  $effect(() => typewriter(phrases, (t) => (typed = t)));

  $effect(() => {
    value; // autosize
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(Math.max(textarea.scrollHeight, promptDefaults.minHeight), promptDefaults.maxHeight) + "px";
  });

  function submit() {
    if (empty || disabled) return;
    onsubmit?.({ value: value.trim(), plan, files });
    value = "";
    files = [];
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); submit(); }
  }

  function onfiles(e: Event) {
    const list = (e.currentTarget as HTMLInputElement).files;
    if (list) files = [...files, ...Array.from(list)];
    (e.currentTarget as HTMLInputElement).value = "";
  }
</script>

<div class="d-prompt" data-theme={theme}>
  <div class="d-prompt__box">
    {#if files.length}
      <div class="d-prompt__files">
        {#each files as f, i (f.name + i)}
          <span class="d-prompt__chip"><span>{f.name}</span>
            <button type="button" aria-label={`Quitar ${f.name}`} onclick={() => (files = files.filter((_, j) => j !== i))}>×</button>
          </span>
        {/each}
      </div>
    {/if}
    <div class="d-prompt__field" style:min-height="{promptDefaults.minHeight}px">
      {#if !value}
        <div class="d-prompt__placeholder" aria-hidden="true">{typed}<span class="d-prompt__caret"></span></div>
      {/if}
      <textarea
        bind:this={textarea}
        bind:value
        class="d-prompt__textarea"
        rows="1"
        aria-label={phrases[0]}
        {disabled}
        {onkeydown}
      ></textarea>
    </div>
    <div class="d-prompt__bar">
      <button type="button" class="d-prompt__btn d-prompt__add" aria-label="Add context, enhance your prompt, and more"
        {disabled} onclick={() => fileInput.click()}>
        <Icon name="plus" class="d-prompt__icon d-prompt__icon--lg" />
      </button>
      <div class="d-prompt__spacer"></div>
      <div class="d-prompt__group">
        <button type="button" class="d-prompt__btn d-prompt__plan" aria-pressed={plan} aria-label={promptDefaults.planLabel}
          onclick={() => (plan = !plan)}>
          <Icon name="lightbulb" class="d-prompt__icon" /><span class="d-prompt__plan-label">{promptDefaults.planLabel}</span>
        </button>
        <button type="button" class="d-prompt__btn d-prompt__mic" aria-label="Start dictation" aria-pressed={dictating}
          disabled={!ondictate || disabled} onclick={() => ondictate?.()}>
          <Icon name="microphone" class="d-prompt__icon" />
        </button>
        <button type="button" class="d-prompt__send" aria-label="Send message" disabled={empty || disabled} onclick={submit}>
          <span class="d-prompt__send-label">{submitLabel}</span><Icon name="send" class="d-prompt__icon" />
        </button>
      </div>
    </div>
    <input bind:this={fileInput} class="d-prompt__file" type="file" multiple {accept} tabindex="-1" aria-hidden="true" onchange={onfiles} />
  </div>
</div>
