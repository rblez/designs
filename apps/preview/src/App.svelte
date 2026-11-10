<script lang="ts">
  import { Sidebar } from "@designs/svelte";
  import type { SidebarSection } from "@designs/tokens";
  import { components, guides } from "./docs/registry";
  import ComponentPage from "./docs/ComponentPage.svelte";
  import GuidePage from "./docs/GuidePage.svelte";
  import GitHubStars from "./docs/GitHubStars.svelte";

  const read = () => location.hash.replace(/^#\/?/, "") || "introduccion";
  let slug = $state(read());
  let framework = $state<"svelte" | "react">((localStorage.getItem("d-fw") as "svelte" | "react") ?? "svelte");
  let theme = $state<"light" | "dark">((localStorage.getItem("d-theme") as "light" | "dark") ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  let menu = $state(false);

  $effect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("d-theme", theme); });
  $effect(() => { localStorage.setItem("d-fw", framework); });
  $effect(() => { document.body.classList.toggle("menu-open", menu); });
  $effect(() => {
    const on = () => { slug = read(); menu = false; window.scrollTo({ top: 0 }); };
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
</script>

<div class="bg" aria-hidden="true"></div>
<header class="top">
  <div class="top__left">
    <button class="menu" aria-label="Menú" aria-expanded={menu} onclick={() => (menu = !menu)}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
    <a class="brand" href="#/introduccion"><img src="./isotipo.svg" alt="designs" width="20" height="20" /></a>
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
  {#if menu}<button class="scrim" aria-label="Cerrar menú" onclick={() => (menu = false)}></button>{/if}
  <aside class="side" class:side--open={menu}>
    <Sidebar {sections} active={`#/${slug}`} label="Documentación" />
  </aside>
  <main class="main">
    {#if doc}
      <ComponentPage {doc} bind:framework />
    {:else}
      <GuidePage {slug} {go} />
    {/if}
    <footer class="foot"><span>© 2026 rblez. Todos los derechos reservados. Software propietario.</span><GitHubStars /></footer>
  </main>
</div>
