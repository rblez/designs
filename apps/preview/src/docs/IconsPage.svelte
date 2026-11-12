<script lang="ts">
  import { Icon, Input } from "@rblez-ui/svelte";
  import type { IonIcon, IconVariant } from "@rblez-ui/tokens";
  import * as own from "@rblez-ui/tokens/rblez-icons";
  import CodeBlock from "./CodeBlock.svelte";
  import { i18n } from "./i18n.svelte";

  const C = {
    es: {
      eyebrow: "Base", title: "Iconos",
      lead: "Ionicons completo (421 iconos, línea y relleno) más un set propio de rblez para lo que Ionicons no trae. Mismo trazo, misma caja y una sola API.",
      search: "Buscar icono…", line: "Línea", fill: "Relleno", own: "Propios de rblez", ion: "Ionicons",
      ownLead: "Dibujados para rblez-ui con la geometría de Ionicons: caja de 512, trazo de 32 y extremos redondeados.",
      copied: "Import copiado", copyHint: "Pulsa un icono para copiar su import.", none: (q: string) => `Ningún icono coincide con “${q}”.`,
      usage: "Uso", stroke: "Grosor",
      strokeP: "strokeWidth va en px a 24 px (1,5 por defecto; 1,75 a 16 px o menos). Los iconos con trazo propio de Ionicons, como chevrons y flechas, escalan en la misma proporción. En relleno, los iconos que solo tienen trazo (plus, check) se dibujan algo más gruesos.",
      license: "Licencias",
      licP1: "Ionicons es de Ionic y se distribuye bajo licencia MIT; el aviso completo está en packages/tokens/IONICONS-LICENSE.",
      licP2: "Los iconos propios son obra de rblez y siguen la licencia del repositorio. Los logos de marcas de Ionicons (logo-*) son marcas de sus dueños: la licencia MIT cubre el dibujo, no el uso de la marca.",
      loading: "Cargando iconos…",
    },
    en: {
      eyebrow: "Foundations", title: "Icons",
      lead: "The full Ionicons set (421 icons, line and fill) plus rblez's own set for what Ionicons lacks. Same stroke, same box and one API.",
      search: "Search icons…", line: "Line", fill: "Fill", own: "rblez originals", ion: "Ionicons",
      ownLead: "Drawn for rblez-ui on the Ionicons geometry: 512 box, 32 stroke and round caps.",
      copied: "Import copied", copyHint: "Click an icon to copy its import.", none: (q: string) => `No icon matches “${q}”.`,
      usage: "Usage", stroke: "Stroke",
      strokeP: "strokeWidth is in px at 24 px (1.5 by default; 1.75 at 16 px or less). Ionicons with their own stroke, such as chevrons and arrows, scale in the same proportion. In fill, stroke-only icons (plus, check) are drawn slightly bolder.",
      license: "Licenses",
      licP1: "Ionicons is by Ionic and released under the MIT license; the full notice is in packages/tokens/IONICONS-LICENSE.",
      licP2: "The originals are rblez's own work and follow the repository license. Ionicons brand logos (logo-*) are trademarks of their owners: MIT covers the drawing, not the use of the mark.",
      loading: "Loading icons…",
    },
  };
  const c = $derived(C[i18n.lang]);

  let variant = $state<IconVariant>("line");
  let q = $state("");
  let toast = $state("");
  let ion = $state<[string, IonIcon][]>([]);
  // Ionicons completo, en import dinámico: Vite lo separa si nada más lo importa entero.
  import("@rblez-ui/tokens/ionicons").then((m) => { ion = Object.entries(m) as [string, IonIcon][]; });

  const ownList = Object.entries(own) as [string, IonIcon][];
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const match = (n: string) => !q.trim() || norm(n).includes(norm(q));
  const ownShown = $derived(ownList.filter(([n]) => match(n)));
  const ionShown = $derived(ion.filter(([n]) => match(n)));

  let timer: ReturnType<typeof setTimeout>;
  async function copy(name: string, from: string) {
    const code = `import { ${name} } from "@rblez-ui/tokens/${from}";`;
    try { await navigator.clipboard.writeText(code); } catch { /* sin permiso: solo aviso */ }
    toast = `${c.copied}: ${name}`; clearTimeout(timer); timer = setTimeout(() => (toast = ""), 1600);
  }

  const svelteCode = `<script lang="ts">\n  import { Icon } from "@rblez-ui/svelte";\n  import { camera } from "@rblez-ui/tokens/ionicons";\n  import { sidebar } from "@rblez-ui/tokens/rblez-icons";\n<\/script>\n\n<Icon name="search" />                     <!-- set curado -->\n<Icon icon={camera} variant="fill" size={20} />\n<Icon icon={sidebar} strokeWidth={2} label="Barra lateral" />`;
  const reactCode = `import { Icon } from "@rblez-ui/react";\nimport { camera } from "@rblez-ui/tokens/ionicons";\nimport { sidebar } from "@rblez-ui/tokens/rblez-icons";\n\n<Icon name="search" />\n<Icon icon={camera} variant="fill" size={20} />\n<Icon icon={sidebar} strokeWidth={2} label="Sidebar" />`;
