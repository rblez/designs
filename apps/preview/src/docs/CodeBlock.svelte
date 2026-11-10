<script lang="ts">
  let { code, lang }: { code: string; lang: string } = $props();
  let copied = $state(false);
  async function copy() {
    await navigator.clipboard?.writeText(code);
    copied = true; setTimeout(() => (copied = false), 1400);
  }
</script>

<div class="code">
  <div class="code__bar"><span>{lang}</span><button type="button" class="code__copy" onclick={copy}>{copied ? "Copiado" : "Copiar"}</button></div>
  <pre><code>{code.trim()}</code></pre>
</div>
