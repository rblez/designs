<script lang="ts">
  import { onMount } from "svelte";
  import { animate, inView, stagger } from "motion";
  import { Badge, Icon } from "@rblez-ui/svelte";
  import AiLogo, { type AiId } from "./AiLogo.svelte";
  import { components } from "./registry";
  import { i18n } from "./i18n.svelte";

  const BASE = import.meta.env.BASE_URL;
  const en = $derived(i18n.lang === "en");
  const shot = (k: string) => `${BASE}about/${k}.webp`;

  const ais: { id: AiId; name: string; site: string; url: string; es: string; en: string }[] = [
    { id: "v0", name: "v0", site: "v0.app", url: "https://v0.app/chat?q=…", es: "Abre un chat nuevo con el código como primer mensaje para iterar la UI.", en: "Opens a new chat with the code as the first message to iterate on the UI." },
    { id: "chatgpt", name: "ChatGPT", site: "chatgpt.com", url: "https://chatgpt.com/?q=…", es: "Crea una conversación con el prompt ya escrito: explicar, adaptar o portar.", en: "Starts a conversation with the prompt filled in: explain, adapt or port." },
    { id: "claude", name: "Claude", site: "claude.ai", url: "https://claude.ai/new?q=…", es: "Abre un chat nuevo con el componente para revisarlo o ampliarlo.", en: "Opens a new chat with the component to review or extend it." },
    { id: "replit", name: "Replit", site: "replit.com", url: "https://replit.com/create?prompt=…", es: "Arranca un proyecto con el componente como punto de partida.", en: "Starts a project with the component as the starting point." },
  ];

  const T = $derived(en ? {
    eyebrow: "About", title: "About rblez-ui",
    lead: "rblez-ui is rblez's component library: Svelte 5 and React with the same API, one stylesheet and shared tokens. Built for interfaces that feel made by hand.",
    meta: ["Version", "Build", "Date", "License"],
    mock: "Docs on desktop and mobile", mockLead: "The same documentation adapts from a three-column desktop layout to a mobile dock with search.",
    pk: "Packages", pkRows: [["@rblez-ui/tokens", "Tokens, CSS, Lucide icons and shared types."], ["@rblez-ui/svelte", "Svelte 5 components (runes)."], ["@rblez-ui/react", "React 18+ components."]],
    comps: "Components", ai: "Send to AI", aiLead: "Every component page has a Send to AI button. It copies the prompt to your clipboard and opens the tool with the code already written.",
    docs: "Documentation", docsList: [
      ["Its own URL", "Every component lives at /ui/<slug>/ with its own title, description and Open Graph image."],
      ["Static demo + Preview", "Demos are fixed in the page; Preview opens the live component full screen."],
      ["Share", "Native share sheet on mobile, copy link on desktop."],
      ["Feedback", "Opens a GitHub issue (bug or improvement) with component, package, version and browser filled in."],
      ["Search", "⌘K / Ctrl+K palette on desktop; floating dock with search on mobile."],
      ["Spanish and English", "Switch language from the header or the mobile sheet."],
      ["Light and dark", "Follows the system; the choice is remembered."],
    ],
    stack: "Stack and credits", design: "Design workflow", designP: "Components are also written in Patch to export editable layers to Figma and to run snapshot tests per state (theme, selected tab, long names…) in CI.",
    ver: "Versions", verP: "SemVer and Keep a Changelog. Every vX.Y.Z tag publishes a release with notes and a zip of the docs. The header shows the version and commit of each build.",
    lic: "License", licP: "Proprietary software. © 2026 rblez. All rights reserved. The source is visible but may not be copied, modified, distributed, sublicensed or used, in whole or in part, without written permission from rblez. Use for training AI models is prohibited. Fonts under SIL OFL 1.1; Lucide icons under ISC.",
    contact: "Contact", repo: "Source", rel: "Releases", chg: "Changelog",
  } : {
    eyebrow: "Acerca de", title: "Acerca de rblez-ui",
    lead: "rblez-ui es la librería de componentes de rblez: Svelte 5 y React con la misma API, un solo CSS y tokens compartidos. Hecha para interfaces que se sienten hechas a mano.",
    meta: ["Versión", "Build", "Fecha", "Licencia"],
    mock: "Las docs en PC y móvil", mockLead: "La misma documentación pasa de tres columnas en escritorio a un dock con búsqueda en el móvil.",
    pk: "Paquetes", pkRows: [["@rblez-ui/tokens", "Tokens, CSS, iconos Lucide y tipos compartidos."], ["@rblez-ui/svelte", "Componentes Svelte 5 (runes)."], ["@rblez-ui/react", "Componentes React 18+."]],
    comps: "Componentes", ai: "Enviar a IA", aiLead: "Cada página de componente tiene el botón Enviar a IA. Copia el prompt al portapapeles y abre la herramienta con el código ya escrito.",
    docs: "Documentación", docsList: [
      ["URL propia", "Cada componente vive en /ui/<slug>/ con su título, descripción e imagen Open Graph."],
      ["Demo fija + Preview", "Las demos quedan fijas en la página; Preview abre el componente vivo a pantalla completa."],
      ["Compartir", "Hoja nativa en el móvil, copiar enlace en escritorio."],
      ["Comentarios", "Abre un issue en GitHub (bug o mejora) con componente, paquete, versión y navegador rellenados."],
      ["Búsqueda", "Paleta ⌘K / Ctrl+K en escritorio; dock flotante con búsqueda en el móvil."],
      ["Español e inglés", "Cambia el idioma desde la cabecera o la hoja del móvil."],
      ["Claro y oscuro", "Sigue al sistema y recuerda tu elección."],
    ],
    stack: "Stack y créditos", design: "Flujo de diseño", designP: "Los componentes también se escriben en Patch para exportar capas editables a Figma y correr tests de snapshot por estado (tema, pestaña activa, nombres largos…) en CI.",
    ver: "Versiones", verP: "SemVer y Keep a Changelog. Cada tag vX.Y.Z publica una release con notas y un zip de las docs. La cabecera muestra la versión y el commit de cada build.",
    lic: "Licencia", licP: "Software propietario. © 2026 rblez. Todos los derechos reservados. El código es visible pero no puede copiarse, modificarse, distribuirse, sublicenciarse ni usarse, total o parcialmente, sin permiso escrito de rblez. Se prohíbe su uso para entrenar modelos de IA. Fuentes bajo SIL OFL 1.1; iconos Lucide bajo ISC.",
    contact: "Contacto", repo: "Código", rel: "Releases", chg: "Changelog",
  });

  const stack = [
    ["Svelte 5", "MIT"], ["React 18+", "MIT"], ["Vite", "MIT"], ["TypeScript", "Apache-2.0"], ["Shiki", "MIT"], ["Lucide", "ISC"],
    ["Inter", "OFL 1.1"], ["SUSE Mono", "OFL 1.1"], ["GSAP", "Standard"], ["Motion", "MIT"], ["Patch", "—"], ["GitHub Pages · Cloudflare", "—"],
  ];

  let root: HTMLElement;
  onMount(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const stops = [...root.querySelectorAll(".ab-reveal")].map((el) =>
      inView(el, (t) => { animate(t.querySelectorAll(":scope > *"), { opacity: [0, 1], y: [14, 0] }, { delay: stagger(0.05), duration: 0.45 }); }, { amount: 0.15 }));
    animate(".ab-mock__desk", { opacity: [0, 1], y: [30, 0] }, { duration: 0.7, ease: [0.2, 0.9, 0.25, 1] });
    animate(".ab-mock__phone", { opacity: [0, 1], y: [50, 0], rotate: [6, 0] }, { duration: 0.8, delay: 0.15, type: "spring", bounce: 0.25 });
    return () => stops.forEach((s) => s());
  });
