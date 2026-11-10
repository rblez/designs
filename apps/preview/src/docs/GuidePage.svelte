<script lang="ts">
  import CodeBlock from "./CodeBlock.svelte";
  import { Card, Badge } from "@rblez-ui/svelte";
  import { i18n } from "./i18n.svelte";
  let { slug, go }: { slug: string; go: (s: string) => void } = $props();

  const C = {
    es: {
      start: "Empezar", base: "Base", legal: "Legal",
      introLead: "Componentes de interfaz para Svelte 5 y React con una sola API, un único CSS y tokens compartidos. Sin dependencias de UI de terceros.",
      tiles: [["prompt-input", "IA", "PromptInput", "Composer con adjuntos, modo plan y dictado."], ["input", "Formularios", "Input", "Label, ayuda, error y afijos."], ["footer", "Layout", "Footer", "Pie de sitio con columnas y barra legal."], ["tokens", "Base", "Tokens", "Color, tipografía y tema."]],
      principles: "Principios",
      p: [["Una API, dos frameworks.", "Mismos nombres de props; solo cambia la convención de eventos."], ["CSS antes que JS.", "Los estilos viven en @rblez-ui/tokens; los componentes solo aplican clases."], ["Accesible por defecto.", "Roles ARIA, navegación por teclado y foco visible en todo."]],
      install: "Instalación", installLead: "Monorepo con pnpm. Uso reservado a rblez; consulta la licencia.",
      s1: "1. Estilos", s2: "2. Svelte", s3: "3. React", theme: "Tema",
      themeP: ["Define ", " o ", " en ", ". Sin atributo, sigue la preferencia del sistema."],
      tokensLead: "Variables CSS que se adaptan solas al tema claro y oscuro.", type: "Tipografía",
      sw: ["Fondo", "Superficie", "Superficie 2", "Tinta", "Atenuado", "Borde", "Naranja", "Éxito", "Aviso", "Error"],
      about: "Acerca de", aboutLead: "rblez-ui es la librería de componentes de rblez: Svelte 5 y React con la misma API, un solo CSS y tokens compartidos.",
      a: { author: "Autor", code: "Código", version: "Versión", type: "Tipografía", license: "Licencia", typeV: "Inter y SUSE Mono, bajo SIL Open Font License 1.1.", licV: "Software propietario. © 2026 rblez. Todos los derechos reservados." },
      licTitle: "Licencia", licLead: "Software propietario. © 2026 rblez. Todos los derechos reservados.",
      licP: "El código es visible, pero no de uso libre. No se permite copiar, modificar, distribuir, sublicenciar ni usar estos componentes, total o parcialmente, sin permiso escrito de rblez. Para licencias, escribe a",
    },
    en: {
      start: "Get started", base: "Foundations", legal: "Legal",
      introLead: "Interface components for Svelte 5 and React with one API, a single stylesheet and shared tokens. No third-party UI dependencies.",
      tiles: [["prompt-input", "AI", "PromptInput", "Composer with attachments, plan mode and dictation."], ["input", "Forms", "Input", "Label, hint, error and affixes."], ["footer", "Layout", "Footer", "Site footer with columns and a legal bar."], ["tokens", "Foundations", "Tokens", "Color, type and theming."]],
      principles: "Principles",
      p: [["One API, two frameworks.", "Same prop names; only the event convention differs."], ["CSS before JS.", "Styles live in @rblez-ui/tokens; components only apply classes."], ["Accessible by default.", "ARIA roles, keyboard navigation and visible focus throughout."]],
      install: "Installation", installLead: "pnpm monorepo. Reserved for rblez; see the license.",
      s1: "1. Styles", s2: "2. Svelte", s3: "3. React", theme: "Theme",
      themeP: ["Set ", " or ", " on ", ". Without the attribute, it follows the system preference."],
      tokensLead: "CSS variables that adapt to light and dark themes automatically.", type: "Typography",
      sw: ["Background", "Surface", "Surface 2", "Ink", "Muted", "Border", "Orange", "Success", "Warning", "Error"],
      about: "About", aboutLead: "rblez-ui is rblez's component library: Svelte 5 and React with the same API, one stylesheet and shared tokens.",
      a: { author: "Author", code: "Source", version: "Version", type: "Typography", license: "License", typeV: "Inter and SUSE Mono, under the SIL Open Font License 1.1.", licV: "Proprietary software. © 2026 rblez. All rights reserved." },
      licTitle: "License", licLead: "Proprietary software. © 2026 rblez. All rights reserved.",
      licP: "The source is visible but not free to use. Copying, modifying, distributing, sublicensing or using these components, in whole or in part, is not permitted without written permission from rblez. For licensing, contact",
    },
  };
  const c = $derived(C[i18n.lang]);
  const vars = ["--d-bg", "--d-surface", "--d-surface-2", "--d-ink", "--d-muted", "--d-line-2", "--d-orange", "--d-green", "--d-amber", "--d-red"];
