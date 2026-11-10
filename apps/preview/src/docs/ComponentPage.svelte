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
  // Issues prellenados en GitHub (formularios .github/ISSUE_TEMPLATE)
  const REPO = "https://github.com/rblez/designs/issues/new";
  const pkg = $derived(framework === "svelte" ? "@rblez-ui/svelte" : "@rblez-ui/react");
  const env = () => `${navigator.userAgent.match(/(Chrome|Firefox|Safari|Edg)\/[\d.]+/)?.[0] ?? "Browser"} · ${innerWidth}×${innerHeight}`;
  const issueUrl = (kind: "bug" | "idea") => {
    const q = new URLSearchParams(kind === "bug"
      ? { template: "bug.yml", title: `[${doc.name}] `, package: pkg, component: doc.name, version: `v${__VERSION__}${__COMMIT__ ? ` (${__COMMIT__})` : ""}`, env: env() }
      : { template: "improvement.yml", title: `[${doc.name}] `, component: doc.name, package: pkg });
    return `${REPO}?${q}`;
  };
  const IL = $derived(isEn
    ? { h: "Feedback", p: `Found a problem with ${doc.name} or have an idea? Open an issue; the component, package and version are filled in.`, bug: "Report a bug", idea: "Suggest an improvement", all: "All issues" }
    : { h: "Comentarios", p: `¿Algo falla en ${doc.name} o tienes una idea? Abre un issue; el componente, el paquete y la versión van rellenados.`, bug: "Reportar un bug", idea: "Proponer una mejora", all: "Ver issues" });
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
    <div class="canvas canvas--static" class:canvas--gradient={doc.surface === "gradient"} class:canvas--wide={doc.surface === "wide"} class:canvas--phone={doc.surface === "phone"}>
      <div class="canvas__frame" inert aria-hidden="true">
        {#key framework + doc.slug}
          {#if framework === "svelte"}<Demo />{:else}<ReactIsland component={doc.react} />{/if}
        {/key}
      </div>
      <a class="preview-btn" href={`${import.meta.env.BASE_URL}${doc.slug}/preview/`}><Icon name="play" size={12} />Preview</a>
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

  <section class="feedback" aria-labelledby="fb-h">
    <div>
      <h2 id="fb-h">{IL.h}</h2>
      <p>{IL.p}</p>
    </div>
    <div class="feedback__actions">
      <a class="fb-btn fb-btn--primary" href={issueUrl("bug")} target="_blank" rel="noreferrer"><Icon name="bug" size={14} />{IL.bug}</a>
      <a class="fb-btn" href={issueUrl("idea")} target="_blank" rel="noreferrer"><Icon name="lightbulb" size={14} />{IL.idea}</a>
      <a class="fb-link" href={`https://github.com/rblez/designs/issues?q=is%3Aissue+${encodeURIComponent(`"[${doc.name}]"`)}`} target="_blank" rel="noreferrer">{IL.all} <Icon name="arrowUpRight" size={12} /></a>
    </div>
  </section>
</article>
