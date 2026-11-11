<script lang="ts">
  import { Sidebar, Icon } from "@rblez-ui/svelte";
  import type { SidebarSection } from "@rblez-ui/tokens";
  import { components, guides } from "./docs/registry";
  import ComponentPage from "./docs/ComponentPage.svelte";
  import GuidePage from "./docs/GuidePage.svelte";
  import Landing from "./docs/Landing.svelte";
  import AboutPage from "./docs/AboutPage.svelte";
  import { NotFound } from "@rblez-ui/svelte";
  import PreviewPage from "./docs/PreviewPage.svelte";
  import GitHubStars from "./docs/GitHubStars.svelte";
  import { i18n, setLang, t } from "./docs/i18n.svelte";

  const BASE = import.meta.env.BASE_URL; // "/ui/"
  const href = (slug: string) => `${BASE}${slug}/`;
  // Rutas reales (/ui/<slug>/) para compartir; los enlaces viejos con #/ se redirigen.
  if (/^#\/./.test(location.hash)) history.replaceState(null, "", href(location.hash.slice(2)));
  const read = () => location.pathname.slice(BASE.length).replace(/\/+$/, "").split("/")[0] || "introduccion";
  const isPreview = () => /^[^/]+\/preview\/?$/.test(location.pathname.slice(BASE.length));
  if (read() === "licencia") history.replaceState(null, "", `${BASE}acerca/#licencia`);
  let slug = $state(read());
  const lost = $derived(!components.some((c) => c.slug === slug) && !guides.some((g) => g.slug === slug));
  let preview = $state(isPreview());
  let framework = $state<"svelte" | "react">((localStorage.getItem("d-fw") as "svelte" | "react") ?? "svelte");
  let theme = $state<"light" | "dark">((localStorage.getItem("d-theme") as "light" | "dark") ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  let menu = $state(false);
  let query = $state("");
  let findEl: HTMLInputElement | undefined = $state();
  let palette = $state(false);
  let palEl: HTMLInputElement | undefined = $state();
  const desktop = () => matchMedia("(min-width: 861px)").matches;
  function openSearch() { if (desktop()) { palette = true; queueMicrotask(() => palEl?.focus()); } else { menu = true; findEl?.focus(); } }

  $effect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("d-theme", theme); });
  $effect(() => { localStorage.setItem("d-fw", framework); });
  $effect(() => { document.body.classList.toggle("menu-open", menu); });
  $effect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (menu || palette)) close();
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement))) { e.preventDefault(); openSearch(); }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  });
  $effect(() => {
    const on = () => { slug = read(); preview = isPreview(); close(); window.scrollTo({ top: 0 }); };
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a"); if (!a || a.target || a.hasAttribute("download")) return;
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin || !u.pathname.startsWith(BASE) || u.hash) return;
      e.preventDefault(); if (u.pathname !== location.pathname) { history.pushState(null, "", u.pathname); on(); } else close();
    };
    addEventListener("popstate", on); addEventListener("click", click);
    return () => { removeEventListener("popstate", on); removeEventListener("click", click); };
  });

  const groups = ["IA", "Formularios", "Layout", "Feedback"] as const;
  const L = $derived(t());
  $effect(() => { document.documentElement.lang = i18n.lang; });
  const sections: SidebarSection[] = $derived([
    { title: L.getStarted, items: guides.map((g) => ({ label: L.guides[g.slug as keyof typeof L.guides] ?? g.name, href: href(g.slug) })) },
    ...groups.map((g) => ({
      title: L.groups[g],
      items: components.filter((c) => c.group === g).map((c) => ({ label: c.name, href: href(c.slug), badge: c.badge ? L.new : undefined })),
    })),
  ]);
  const doc = $derived(components.find((c) => c.slug === slug));
  const go = (s: string) => { history.pushState(null, "", href(s)); slug = s; close(); window.scrollTo({ top: 0 }); };
  $effect(() => {
    const name = doc?.name ?? (L.guides[slug as keyof typeof L.guides] ?? "");
    document.title = slug === "introduccion" || !name ? "rblez-ui" : `${name} · rblez-ui`;
  });
  function close() { menu = false; palette = false; query = ""; findEl?.blur(); }
  const norm = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const filtered = $derived.by(() => {
    const q = norm(query.trim());
    if (!q) return sections;
    return sections
      .map((sec) => ({ ...sec, items: sec.items.filter((i) => norm(i.label).includes(q) || norm(sec.title ?? "").includes(q)) }))
      .filter((sec) => sec.items.length);
  });
  function onFind(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const all = filtered.flatMap((sec) => sec.items), q = norm(query.trim());
      const best = all.find((i) => norm(i.label).startsWith(q)) ?? all[0];
      if (best) { history.pushState(null, "", best.href); slug = read(); close(); window.scrollTo({ top: 0 }); }
    }
  }
</script>

