<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { animate, inView, stagger, hover } from "motion";
  import { Button, Badge, Switch, Kbd, Icon, Footer } from "@rblez-ui/svelte";
  import AiLogo from "./AiLogo.svelte";
  import { components } from "./registry";
  import { i18n } from "./i18n.svelte";
  import svelteLogo from "../logos/svelte.svg";
  import reactLogo from "../logos/react_dark.svg";

  let { go }: { go: (s: string) => void } = $props();
  const BASE = import.meta.env.BASE_URL;
  let root: HTMLElement;
  let on = $state(true);

  const C = {
    es: {
      eyebrow: `v${__VERSION__} · Svelte 5 + React`,
      title: ["Interfaces", "que", "se", "sienten", "hechas", "a", "mano."],
      lead: "rblez-ui es una librería de componentes para Svelte 5 y React con una sola API, un único CSS y tokens compartidos. Sin dependencias de UI de terceros.",
      cta: "Ver componentes", install: "Instalación",
      showTitle: "Componentes listos para producción",
      showLead: "Cada uno con demo, código por framework, props y su propia URL para compartir.",
      feats: [
        ["Una API, dos frameworks", "Los mismos nombres de props en Svelte y React. Solo cambia la convención de eventos."],
        ["CSS antes que JS", "Los estilos viven en @rblez-ui/tokens. Los componentes solo aplican clases."],
        ["Accesible por defecto", "Roles ARIA, teclado y foco visible en todo."],
        ["Tema claro y oscuro", "Variables que se adaptan solas, con grano y degradados de la casa."],
        ["Heroicons", "Línea y relleno en cada icono, con micro y mini para tamaños pequeños."],
        ["Enviar a IA", "Abre v0, ChatGPT, Claude o Replit con el código del componente."],
      ],
      aiTitle: "Del componente a tu IA en un clic", aiLead: "Cada página lleva el código como prompt a la herramienta que uses.",
      all: "Todos los componentes",
    },
    en: {
      eyebrow: `v${__VERSION__} · Svelte 5 + React`,
      title: ["Interfaces", "that", "feel", "made", "by", "hand."],
      lead: "rblez-ui is a component library for Svelte 5 and React with one API, a single stylesheet and shared tokens. No third-party UI dependencies.",
      cta: "Browse components", install: "Installation",
      showTitle: "Production-ready components",
      showLead: "Each with a demo, code per framework, props and its own shareable URL.",
      feats: [
        ["One API, two frameworks", "Same prop names in Svelte and React. Only the event convention differs."],
        ["CSS before JS", "Styles live in @rblez-ui/tokens. Components only apply classes."],
        ["Accessible by default", "ARIA roles, keyboard and visible focus throughout."],
        ["Light and dark", "Variables that adapt on their own, with the house grain and gradients."],
        ["Heroicons", "Line and fill for every icon, with micro and mini for small sizes."],
        ["Send to AI", "Open v0, ChatGPT, Claude or Replit with the component's code."],
      ],
      aiTitle: "From component to your AI in one click", aiLead: "Every page carries the code as a prompt to the tool you use.",
      all: "All components",
    },
  };
  const c = $derived(C[i18n.lang]);
  const featIcons = ["sparkles", "lock", "check", "moon", "star", "send"] as const;

  const columns = [
    { title: "Docs", links: [{ label: "Instalación", href: `${BASE}instalacion/` }, { label: "Tokens", href: `${BASE}tokens/` }, { label: "Acerca de", href: `${BASE}acerca/` }] },
    { title: "Componentes", links: components.slice(0, 6).map((x) => ({ label: x.name, href: `${BASE}${x.slug}/` })) },
    { title: "Más", links: components.slice(6).map((x) => ({ label: x.name, href: `${BASE}${x.slug}/` })) },
    { title: "rblez", links: [{ label: "GitHub", href: "https://github.com/rblez/ui" }, { label: "rblez.com", href: "https://www.rblez.com" }, { label: "Contacto", href: "mailto:hello@rblez.com" }] },
  ];

  onMount(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // GSAP: entrada del hero en una sola línea de tiempo
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".lp-grid__line", { scaleX: 0, transformOrigin: "left", duration: 1.1, stagger: 0.04 }, 0)
        .from(".lp-eyebrow", { y: 10, opacity: 0, duration: 0.5 }, 0.1)
        .from(".lp-word", { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.06 }, 0.15)
        .from(".lp-lead", { y: 14, opacity: 0, duration: 0.6 }, 0.55)
        .from(".lp-cta", { y: 12, autoAlpha: 0, duration: 0.5 }, 0.7)
        .from(".lp-card", { y: 40, opacity: 0, rotate: (i) => [-6, 3, -2, 5][i % 4], duration: 0.9, stagger: 0.08 }, 0.6);
      // GSAP ScrollTrigger: parallax del brillo y de las tarjetas
      gsap.to(".lp-glow", { yPercent: 30, ease: "none", scrollTrigger: { trigger: ".lp-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".lp-card", { y: (i) => -30 - i * 12, ease: "none", scrollTrigger: { trigger: ".lp-hero", start: "top top", end: "bottom top", scrub: true } });
    }, root);

    // Motion: secciones al entrar en vista y hover magnético
    const stops: (() => void)[] = [];
    stops.push(inView(".lp-feats", (el) => { animate(el.querySelectorAll(".lp-feat"), { opacity: [0, 1], y: [18, 0] }, { delay: stagger(0.07), duration: 0.5 }); }, { amount: 0.25 }));
    stops.push(inView(".lp-show", (el) => { animate(el.querySelectorAll(".lp-comp"), { opacity: [0, 1], scale: [0.96, 1] }, { delay: stagger(0.04), duration: 0.4 }); }, { amount: 0.2 }));
    stops.push(inView(".lp-ai", (el) => { animate(el.querySelectorAll(".lp-ai__item"), { opacity: [0, 1], y: [24, 0], rotate: [-8, 0] }, { delay: stagger(0.08), type: "spring", bounce: 0.35 }); }, { amount: 0.4 }));
    stops.push(hover(".lp-comp, .lp-ai__item", (el) => {
      animate(el, { y: -3 }, { type: "spring", stiffness: 400, damping: 22 });
      return () => animate(el, { y: 0 }, { type: "spring", stiffness: 400, damping: 22 });
    }));
    return () => { ctx.revert(); stops.forEach((s) => s()); };
  });
