<script lang="ts">
  import AiLogo, { type AiId } from "./AiLogo.svelte";
  import { Icon } from "@rblez-ui/svelte";
  import { i18n } from "./i18n.svelte";

  let { prompt }: { prompt: string } = $props();
  let open = $state(false);
  let toast = $state("");
  let dialog: HTMLDialogElement | undefined = $state();

  const e = encodeURIComponent;
  const targets: { id: AiId; name: string; url: (p: string) => string; prefill: boolean }[] = [
    { id: "chatgpt", name: "ChatGPT", url: (p) => `https://chatgpt.com/?q=${e(p)}`, prefill: true },
    { id: "claude", name: "Claude", url: (p) => `https://claude.ai/new?q=${e(p)}`, prefill: true },
    { id: "v0", name: "v0", url: (p) => `https://v0.app/chat?q=${e(p)}`, prefill: true },
    { id: "lovable", name: "Lovable", url: (p) => `https://lovable.dev/#prompt=${e(p)}`, prefill: true },
    { id: "bolt", name: "Bolt", url: (p) => `https://bolt.new/?prompt=${e(p)}`, prefill: true },
    { id: "replit", name: "Replit", url: (p) => `https://replit.com/create?prompt=${e(p)}`, prefill: true },
    { id: "hark", name: "Hark", url: () => `https://hark.com`, prefill: false },
  ];
  const fan: AiId[] = ["claude", "chatgpt", "v0"];

  const L = $derived(i18n.lang === "en"
    ? { btn: "Send to AI", title: "Send to AI", sub: "Opens with the component code as the prompt. It's also copied to your clipboard.", pre: "Prefilled", paste: "Copy & paste", copied: "Prompt copied", close: "Close" }
    : { btn: "Enviar a IA", title: "Enviar a IA", sub: "Se abre con el código del componente como prompt. También queda copiado en el portapapeles.", pre: "Prellenado", paste: "Copiar y pegar", copied: "Prompt copiado", close: "Cerrar" });

  $effect(() => { if (!dialog) return; open ? dialog.showModal() : dialog.close(); });

  async function send(t: (typeof targets)[number]) {
    try { await navigator.clipboard?.writeText(prompt); } catch {}
    window.open(t.url(prompt), "_blank", "noopener");
    toast = L.copied; setTimeout(() => (toast = ""), 1600);
    open = false;
  }
</script>

<button type="button" class="ai-btn" onclick={() => (open = true)} aria-haspopup="dialog">
  <span class="ai-fan" aria-hidden="true">{#each fan as id, i (id)}<span class="ai-fan__chip" style:--i={i}><AiLogo {id} size={16} /></span>{/each}</span>
  <span>{L.btn}</span>
</button>

<dialog bind:this={dialog} class="ai-modal" aria-labelledby="ai-title" onclose={() => (open = false)}
  onclick={(ev) => { if (ev.target === dialog) open = false; }}>
  <div class="ai-modal__card">
    <header class="ai-modal__head">
      <div><h2 id="ai-title">{L.title}</h2><p>{L.sub}</p></div>
      <button type="button" class="ai-modal__x" aria-label={L.close} onclick={() => (open = false)}><Icon name="close" size={16} /></button>
    </header>
    <div class="ai-grid">
      {#each targets as t (t.id)}
        <button type="button" class="ai-tile" onclick={() => send(t)}>
          <AiLogo id={t.id} size={44} />
          <strong>{t.name}</strong>
          <span class="ai-tile__go"><Icon name="arrowUpRight" size={12} /></span>
        </button>
      {/each}
      {#each { length: (4 - (targets.length % 4)) % 4 } as _, i (i)}<span class="ai-tile ai-tile--empty" aria-hidden="true"></span>{/each}
    </div>
  </div>
</dialog>
{#if toast}<div class="ai-toast" role="status">{toast}</div>{/if}