</script>

<article class="page icons">
  <p class="eyebrow">{c.eyebrow}</p>
  <h1>{c.title}</h1>
  <p class="lead">{c.lead}</p>

  <div class="icons__bar">
    <div class="icons__find"><Input bind:value={q} placeholder={c.search} size="sm" /></div>
    <div class="seg" role="group" aria-label={c.title}>
      <button aria-selected={variant === "line"} onclick={() => (variant = "line")}>{c.line}</button>
      <button aria-selected={variant === "fill"} onclick={() => (variant = "fill")}>{c.fill}</button>
    </div>
  </div>
  <p class="icons__hint">{c.copyHint}</p>

  {#if ownShown.length}
    <h2>{c.own} <span class="icons__n">{ownShown.length}</span></h2>
    <p>{c.ownLead}</p>
    <ul class="icons__grid">
      {#each ownShown as [n, ic] (n)}
        <li><button onclick={() => copy(n, "rblez-icons")} title={n}><Icon icon={ic} {variant} size={24} /><span>{n}</span></button></li>
      {/each}
    </ul>
  {/if}

  <h2>{c.ion} <span class="icons__n">{ion.length ? ionShown.length : ""}</span></h2>
  {#if !ion.length}
    <p>{c.loading}</p>
  {:else if ionShown.length}
    <ul class="icons__grid">
      {#each ionShown as [n, ic] (n)}
        <li><button onclick={() => copy(n, "ionicons")} title={n}><Icon icon={ic} {variant} size={24} /><span>{n}</span></button></li>
      {/each}
    </ul>
  {:else}
    <p>{c.none(q)}</p>
  {/if}

  <h2>{c.usage}</h2>
  <CodeBlock lang="svelte" code={svelteCode} />
  <CodeBlock lang="tsx" code={reactCode} />
  <h2>{c.stroke}</h2>
  <p>{c.strokeP}</p>
  <h2>{c.license}</h2>
  <p>{c.licP1}</p>
  <p>{c.licP2}</p>

  {#if toast}<div class="icons__toast" role="status">{toast}</div>{/if}
</article>

<style>
  .icons__bar { display: flex; gap: 10px; align-items: center; margin-top: 24px; flex-wrap: wrap; }
  .icons__find { flex: 1 1 220px; }
  .icons__hint { margin: 8px 0 0; font-size: 12px; color: var(--d-muted) !important; }
  .icons__n { font: 500 12px/1 var(--d-mono); color: var(--d-muted); margin-left: 6px; }
  .icons__grid { list-style: none; padding: 0; margin: 12px 0 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 8px; }
  .icons__grid button {
    width: 100%; height: 92px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
    border: 1px solid var(--d-line); border-radius: var(--d-radius-lg); background: var(--d-surface); color: var(--d-ink); cursor: pointer;
    transition: border-color .15s, background .15s;
  }
  .icons__grid button:hover { border-color: var(--d-brand-line); background: var(--d-surface-2); }
  .icons__grid button:focus-visible { outline: 2px solid var(--d-ring, var(--d-brand)); outline-offset: 2px; }
  .icons__grid span { max-width: 92%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 500 10.5px/1.2 var(--d-mono); color: var(--d-muted); }
  .icons__toast {
    position: fixed; left: 50%; bottom: 88px; transform: translateX(-50%); z-index: 60; padding: 8px 14px; border-radius: 999px;
    background: var(--d-ink); color: var(--d-bg); font: 600 12px/1 var(--d-sans); box-shadow: var(--d-shadow-md);
  }
  @media (max-width: 520px) { .icons__grid { grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); } .icons__grid button { height: 80px; } }
</style>