</script>

<article class="page page--about" bind:this={root}>
  <p class="eyebrow">{T.eyebrow}</p>
  <h1>{T.title}</h1>
  <p class="lead">{T.lead}</p>
  <dl class="ab-meta">
    <div><dt>{T.meta[0]}</dt><dd>v{__VERSION__}</dd></div>
    <div><dt>{T.meta[1]}</dt><dd>{__COMMIT__ || "local"}</dd></div>
    <div><dt>{T.meta[2]}</dt><dd>{__BUILD_DATE__}</dd></div>
    <div><dt>{T.meta[3]}</dt><dd>UNLICENSED</dd></div>
  </dl>

  <section class="ab-mock" aria-label={T.mock}>
    <figure class="ab-mock__desk">
      <div class="ab-browser"><span></span><span></span><span></span><em>rblez.com/ui</em></div>
      <img class="only-light" src={shot("desktop-light")} alt="" loading="lazy" />
      <img class="only-dark" src={shot("desktop-dark")} alt="" loading="lazy" />
    </figure>
    <figure class="ab-mock__phone">
      <div class="ab-notch"></div>
      <img class="only-light" src={shot("mobile-light")} alt="" loading="lazy" />
      <img class="only-dark" src={shot("mobile-dark")} alt="" loading="lazy" />
    </figure>
  </section>
  <p class="ab-cap">{T.mock}. {T.mockLead}</p>

  <h2>{T.pk}</h2>
  <div class="table-wrap ab-reveal"><table><tbody>
    {#each T.pkRows as [n, d] (n)}<tr><td><code>{n}</code></td><td>{d}</td></tr>{/each}
  </tbody></table></div>

  <h2>{T.comps} <Badge variant="secondary">{components.length}</Badge></h2>
  <div class="ab-comps ab-reveal">
    {#each components as x (x.slug)}<a href={`${BASE}${x.slug}/`}>{x.name}</a>{/each}
  </div>

  <h2>{T.ai}</h2>
  <p class="ab-p">{T.aiLead}</p>
  <div class="ab-ai ab-reveal">
    {#each ais as a (a.id)}
      <article class="ab-ai__card">
        <AiLogo id={a.id} size={36} />
        <div>
          <h3>{a.name} <small>{a.site}</small></h3>
          <p>{en ? a.en : a.es}</p>
          <code>{a.url}</code>
        </div>
      </article>
    {/each}
  </div>

  <h2>{T.docs}</h2>
  <ul class="ab-list ab-reveal">{#each T.docsList as [b, d] (b)}<li><Icon name="check" size={14} /><span><strong>{b}.</strong> {d}</span></li>{/each}</ul>

  <h2>{T.design}</h2>
  <p class="ab-p">{T.designP}</p>

  <h2>{T.stack}</h2>
  <div class="ab-stack ab-reveal">{#each stack as [n, l] (n)}<span><strong>{n}</strong><small>{l}</small></span>{/each}</div>

  <h2>{T.ver}</h2>
  <p class="ab-p">{T.verP} <a href="https://github.com/rblez/ui/releases" target="_blank" rel="noreferrer">{T.rel}</a> · <a href="https://github.com/rblez/ui/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer">{T.chg}</a></p>

  <h2 id="licencia">{T.lic}</h2>
  <p class="ab-p">{T.licP}</p>

  <h2>{T.contact}</h2>
  <ul class="list">
    <li><a href="https://www.rblez.com" target="_blank" rel="noreferrer">rblez.com</a> · <a href="mailto:hello@rblez.com">hello@rblez.com</a></li>
    <li>{T.repo}: <a href="https://github.com/rblez/ui" target="_blank" rel="noreferrer">github.com/rblez/ui</a></li>
  </ul>
</article>
