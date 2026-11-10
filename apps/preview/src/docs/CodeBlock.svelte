<script lang="ts">
  import { t } from "./i18n.svelte";
  import Code from "./Code.svelte";
  import { Icon } from "@rblez-ui/svelte";
  let { code, lang }: { code: string; lang: string } = $props();
  let copied = $state(false);
  async function copy() {
    await navigator.clipboard?.writeText(code.trim());
    copied = true; setTimeout(() => (copied = false), 1400);
  }
</script>

<div class="code">
  <div class="code__bar"><span>{lang}</span><button type="button" class="icon-copy" onclick={copy} aria-label={copied ? t().copied : t().copy} title={copied ? t().copied : t().copy}><Icon name={copied ? "check" : "clipboard"} size={14} /></button></div>
  <Code code={code.trim()} {lang} class="code__body" />
</div>