</script>

<article class="page">
  {#if slug === "introduccion"}
    <p class="eyebrow">{c.start}</p>
    <h1>rblez-ui</h1>
    <p class="lead">{c.introLead}</p>
    <div class="grid">
      {#each c.tiles as [to, tag, name, text], i (to)}
        <button class="tile" onclick={() => go(to)}><Badge variant={i === 0 ? "brand" : i === 3 ? "outline" : "secondary"}>{tag}</Badge><strong>{name}</strong><span>{text}</span></button>
      {/each}
    </div>
    <h2>{c.principles}</h2>
    <ul class="list">{#each c.p as [b, rest] (b)}<li><strong>{b}</strong> {rest}</li>{/each}</ul>
  {:else if slug === "instalacion"}
    <p class="eyebrow">{c.start}</p>
    <h1>{c.install}</h1>
    <p class="lead">{c.installLead}</p>
    <h2>{c.s1}</h2>
    <CodeBlock lang="ts" code={`import "@rblez-ui/tokens/css";\nimport "@rblez-ui/tokens/components.css";\nimport "@rblez-ui/tokens/prompt-input.css";`} />
    <h2>{c.s2}</h2>
    <CodeBlock lang="svelte" code={`<script lang="ts">\n  import { Button } from "@rblez-ui/svelte";\n</script>\n\n<Button variant="brand">Build now</Button>`} />
    <h2>{c.s3}</h2>
    <CodeBlock lang="tsx" code={`import { Button } from "@rblez-ui/react";\n\nexport default () => <Button variant="brand">Build now</Button>;`} />
    <h2>{c.theme}</h2>
    <p>{c.themeP[0]}<code>data-theme="light"</code>{c.themeP[1]}<code>"dark"</code>{c.themeP[2]}<code>&lt;html&gt;</code>{c.themeP[3]}</p>
  {:else if slug === "tokens"}
    <p class="eyebrow">{c.base}</p>
    <h1>Tokens</h1>
    <p class="lead">{c.tokensLead}</p>
    <div class="swatches">
      {#each vars as v, i (v)}
        <div class="swatch"><span style:background={`var(${v})`}></span><strong>{c.sw[i]}</strong><code>{v}</code></div>
      {/each}
    </div>
    <h2>{c.type}</h2>
    <Card>
      <p class="type-sample sans">Inter — Build something people want.</p>
      <p class="type-sample mono">SUSE Mono — pnpm build --filter rblez-ui</p>
    </Card>
  {:else if slug === "acerca"}
    <p class="eyebrow">{c.start}</p>
    <h1>{c.about}</h1>
    <p class="lead">{c.aboutLead}</p>
    <ul class="list">
      <li><strong>{c.a.author}.</strong> <a href="https://www.rblez.com" target="_blank" rel="noreferrer">rblez</a> · <a href="mailto:hello@rblez.com">hello@rblez.com</a></li>
      <li><strong>{c.a.code}.</strong> <a href="https://github.com/rblez/designs" target="_blank" rel="noreferrer">github.com/rblez/designs</a></li>
      <li><strong>{c.a.version}.</strong> v{__VERSION__}{__COMMIT__ ? ` (${__COMMIT__})` : ""} · {__BUILD_DATE__} · <a href="https://github.com/rblez/designs/releases" target="_blank" rel="noreferrer">Releases</a></li>
      <li><strong>{c.a.type}.</strong> {c.a.typeV}</li>
      <li><strong>{c.a.license}.</strong> {c.a.licV}</li>
    </ul>
  {:else if slug === "licencia"}
    <p class="eyebrow">{c.legal}</p>
    <h1>{c.licTitle}</h1>
    <p class="lead">{c.licLead}</p>
    <p>{c.licP} <a href="mailto:hello@rblez.com">hello@rblez.com</a>.</p>
  {/if}
</article>
