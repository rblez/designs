<script lang="ts">
  import type { ComponentDoc } from "./registry";
  import ReactIsland from "./ReactIsland.svelte";
  import FrameworkSwitch from "./FrameworkSwitch.svelte";
  import { Icon } from "@rblez-ui/svelte";
  import { i18n } from "./i18n.svelte";
  let { doc, framework = $bindable(), back }: { doc: ComponentDoc; framework: "svelte" | "react"; back: string } = $props();
  const Demo = $derived(doc.svelte);
  const L = $derived(i18n.lang === "en" ? { back: "Docs", label: "Live preview" } : { back: "Docs", label: "Vista previa" });
</script>

<div class="pv" class:pv--phone={doc.surface === "phone"} class:pv--wide={doc.surface === "wide"}>
  <header class="pv__bar">
    <a class="pv__back" href={back}><Icon name="arrowLeft" size={14} />{L.back}</a>
    <span class="pv__name">{doc.name} <small>{L.label}</small></span>
    <FrameworkSwitch bind:value={framework} />
  </header>
  <main class="pv__stage">
    {#key framework + doc.slug}
      {#if framework === "svelte"}<Demo />{:else}<ReactIsland component={doc.react} />{/if}
    {/key}
  </main>
</div>