</script>

<div class="lp" bind:this={root}>
  <section class="lp-hero">
    <div class="lp-grid" aria-hidden="true">{#each { length: 9 } as _, i (i)}<span class="lp-grid__line" style:top={`${i * 12.5}%`}></span>{/each}</div>
    <div class="lp-glow" aria-hidden="true"></div>
    <div class="lp-hero__in">
      <p class="lp-eyebrow"><span class="lp-dot"></span>{c.eyebrow}</p>
      <h1 class="lp-title">{#each c.title as w, i (i + w)}<span class="lp-mask"><span class="lp-word">{w}</span></span>{" "}{/each}</h1>
      <p class="lp-lead">{c.lead}</p>
      <div class="lp-cta">
        <Button variant="brand" size="lg" onclick={() => go("button")}>{c.cta}</Button>
        <Button variant="outline" size="lg" onclick={() => go("instalacion")}>{c.install}</Button>
        <span class="lp-fw"><img src={svelteLogo} alt="Svelte" width="18" height="18" /><img src={reactLogo} alt="React" width="18" height="18" /></span>
      </div>
    </div>
    <div class="lp-cards" aria-hidden="true" inert>
      <div class="lp-card lp-card--a"><Button variant="brand">Build now</Button><Button variant="outline">Deploy</Button></div>
      <div class="lp-card lp-card--b"><Switch bind:checked={on} label="Dark mode" /><Badge variant="success" dot>Live</Badge></div>
      <div class="lp-card lp-card--c"><span class="lp-k"><Kbd>⌘</Kbd><Kbd>K</Kbd></span><Badge variant="brand">v{__VERSION__}</Badge></div>
      <div class="lp-card lp-card--d"><Icon name="sparkles" size={18} /><Icon name="heart" size={18} variant="fill" /><Icon name="bell" size={18} /><Icon name="star" size={18} variant="fill" /></div>
    </div>
  </section>

  <section class="lp-sec"><div class="lp-feats">
    {#each c.feats as [t, d], i (t)}
      <article class="lp-feat"><span class="lp-feat__ic"><Icon name={featIcons[i]} size={16} /></span><h3>{t}</h3><p>{d}</p></article>
    {/each}
  </div></section>

  <section class="lp-sec lp-show">
    <h2 class="lp-h2">{c.showTitle}</h2>
    <p class="lp-sub">{c.showLead}</p>
    <div class="lp-comps">
      {#each components as x (x.slug)}
        <a class="lp-comp" href={`${BASE}${x.slug}/`}><span>{x.name}</span><Icon name="arrowUpRight" size={14} /></a>
      {/each}
    </div>
  </section>

  <section class="lp-sec lp-ai">
    <h2 class="lp-h2">{c.aiTitle}</h2>
    <p class="lp-sub">{c.aiLead}</p>
    <div class="lp-ai__row">
      {#each ["v0", "chatgpt", "claude", "replit"] as const as id (id)}
        <div class="lp-ai__item"><AiLogo {id} size={44} /><span>{id === "chatgpt" ? "ChatGPT" : id === "claude" ? "Claude" : id === "replit" ? "Replit" : "v0"}</span></div>
      {/each}
    </div>
  </section>

  <div class="lp-foot">
    <Footer {columns}>{#snippet logo()}<img src={`${BASE}isotipo.svg`} alt="rblez" class="demo-logo" />{/snippet}</Footer>
  </div>
</div>
