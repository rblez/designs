<script lang="ts">
  import { Sidebar } from "@rblez-ui/svelte";
  import type { SidebarSection } from "@rblez-ui/tokens";
  import { components, guides } from "./docs/registry";
  import ComponentPage from "./docs/ComponentPage.svelte";
  import GuidePage from "./docs/GuidePage.svelte";
  import GitHubStars from "./docs/GitHubStars.svelte";

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
  const sections: SidebarSection[] = [
    { title: "Empezar", items: guides.map((g) => ({ label: g.name, href: `#/${g.slug}` })) },
    ...groups.map((g) => ({
      title: g,
      items: components.filter((c) => c.group === g).map((c) => ({ label: c.name, href: `#/${c.slug}`, badge: c.badge })),
    })),
  ];
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
    <GitHubStars />
    <button class="theme" aria-label="Cambiar tema" onclick={() => (theme = theme === "dark" ? "light" : "dark")}>
      {#if theme === "dark"}
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-linecap="round"/></svg>
      {:else}
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" stroke-linejoin="round"/></svg>
      {/if}
    </button>
  </div>
</header>

<div class="shell">
  <aside class="side">
    <Sidebar {sections} active={`#/${slug}`} label="Documentación" />
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
{#if menu}<button class="scrim" aria-label="Cerrar" onclick={close}></button>{/if}
<div class="sheet" class:sheet--open={menu} role="dialog" aria-modal="true" aria-label="Navegación" inert={!menu}>
  <div class="sheet__body">
    {#if filtered.length}
      <Sidebar sections={filtered} active={`#/${slug}`} label="Documentación" />
    {:else}
      <p class="sheet__empty">Sin resultados para “{query}”.</p>
    {/if}
  </div>
  <div class="sheet__foot">
    <span class="sheet__meta">rblez-ui · v0.1</span>
    <div class="seg" role="group" aria-label="Tema">
      <button aria-pressed={theme === "light"} aria-label="Claro" onclick={() => (theme = "light")}><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-linecap="round"/></svg></button>
      <button aria-pressed={theme === "dark"} aria-label="Oscuro" onclick={() => (theme = "dark")}><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" stroke-linejoin="round"/></svg></button>
    </div>
  </div>
</div>
<nav class="dock" aria-label="Buscar y navegar">
  <label class="dock__find">
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></svg>
    <input bind:this={findEl} bind:value={query} type="search" placeholder="Buscar…" aria-label="Buscar en la documentación" enterkeyhint="go" autocomplete="off" onfocus={() => (menu = true)} onkeydown={onFind} />
  </label>
  <span class="dock__sep" aria-hidden="true"></span>
  <button class="dock__btn" aria-label={menu ? "Cerrar menú" : "Abrir menú"} aria-expanded={menu} onclick={() => (menu ? close() : (menu = true))}>
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      {#if menu}<path d="M6 6l12 12M18 6 6 18"/>{:else}<path d="M5 9h14M5 15h14"/>{/if}
    </svg>
  </button>
</nav>