{#if preview && doc}
  <PreviewPage {doc} back={href(doc.slug)} />
{:else}
<div class="bg" aria-hidden="true"></div>
<header class="top">
  <div class="top__left">
    <a class="brand" href={href("introduccion")}><img src={`${BASE}isotipo.svg`} alt="rblez-ui" width="20" height="20" /></a>
    <span class="ver" title={__COMMIT__ ? `build ${__COMMIT__} · ${__BUILD_DATE__}` : __BUILD_DATE__}>v{__VERSION__}</span>
  </div>
  <div class="top__right">
    <button type="button" class="top-search" onclick={openSearch} aria-label={L.searchLabel}>
      <Icon name="search" size={14} /><span>{L.search}</span><kbd>⌘K</kbd>
    </button>
    <div class="seg seg--lang" role="group" aria-label={L.language}>
      <button aria-pressed={i18n.lang === "es"} onclick={() => setLang("es")}>ES</button>
      <button aria-pressed={i18n.lang === "en"} onclick={() => setLang("en")}>EN</button>
    </div>
    <GitHubStars />
    <button class="theme" aria-label={L.toggleTheme} onclick={() => (theme = theme === "dark" ? "light" : "dark")}>
      {#if theme === "dark"}
        <Icon name="sun" size={14} />
      {:else}
        <Icon name="moon" size={14} />
      {/if}
    </button>
  </div>
</header>

<div class="shell" class:shell--landing={slug === "introduccion" || lost}>
  <aside class="side">
    <Sidebar {sections} active={href(slug)} label={L.docs} />
  </aside>
  <main class="main">
    {#if slug === "introduccion"}
      <Landing {go} />
    {:else if doc}
      <ComponentPage {doc} bind:framework />
    {:else if slug === "acerca"}
      <AboutPage />
    {:else if lost}
      <NotFound title={i18n.lang === "en" ? "The page you’re looking for has wandered off, but don’t worry!" : "La página que buscas se ha perdido, pero no te preocupes."}
        description={i18n.lang === "en" ? "Let’s get you back on track." : "Vamos a devolverte al buen camino."}
        actionLabel={i18n.lang === "en" ? "Take me home" : "Llévame al inicio"} href={BASE} />
    {:else}
      <GuidePage {slug} {go} />
    {/if}
  </main>
</div>

<!-- Paleta de búsqueda (escritorio) -->
{#if palette}
  <button class="scrim scrim--pal" aria-label={L.close} onclick={close}></button>
  <div class="palette" role="dialog" aria-modal="true" aria-label={L.searchLabel}>
    <label class="palette__find">
      <Icon name="search" size={16} />
      <input bind:this={palEl} bind:value={query} type="search" placeholder={L.search} aria-label={L.searchLabel} autocomplete="off" onkeydown={onFind} />
      <kbd>Esc</kbd>
    </label>
    <div class="palette__body">
      {#if filtered.length}<Sidebar sections={filtered} active={href(slug)} label={L.docs} />{:else}<p class="sheet__empty">{L.noResults(query)}</p>{/if}
    </div>
  </div>
{/if}

<!-- Dock móvil: buscar + menú, tipo Vercel -->
{#if menu}<button class="scrim" aria-label={L.close} onclick={close}></button>{/if}
<div class="sheet" class:sheet--open={menu} role="dialog" aria-modal="true" aria-label={L.nav} inert={!menu}>
  <div class="sheet__body">
    {#if filtered.length}
      <Sidebar sections={filtered} active={href(slug)} label={L.docs} />
    {:else}
      <p class="sheet__empty">{L.noResults(query)}</p>
    {/if}
  </div>
  <div class="sheet__foot">
    <span class="sheet__meta">rblez-ui · v{__VERSION__}{__COMMIT__ ? ` · ${__COMMIT__}` : ""}</span>
    <div class="seg seg--lang" role="group" aria-label={L.language}>
      <button aria-pressed={i18n.lang === "es"} onclick={() => setLang("es")}>ES</button>
      <button aria-pressed={i18n.lang === "en"} onclick={() => setLang("en")}>EN</button>
    </div>
    <div class="seg" role="group" aria-label={L.theme}>
      <button aria-pressed={theme === "light"} aria-label={L.light} onclick={() => (theme = "light")}><Icon name="sun" size={14} /></button>
      <button aria-pressed={theme === "dark"} aria-label={L.dark} onclick={() => (theme = "dark")}><Icon name="moon" size={14} /></button>
    </div>
  </div>
</div>
<nav class="dock" aria-label={L.nav}>
  <label class="dock__find">
    <Icon name="search" size={14} />
    <input bind:this={findEl} bind:value={query} type="search" placeholder={L.search} aria-label={L.searchLabel} enterkeyhint="go" autocomplete="off" onfocus={() => (menu = true)} onkeydown={onFind} />
  </label>
  <span class="dock__sep" aria-hidden="true"></span>
  <button class="dock__btn" aria-label={menu ? L.closeMenu : L.openMenu} aria-expanded={menu} onclick={() => (menu ? close() : (menu = true))}>
    {#if menu}<Icon name="close" size={16} />{:else}<Icon name="menu" size={16} />{/if}
  </button>
</nav>
{/if}
