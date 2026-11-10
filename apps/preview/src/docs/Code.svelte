<script lang="ts">
  import { highlight } from "./highlight";
  let { code, lang, class: className = "" }: { code: string; lang: string; class?: string } = $props();
  let html = $state("");
  $effect(() => {
    const c = code, l = lang;
    let alive = true;
    highlight(c, l).then((h) => { if (alive) html = h; });
    return () => { alive = false; };
  });
</script>

{#if html}
  <div class={`hl ${className}`}>{@html html}</div>
{:else}
  <pre class={`hl hl--plain ${className}`}><code>{code}</code></pre>
{/if}
