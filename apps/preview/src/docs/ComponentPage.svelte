<script lang="ts">
  import { Icon } from "@rblez-ui/svelte";
  import type { ComponentDoc } from "./registry";
  import ReactIsland from "./ReactIsland.svelte";
  import CodeBlock from "./CodeBlock.svelte";
  import FrameworkSwitch from "./FrameworkSwitch.svelte";
  import Code from "./Code.svelte";
  import SendToAi from "./SendToAi.svelte";
  import { Badge } from "@rblez-ui/svelte";
  import { i18n, t, en } from "./i18n.svelte";

  let { doc, framework = $bindable() }: { doc: ComponentDoc; framework: "svelte" | "react" } = $props();
  let copied = $state(false);
  const Demo = $derived(doc.svelte);
  const src = $derived((framework === "svelte" ? doc.svelteSrc : doc.reactSrc).trim());
  const file = $derived(`${doc.name}Demo.${framework === "svelte" ? "svelte" : "tsx"}`);
  const importLine = $derived(`import { ${doc.name} } from "@rblez-ui/${framework}";`);
  const L = $derived(t());
  const isEn = $derived(i18n.lang === "en");
  const description = $derived(isEn ? en[doc.slug]?.description ?? doc.description : doc.description);
  const pdesc = (name: string, es: string) => (isEn ? en[doc.slug]?.props[name] ?? es : es);
  const aiPrompt = $derived(isEn
    ? `Use this ${doc.name} component from rblez-ui (${framework === "svelte" ? "Svelte 5" : "React"}). ${description}\n\n\`\`\`${framework === "svelte" ? "svelte" : "tsx"}\n${src}\n\`\`\``
    : `Usa este componente ${doc.name} de rblez-ui (${framework === "svelte" ? "Svelte 5" : "React"}). ${description}\n\n\`\`\`${framework === "svelte" ? "svelte" : "tsx"}\n${src}\n\`\`\``);
  async function copy() { await navigator.clipboard?.writeText(src); copied = true; setTimeout(() => (copied = false), 1400); }
  let shared = $state(false);
  async function share() {
    const url = `${location.origin}${import.meta.env.BASE_URL}${doc.slug}/`;
    const data = { title: `${doc.name} · rblez-ui`, text: description, url };
    try {
      if (navigator.share && matchMedia("(pointer: coarse)").matches) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(url); shared = true; setTimeout(() => (shared = false), 1600);
    } catch {}
  }
</script>

<article class="page">
  <p class="eyebrow">{L.components} / {L.groups[doc.group]}</p>
  <div class="page__head">
    <h1>{doc.name} {#if doc.badge}<Badge variant="brand">{L.new}</Badge>{/if}</h1>
    <button type="button" class="share" onclick={share} aria-live="polite">
      <Icon name={shared ? "check" : "arrowUpRight"} size={14} />{shared ? (isEn ? "Link copied" : "Enlace copiado") : (isEn ? "Share" : "Compartir")}
    </button>
  </div>
  <p class="lead">{description}</p>

  <section class="example">
    <div class="canvas" class:canvas--gradient={doc.surface === "gradient"} class:canvas--wide={doc.surface === "wide"} class:canvas--phone={doc.surface === "phone"}>
      {#key framework + doc.slug}
        {#if framework === "svelte"}<Demo />{:else}<ReactIsland component={doc.react} />{/if}
      {/key}
    </div>
    <div class="divider">
      <FrameworkSwitch bind:value={framework} />
      <span class="divider__file">{file}</span>
      <SendToAi prompt={aiPrompt} />
      <button type="button" class="icon-copy" onclick={copy} aria-label={copied ? L.copied : L.copy} title={copied ? L.copied : L.copy}><Icon name={copied ? "check" : "clipboard"} size={14} /></button>
    </div>
    <Code code={src} lang={framework === "svelte" ? "svelte" : "tsx"} class="example__code" />
  </section>

  <h2>{L.usage}</h2>
  <CodeBlock lang="ts" code={importLine} />

  <h2>{L.props}</h2>
  <div class="table-wrap">
    <table>
      <thead><tr><th>{L.prop}</th><th>{L.type}</th><th>{L.def}</th><th>{L.desc}</th></tr></thead>
      <tbody>
        {#each doc.props as [name, type, def, desc] (name)}
          <tr><td><code>{name}</code></td><td><code class="t">{type}</code></td><td><code>{def}</code></td><td>{desc}</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</article>
