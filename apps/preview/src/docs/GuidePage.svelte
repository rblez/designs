<script lang="ts">
  import CodeBlock from "./CodeBlock.svelte";
  import AboutPage from "./AboutPage.svelte";
  import { Card, Badge, Button, Switch, Input } from "@rblez-ui/svelte";
  import AccentPicker from "./AccentPicker.svelte";
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
      accentP: ["El acento es naranja por defecto. Cambia todo el sistema con ", " (o cualquier color con ", ") en ", " o en cualquier contenedor. Detalles en "],
      tokensLead: "Variables CSS que se adaptan solas al tema claro y oscuro.", type: "Tipografía",
      sw: ["Fondo", "Superficie", "Superficie 2", "Tinta", "Atenuado", "Borde", "Acento", "Acento suave", "Éxito", "Aviso", "Error"],
      accent: "Acento", accentLead: "Un solo acento, definido por --d-brand. El resto (tinta, texto, fondo suave, borde y anillo de foco) se deriva con color-mix, así que cualquier color funciona en claro y oscuro. Pruébalo: se guarda en este navegador.",
      demoBtn: "Guardar", demoBadge: "Nuevo", demoSwitch: "Notificaciones", demoInput: "Correo",
      tTok: "Token", tUse: "Uso",
      uses: ["Color del acento (botón brand, switch, foco, bordes activos).", "Texto sobre el acento. Se calcula solo (blanco o casi negro, contraste ≥ 4.5:1); puedes fijarlo.", "Acento como texto sobre el fondo (enlaces, badges, check del Select), ajustado para leerse.", "Fondo tintado (badge brand, pestaña activa).", "Borde tintado (hover de tarjetas).", "Anillo de foco.", "Obsoleto: alias de --d-brand y --d-brand-ink."],
      presets: "Presets", presetsP: "orange (por defecto), blue, violet, green, rose, amber, teal e ink, cada uno con valor claro y oscuro.",
      customH: "Color propio", customP: "Pon --d-brand en cualquier elemento (vale para ambos temas) o --d-brand-l / --d-brand-d para uno por tema. Desde TypeScript usa setAccent(), exportado por @rblez-ui/tokens, @rblez-ui/svelte y @rblez-ui/react.",
      neutral: "Neutros", neutralP: "data-neutral=\"cream | zinc | slate\" cambia fondo, superficies, tinta y líneas (cream por defecto). También puedes sobrescribir --d-bg, --d-surface, --d-ink… o sus versiones -l / -d por tema.",
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
      accentP: ["The accent is orange by default. Change the whole system with ", " (or any color with ", ") on ", " or any container. Details in "],
      tokensLead: "CSS variables that adapt to light and dark themes automatically.", type: "Typography",
      sw: ["Background", "Surface", "Surface 2", "Ink", "Muted", "Border", "Accent", "Accent soft", "Success", "Warning", "Error"],
      accent: "Accent", accentLead: "One accent, defined by --d-brand. Everything else (ink, text, soft background, border and focus ring) is derived with color-mix, so any color works in light and dark. Try it: it is saved in this browser.",
      demoBtn: "Save", demoBadge: "New", demoSwitch: "Notifications", demoInput: "Email",
      tTok: "Token", tUse: "Use",
      uses: ["Accent color (brand button, switch, focus, active borders).", "Text on the accent. Computed automatically (white or near-black, contrast ≥ 4.5:1); you can pin it.", "Accent as text on the background (links, badges, Select check), adjusted to stay readable.", "Tinted background (brand badge, active tab).", "Tinted border (card hover).", "Focus ring.", "Deprecated: alias of --d-brand and --d-brand-ink."],
      presets: "Presets", presetsP: "orange (default), blue, violet, green, rose, amber, teal and ink, each with a light and a dark value.",
      customH: "Your own color", customP: "Set --d-brand on any element (applies to both themes) or --d-brand-l / --d-brand-d for one per theme. From TypeScript use setAccent(), exported by @rblez-ui/tokens, @rblez-ui/svelte and @rblez-ui/react.",
      neutral: "Neutrals", neutralP: "data-neutral=\"cream | zinc | slate\" changes background, surfaces, ink and lines (cream by default). You can also override --d-bg, --d-surface, --d-ink… or their per-theme -l / -d versions.",
      about: "About", aboutLead: "rblez-ui is rblez's component library: Svelte 5 and React with the same API, one stylesheet and shared tokens.",
      a: { author: "Author", code: "Source", version: "Version", type: "Typography", license: "License", typeV: "Inter and SUSE Mono, under the SIL Open Font License 1.1.", licV: "Proprietary software. © 2026 rblez. All rights reserved." },
      licTitle: "License", licLead: "Proprietary software. © 2026 rblez. All rights reserved.",
      licP: "The source is visible but not free to use. Copying, modifying, distributing, sublicensing or using these components, in whole or in part, is not permitted without written permission from rblez. For licensing, contact",
    },
  };
  const c = $derived(C[i18n.lang]);
  const vars = ["--d-bg", "--d-surface", "--d-surface-2", "--d-ink", "--d-muted", "--d-line-2", "--d-brand", "--d-brand-soft", "--d-green", "--d-amber", "--d-red"];
  const brandTokens = ["--d-brand", "--d-brand-ink", "--d-brand-text", "--d-brand-soft", "--d-brand-line", "--d-ring", "--d-orange"];
  let demoOn = $state(true);
  const htmlCode = `<!-- preset -->\n<html data-theme="dark" data-accent="violet">\n\n<!-- cualquier color / any color -->\n<section data-accent="custom" style="--d-brand: #0ea5e9">\n  …\n</section>\n\n<!-- uno por tema / one per theme -->\n<html style="--d-brand-l: #0369a1; --d-brand-d: #38bdf8">\n\n<!-- neutros / neutrals -->\n<html data-neutral="zinc">`;
  const tsCode = `import { setAccent, setNeutral } from "@rblez-ui/tokens"; // o @rblez-ui/svelte · @rblez-ui/react\n\nsetAccent("blue");                                  // preset\nsetAccent("#0ea5e9");                               // ambos temas · both themes\nsetAccent({ light: "#0369a1", dark: "#38bdf8" });  // por tema · per theme\nsetAccent("teal", document.querySelector("#panel")); // solo un subárbol · one subtree\nsetAccent(null);                                    // naranja · orange\nsetNeutral("slate");`;
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
    <p>{c.accentP[0]}<code>data-accent="blue"</code>{c.accentP[1]}<code>--d-brand</code>{c.accentP[2]}<code>&lt;html&gt;</code>{c.accentP[3]}<a href="../tokens/" onclick={(e) => { e.preventDefault(); go("tokens"); }}>Tokens</a>.</p>
    <CodeBlock lang="html" code={`<html data-theme="dark" data-accent="blue">\n<!-- o / or -->\n<html style="--d-brand: #0ea5e9">`} />
  {:else if slug === "tokens"}
    <p class="eyebrow">{c.base}</p>
    <h1>Tokens</h1>
    <p class="lead">{c.tokensLead}</p>
    <div class="swatches">
      {#each vars as v, i (v)}
        <div class="swatch"><span style:background={`var(${v})`}></span><strong>{c.sw[i]}</strong><code>{v}</code></div>
      {/each}
    </div>
    <h2>{c.accent}</h2>
    <p>{c.accentLead}</p>
    <div class="look">
      <AccentPicker neutrals />
      <div class="look__demo">
        <Button variant="brand">{c.demoBtn}</Button>
        <Badge variant="brand" dot>{c.demoBadge}</Badge>
        <Switch bind:checked={demoOn} label={c.demoSwitch} />
      </div>
      <Input label={c.demoInput} placeholder="ray@rblez.com" />
    </div>
    <div class="table-wrap look-table" style="margin-top: 16px">
      <table>
        <thead><tr><th>{c.tTok}</th><th>{c.tUse}</th></tr></thead>
        <tbody>{#each brandTokens as tk, i (tk)}<tr><td><code class={i === 0 ? "t" : ""}>{tk}</code></td><td>{c.uses[i]}</td></tr>{/each}</tbody>
      </table>
    </div>
    <h2>{c.presets}</h2>
    <p><code>data-accent</code> — {c.presetsP}</p>
    <CodeBlock lang="html" code={htmlCode} />
    <h2>{c.customH}</h2>
    <p>{c.customP}</p>
    <CodeBlock lang="ts" code={tsCode} />
    <h2>{c.neutral}</h2>
    <p>{c.neutralP}</p>
    <h2>{c.type}</h2>
    <Card>
      <p class="type-sample sans">Inter — Build something people want.</p>
      <p class="type-sample mono">SUSE Mono — pnpm build --filter rblez-ui</p>
    </Card>
  {:else if slug === "acerca"}
    <AboutPage />
  {/if}
</article>
