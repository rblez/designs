<script lang="ts">
  import { ACCENT_PRESETS, NEUTRAL_PRESETS, accentSwatches, isAccentPreset } from "@rblez-ui/tokens";
  import { look, pickAccent, pickNeutral } from "./look.svelte";
  import { i18n } from "./i18n.svelte";
  let { neutrals = false }: { neutrals?: boolean } = $props();

  const C = {
    es: { accent: "Acento", custom: "Color personalizado", neutral: "Neutros",
      names: { orange: "Naranja", blue: "Azul", violet: "Violeta", green: "Verde", rose: "Rosa", amber: "Ámbar", teal: "Turquesa", ink: "Tinta" },
      nnames: { cream: "Crema", zinc: "Zinc", slate: "Pizarra" } },
    en: { accent: "Accent", custom: "Custom color", neutral: "Neutrals",
      names: { orange: "Orange", blue: "Blue", violet: "Violet", green: "Green", rose: "Rose", amber: "Amber", teal: "Teal", ink: "Ink" },
      nnames: { cream: "Cream", zinc: "Zinc", slate: "Slate" } },
  };
  const c = $derived(C[i18n.lang]);
  const custom = $derived(isAccentPreset(look.accent) ? "" : look.accent);
</script>

<div class="ap">
  <div class="ap__row" role="radiogroup" aria-label={c.accent}>
    {#each ACCENT_PRESETS as p (p)}
      <button type="button" class="ap__sw" role="radio" aria-checked={look.accent === p} aria-label={c.names[p]} title={c.names[p]}
        style:--sw-l={accentSwatches[p].light} style:--sw-d={accentSwatches[p].dark} onclick={() => pickAccent(p)}></button>
    {/each}
    <label class="ap__sw ap__sw--custom" title={c.custom} data-on={custom ? "" : undefined} style:--sw-l={custom || undefined} style:--sw-d={custom || undefined}>
      <input type="color" aria-label={c.custom} value={custom || "#0ea5e9"} oninput={(e) => pickAccent(e.currentTarget.value)} />
    </label>
  </div>
  {#if neutrals}
    <div class="seg ap__seg" role="group" aria-label={c.neutral}>
      {#each NEUTRAL_PRESETS as n (n)}
        <button type="button" aria-pressed={look.neutral === n} onclick={() => pickNeutral(n)}>{c.nnames[n]}</button>
      {/each}
    </div>
  {/if}
</div>
