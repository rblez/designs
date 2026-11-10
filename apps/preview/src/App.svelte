<script lang="ts">
  import { Sidebar, Icon } from "@rblez-ui/svelte";
  import type { SidebarSection } from "@rblez-ui/tokens";
  import { components, guides } from "./docs/registry";
  import ComponentPage from "./docs/ComponentPage.svelte";
  import GuidePage from "./docs/GuidePage.svelte";
  import GitHubStars from "./docs/GitHubStars.svelte";
  import { i18n, setLang, t } from "./docs/i18n.svelte";

  const read = () => location.hash.replace(/^#\/?/, "") || "introduccion";
  let slug = $state(read());
  let framework = $state<"svelte" | "react">((localStorage.getItem("d-fw") as "svelte" | "react") ?? "svelte");
  let theme = $state<"light" | "dark">((localStorage.getItem("d-theme") as "light" | "dark") ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  let menu = $state(false);
  let query = $state("");
  let findEl: HTMLInputElement | undefined = $state();

  $effect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("d-theme", theme); });
  $effect(() => { localStorage.setItem("d-fw", framework); });
  $effect(() => { document.body.classList.toggle("menu-open", menu); });
  $effect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu) close();
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement))) { e.preventDefault(); menu = true; findEl?.focus(); }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  });
  $effect(() => {
    const on = () => { slug = read(); close(); window.scrollTo({ top: 0 }); };
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  });

  const groups = ["IA", "Formularios", "Layout", "Feedback"] as const;
  const L = $derived(t());
  $effect(() => { document.documentElement.lang = i18n.lang; });
  const sections: SidebarSection[] = $derived([
    { title: L.getStarted, items: guides.map((g) => ({ label: L.guides[g.slug as keyof typeof L.guides] ?? g.name, href: `#/${g.slug}` })) },
    ...groups.map((g) => ({
      title: L.groups[g],
      items: components.filter((c) => c.group === g).map((c) => ({ label: c.name, href: `#/${c.slug}`, badge: c.badge ? L.new : undefined })),
    })),
  ]);
  const doc = $derived(components.find((c) => c.slug === slug));
  const go = (s: string) => (location.hash = `#/${s}`);
  function close() { menu = false; query = ""; findEl?.blur(); }
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
      if (best) location.hash = best.href;
    }
  }
</script>

<div class="bg" aria-hidden="true"></div>
<header class="top">
  <div class="top__left">
    <a class="brand" href="#/introduccion"><img src="./isotipo.svg" alt="rblez-ui" width="20" height="20" /></a>
    <span class="ver">v0.1</span>
  </div>
  <div class="top__right">
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

<div class="shell">
  <aside class="side">
    <Sidebar {sections} active={`#/${slug}`} label={L.docs} />
  </aside>
  <main class="main">
    {#if doc}
      <ComponentPage {doc} bind:framework />
    {:else}
      <GuidePage {slug} {go} />
    {/if}
  </main>
</div>

<!-- Dock móvil: buscar + menú, tipo Vercel -->
{#if menu}<button class="scrim" aria-label={L.close} onclick={close}></button>{/if}
<div class="sheet" class:sheet--open={menu} role="dialog" aria-modal="true" aria-label={L.nav} inert={!menu}>
  <div class="sheet__body">
    {#if filtered.length}
      <Sidebar sections={filtered} active={`#/${slug}`} label={L.docs} />
    {:else}
      <p class="sheet__empty">{L.noResults(query)}</p>
    {/if}
  </div>
  <div class="sheet__foot">
    <span class="sheet__meta">rblez-ui · v0.1</span>
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
