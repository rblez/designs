<script lang="ts">
  import type { ComponentDoc } from "./registry";
  import { Icon } from "@rblez-ui/svelte";
  import { i18n } from "./i18n.svelte";
  let { doc, back }: { doc: ComponentDoc; back: string } = $props();
  const Demo = $derived(doc.svelte);
  const L = $derived(i18n.lang === "en" ? { back: "Docs", label: "Live preview" } : { back: "Docs", label: "Vista previa" });
</script>

<div class="pv" class:pv--phone={doc.surface === "phone"} class:pv--wide={doc.surface === "wide"}>
  <header class="pv__bar">
    <a class="pv__back" href={back}><Icon name="arrowLeft" size={14} />{L.back}</a>
    <span class="pv__name">{doc.name} <small>{L.label}</small></span>
    <span class="pv__sp"></span>
  </header>
  <main class="pv__stage">
    {#key doc.slug}<Demo />{/key}
  </main>
</div>
