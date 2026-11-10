<script lang="ts">
  import { Icon } from "@rblez-ui/svelte";
  import type { ComponentDoc } from "./registry";
  import ReactIsland from "./ReactIsland.svelte";
  import CodeBlock from "./CodeBlock.svelte";
  import FrameworkSwitch from "./FrameworkSwitch.svelte";
  import Code from "./Code.svelte";
  import SendToAi from "./SendToAi.svelte";
  import { Badge } from "@rblez-ui/svelte";
  import { components } from "./registry";
  import { i18n, t, en } from "./i18n.svelte";

  let { doc, framework = $bindable() }: { doc: ComponentDoc; framework: "svelte" | "react" } = $props();
  let copied = $state(false);
  const BASE = import.meta.env.BASE_URL;
  const idx = $derived(components.findIndex((c) => c.slug === doc.slug));
  const prev = $derived(idx > 0 ? components[idx - 1] : undefined);
  const next = $derived(idx < components.length - 1 ? components[idx + 1] : undefined);
  let rail: HTMLElement | undefined = $state();
  $effect(() => { doc.slug; rail?.querySelector<HTMLElement>('[aria-current="page"]')?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" }); });
  function nav(e: MouseEvent, slug: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault(); history.pushState(null, "", `${BASE}${slug}/`); dispatchEvent(new PopStateEvent("popstate")); scrollTo({ top: 0 });
  }
  // Deslizar a izquierda o derecha sobre la cabecera cambia de componente
  let sx = 0, sy = 0;
  function ts(e: TouchEvent) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }
  function te(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.6) return;
    const to = dx < 0 ? next : prev; if (to) { history.pushState(null, "", `${BASE}${to.slug}/`); dispatchEvent(new PopStateEvent("popstate")); scrollTo({ top: 0 }); }
  }
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
  const REPO = "https://github.com/rblez/ui/issues/new";
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
  <nav class="crail" bind:this={rail} aria-label={L.components}>
    {#each components as c (c.slug)}
      <a href={`${BASE}${c.slug}/`} aria-current={c.slug === doc.slug ? "page" : undefined} onclick={(e) => nav(e, c.slug)}>{c.name}</a>
    {/each}
  </nav>
  <div class="swipe-zone" ontouchstart={ts} ontouchend={te}>
  <p class="eyebrow">{L.components} / {L.groups[doc.group]}</p>
  <div class="page__head">
    <h1>{doc.name} {#if doc.badge}<Badge variant="brand">{L.new}</Badge>{/if}</h1>
    <button type="button" class="share" onclick={share} aria-live="polite">
      <Icon name={shared ? "check" : "arrowUpRight"} size={14} />{shared ? (isEn ? "Link copied" : "Enlace copiado") : (isEn ? "Share" : "Compartir")}
    </button>
  </div>
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
      <a class="fb-link" href={`https://github.com/rblez/ui/issues?q=is%3Aissue+${encodeURIComponent(`"[${doc.name}]"`)}`} target="_blank" rel="noreferrer">{IL.all} <Icon name="arrowUpRight" size={12} /></a>
    </div>
  </section>

  <nav class="pager" aria-label={isEn ? "More components" : "Más componentes"}>
    {#if prev}<a class="pager__btn" href={`${BASE}${prev.slug}/`} onclick={(e) => nav(e, prev.slug)}><small>{isEn ? "Previous" : "Anterior"}</small><span><Icon name="chevronLeft" size={14} />{prev.name}</span></a>{:else}<span></span>{/if}
    {#if next}<a class="pager__btn pager__btn--next" href={`${BASE}${next.slug}/`} onclick={(e) => nav(e, next.slug)}><small>{isEn ? "Next" : "Siguiente"}</small><span>{next.name}<Icon name="chevronRight" size={14} /></span></a>{/if}
  </nav>
</article>
